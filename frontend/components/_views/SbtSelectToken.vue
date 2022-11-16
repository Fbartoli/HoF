<template>
  <div class="contents">
    <div class="filter-container">
      <select id="collection-filter" v-model="selected_collection_filter" class="collection-filter uppercase">
        <option :value="null">ALL</option>
        <option v-for="(status, index) in all_status" :key="`collection-filter-${index}`" :value="status">{{ status }}</option>
      </select>
    </div>
    <div class="collection-grid">
      <CollectionSelectionCard v-for="(collection_data, index) in sbt_tokens_data" :key="`sbt-collection-select-${index}`" v-show="is_displayed(collection_data)" :collection_data="collection_data" :hide_token_id="true" :hide_item_name="true" @item_selected="item_selected" />
    </div>
    <div v-if="!sbt_tokens_data.length" class="collection-grid-placeholder">
      <p class="">No SBT found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SbtSelectToken',
  props: {
    sbt_tokens_data: Array,
  },
  data() {
    return {
      selected_collection_filter: null,
      all_status: [
        "ordered",
        "shipped",
        "delivered",
        "error",
      ]
    }
  },
  computed: {
    displayed_collections_data() {
      if (this.selected_collection_filter) {
        return this.sbt_tokens_data.filter((data) => data.status == this.selected_collection_filter)
      }
      return this.sbt_tokens_data
    },
  },
  methods: {
    item_selected(collection_data) {
      console.log("selected", collection_data)
      this.$emit('collection_data_selected', collection_data)
    },
    is_displayed(collection_data) {
      return this.displayed_collections_data.includes(collection_data)
    },
  },
}
</script>

// style in OrderSelectToken.vue
<style lang="postcss" scoped>
</style>
