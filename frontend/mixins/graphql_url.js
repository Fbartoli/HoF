
export default {
  methods: {
    async get_user_nfts_quantum(wallet_address_input, supported_collections_data=[], projects_data=[], offset=0) {
      const contract_addresses = supported_collections_data.map((collection) => collection.contract)
      const wallet_addresses = Array.isArray(wallet_address_input) ? wallet_address_input : [wallet_address_input]
      const promise_arr = wallet_addresses.map((wallet_address) => this._get_nft_quantum(wallet_address, offset))
      const quantum_items = await Promise.all(promise_arr).then((responses, index) => this._parse_response_quantum(responses, "mainnet", index, supported_collections_data, projects_data))
      const processed_items = await this._get_items_metadata(quantum_items, projects_data)
      console.log("quantum items", processed_items)
      return processed_items
    },
    _get_nft_quantum(wallet_address, offset=0) {
      const endpoint_url = "https://api.thegraph.com/subgraphs/name/0xtoko/rug-tech-collection"
      // const body = { "query": `{\n  erc721Tokens(where: {\n    owner: \"${String(wallet_address).toLowerCase()}\"\n  }) {\n    id\n    identifier\n    contract {\n      id\n    }\n  }\n}`, "variables": null }
      const body = {
        "query": `{\n  erc721Tokens(where: {owner: \"${String(wallet_address).toLowerCase()}\"}, first: 1000, skip: ${offset * 1000}) {\n    id\n    identifier\n    contract {\n      id\n    }\n  }\n}\n`,
        "variables": null
    }
      return this.$axios.post(endpoint_url, body)
    },
    _parse_response_quantum(responses, network, index, supported_collections_data, projects_data) {
      const all_items = []
      const lowercase_supported_collection_addresses = supported_collections_data.map((project) => String(project.contract).toLowerCase())
      responses.forEach((data) => {
        const tokens_data = data.data.data.erc721Tokens
        console.log("tokens_data", tokens_data)
        const assets = tokens_data.filter((data) => lowercase_supported_collection_addresses.includes(String(data?.contract?.id).toLowerCase()))
        if (!assets.length) {
          return 
        }
        let items = assets.flatMap((asset) => {
          try {
            const contract_address = String(asset?.contract?.id)
            const token_id = Number(asset?.identifier)
            const collection_name = supported_collections_data.filter((data) => String(data.contract).toLocaleLowerCase() == contract_address.toLowerCase()).map((data) => data.name).slice(0,1).shift()
          const item_project_data = projects_data.filter((data) => String(data.contract).toLocaleLowerCase() == contract_address.toLowerCase()).slice(0,1).shift()
          let item = {
            collection_name: collection_name,
            metadata_url: item_project_data ? `${item_project_data.s3_url}/${item_project_data.s3_directory}${item_project_data.s3_metadata}/${token_id}` : null,
            contract_address: contract_address,
            token_id: token_id,
            contract_type: "ERC721",
            network: network,
            // image: null, //set later
            // name: null, //set later
            // attributes: null, //set later
            // metadata: null, //set later
          }
          return item
          } catch (error) {
            console.log(error)
            return []
          }
        }).filter((item) => item.token_id)
        // console.log(items)
        all_items.push(...items)
      })
      return all_items
    },
    async _get_items_metadata(items_arr, projects_data) {
      const items = items_arr.flatMap((items) => items || [])
      await Promise.allSettled(items.map((item) => this._get_item_metadata(item))).then((responses) => this._resolve_item_metadata(responses, items, projects_data))
      const cleaned_items = items.flatMap((item) => item || [])
      return cleaned_items
    },
    _get_item_metadata(item) {
      const endpoint_url = `${item.metadata_url}?t=${this.cache_timestamp}`
      return this.$axios.get(endpoint_url)
    },
    _resolve_item_metadata(responses, items, projects_data) {
      responses.forEach((response, index) => {
        if (response.status == "fulfilled") {
          const item_project_data = projects_data.filter((data) => String(data.contract).toLocaleLowerCase() == String(items[index].contract_address).toLowerCase()).slice(0,1).shift()
          try {
            const hd_res = item_project_data.image_hd
            const sm_res = item_project_data.image_sd
            const metadata = response.value.data
          items[index].image = metadata.image.replace(`/${hd_res}/`, `/${sm_res}/`)
          items[index].name = metadata.name
          items[index].attributes = metadata.attributes
          items[index].metadata = metadata
          } catch (error) {
            console.log(error)
            items = []
          }
          // console.log("resolved item", items[index])
        } else {
          items = []

          console.log("unresolved item", items[index])
        }
      })
    }
  }
}