export default {
  methods: {
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
          const item_project_data = projects_data.filter((data) => String(data.contract).toLocaleLowerCase() == String(items[index].contract_address).toLowerCase()).slice(0, 1).shift()
          const metadata = response.value.data
          try {
            Object.entries(metadata).forEach(([key,value]) => {
              items[index][key] = value
            })
            items[index].metadata = metadata
          } catch (error) {
            console.log(error)
            items = []
          }
          // update image
          try {
            const hd_res = item_project_data.image_hd
            const sm_res = item_project_data.image_sd
            items[index].image = metadata.image.replace(`/${hd_res}/`, `/${sm_res}/`)
          } catch {
            items[index].image = metadata.image
          }
          // console.log("resolved item", items[index])
        } else {
          items = []

          console.log("unresolved item", items[index])
        }
      })
    },
    _populate_sbt_token_data(id) {
      return {
        collection_name: 'SBT',
        contract_address: this.$store.getters['nft/getNFTAddress'],
        name: `SBT #${id}`,
        token_id: id,
        image: `${this.$store.getters['sbt/getSbtImageBaseUrl']}/${id}.png`,
        metadata_url: `${this.$store.getters['sbt/getSbtMetadataBaseUrl']}/${id}`,
        os_url: `${this.$store.getters['sbt/etSbtOSCollectionBaseUrl']}/${id}`,
      }
    },
  }
}