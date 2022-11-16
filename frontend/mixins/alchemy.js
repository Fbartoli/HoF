
const network_alias = {
  "eth": "eth-mainnet",
  "polygon": "polygon-mainnet"
}
// var page_keys = {}
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('alchemy', ['getNextPageKey']),
  },
  methods: {
    ...mapActions('alchemy', ['addPageKey', 'popPageKey']),
    async get_user_nfts(wallet_address, supported_collections_data=[], network = "eth", is_continue) {
      const contract_addresses = supported_collections_data.map((collection) => collection.contract)
      const ALCHEMY = process.env.NUXT_ENV_ALCHEMY
      const endpoint_url = `https://${network_alias[network]}.alchemyapi.io/v2/${ALCHEMY}/getNFTs/`
      const chunk_contract_addresses = this._chunk_from_array(contract_addresses, 20) //alchemy only allows 20 contract filters
      const promise_arr = chunk_contract_addresses.map((split_contract_addresses,index) => {
        var params = new URLSearchParams()
        params.append('owner', wallet_address)
        if (split_contract_addresses.length) {
          split_contract_addresses.forEach((contract_address) => {
            params.append('contractAddresses[]', contract_address)
          })
        }
        if (is_continue) {
          const page_key = this.getNextPageKey(index)
          // console.log("page_key", index, page_key)
          if (page_key && page_key.length) {
            params.append('pageKey', page_key)
            this.popPageKey(index)
          } else {
            // dismiss
            return null
          }
        }
        const query = {
          params: params,
        }
        return this._get_nft_alchemy(endpoint_url, query)
      }).filter((promise) => promise)
      const alchemy_items = await Promise.all(promise_arr).then((responses) => this._parse_response_alchemy(responses, network, supported_collections_data))
      // console.log("alchemy_items", alchemy_items)
      const cached_items = await this.check_q_cache(alchemy_items)
      console.log("cached_items", cached_items)
      // console.table(cached_items)
      return cached_items
    },
    _get_nft_alchemy(endpoint_url, query) {
      return this.$axios.get(endpoint_url, query)
    },
    _parse_response_alchemy(responses, network, supported_collections_data) {
      const all_items = []
      responses.forEach((response, index) => {
        console.log("response", response)
        // set next page key
        const page_key = response.data.pageKey
        if (page_key) {
          this.addPageKey({index: index, key: page_key})
        }
        // owned assets array
        const assets = response.data.ownedNfts
        // console.log("assets", assets)
        if (!assets.length) {
          return 
        }
        let items = assets.map((asset) => {
          // console.log("String(asset.contract?.address).toLowerCase()", String(asset.contract?.address).toLowerCase())
          // console.log("this.supported_collections_data", supported_collections_data)
          const collection_name = supported_collections_data.filter((data) => String(data.contract).toLocaleLowerCase() == String(asset.contract?.address).toLowerCase()).map((data) => data.name).slice(0,1).shift()
          // console.log("collection_name_arr", supported_collections_data.filter((data) => String(data.contract).toLocaleLowerCase() == String(asset.contract?.address).toLowerCase()).slice(0,1))
          // debugger
          const media = asset.media.slice(0, 1).shift()
          let item = {
            name: asset.title,//
            token_id: asset.id?.tokenId ? parseInt(asset.id?.tokenId.toString()) : null,
            // token_address: asset.contract?.address,
            image: media.gateway || media.raw,//
            // url: asset.permalink,
            collection_name: collection_name,
            contract_address: asset.contract?.address,
            contract_type: asset.id?.tokenMetadata?.tokenType,
            metadata_url: asset.tokenUri?.gateway || asset.tokenUri?.raw,
            metadata: asset.metadata,//
            attributes: asset.metadata?.attributes,//
            network: network == "ETH" ? "mainnet" : "polygon",
          }
          // add ipfs path to item
          item.ipfs_path = this._get_hash_from_url(item.image)
          return item
        }).filter((item) => item.image)
        // console.log(items)
        all_items.push(...items)
      })
      return all_items
    },
    async check_q_cache(items_arr) {
      const items = items_arr.flatMap((items) => items || [])
      const non_ipfs_items = items.filter((item) => !this._get_hash_from_url(item.image))
      const ipfs_items = items.filter((item) => this._get_hash_from_url(item.image))
      await Promise.allSettled(ipfs_items.map((item) => this.ping_q_cache(item))).then((responses) => this._resolve_q_cache(responses, ipfs_items))
      if (this.is_production) {
        console.clear()
      }
      return [...ipfs_items, ...non_ipfs_items]
    },
    ping_q_cache(item) {
      const endpoint_url = `https://q-cache.s3.amazonaws.com/cache/${item.ipfs_path}?t=${Date.now()}`
      return this.$axios.head(endpoint_url)
    },
    _resolve_q_cache(responses, ipfs_items) {
      const cache_endpoint = "https://cwhpsi7c0e.execute-api.us-east-1.amazonaws.com/quantum_cache"
      responses.forEach((response, index) => {
        const url = ipfs_items[index].image
        const ipfs_path = ipfs_items[index].ipfs_path
        const endpoint_url = `https://q-cache.s3.amazonaws.com/cache/${ipfs_path}`
        if (response.status == "fulfilled") {
          // return cached image url
          ipfs_items[index].image = endpoint_url
        } else {
          // return caching endpoint that returns an image
          ipfs_items[index].image = `${cache_endpoint}?url=${url}`
        }
      })
    },
    _get_hash_from_url(url) {
      if (!url) {
        return null
      }
      if (url.includes('ipfs://')) {
        return url.replace("ipfs://", "").split('.').slice(0, 1).shift()
      }
      if (url.includes('ipfs/')) {
        return url.split('ipfs/').slice(1).shift().split('.').slice(0, 1).shift()
      }
      return null
    },
    _chunk_from_array(base_arr, chunk_size) {
      const chunk_arr = []
      for (let i = 0; i < base_arr.length; i += chunk_size) {
        chunk_arr.push(base_arr.slice(i, i + chunk_size))
      }
      return chunk_arr
    },
    _handle_alchemy_request_error(error) {
      console.log(error)
      throw error
    },
  }
}