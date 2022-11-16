<template>
  <div class="card" :class="{ 'pr-3': !hide_token_id }">
    <button @click="item_selected" class="relative">
      <div v-if="display_collection_name && !hide_item_name" class="info top">
        <p class="">{{ display_item_name }}</p>
      </div>
      <img src="@/assets/images/transparent-placeholder.png" alt="" class="" />
      <img :src="collection_data.image" alt="" class="content-img" />
      <!-- <img :src="`https://picsum.photos/seed/${index}/200`" alt="" class="" /> -->
      <aside v-if="!hide_token_id" class="">
        <p class="bottom">#{{ collection_data.token_id }}</p>
      </aside>
      <!-- <div v-if="display_item_name" class="info bottom">
        <p class="">{{ display_item_name }}</p>
      </div> -->
      <div v-if="is_ordered" class="info bottom">
        <p class="">ORDERED</p>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CollectionCard',
  props: {
    index: Number,
    collection_data: Object,
    hide_item_name: Boolean,
    hide_token_id: Boolean,
    is_ordered: Boolean,
  },
  data() {
    return {}
  },
  computed: {
    display_collection_name() {
      if (this.collection_data) {
        return this.collection_data.collection_name
      }
      return null
    },
    display_item_name() {
      if (this.collection_data) {
        // fix for SP
        if (this.collection_data.contract_address == '0x4a8b01e437c65fa8612e8b699266c0e0a98ff65c') {
          return `Space Poggers #${this.collection_data.token_id}`
        }
        if (this.collection_data.contract_address == '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d') {
          return `BAYC #${this.collection_data.token_id}`
        }
        if (this.collection_data.contract_address == '"0x60e4d786628fea6478f785a6d7e704777c86a7c6"') {
          return `MAYC #${this.collection_data.token_id}`
        }
        return this.collection_data.name
      }
      return null
    },
    os_url() {
      if (collection_data.os_url) {
        return collection_data.os_url
      }
      return ''
    },
  },
  methods: {
    item_selected() {
      this.$emit('item_selected', this.collection_data)
    },
  },
}
</script>

<style lang="postcss" scoped>
.card {
  @apply aspect-square relative flex flex-col items-start justify-center gap-0;
  p {
    @apply font-bold text-xs leading-3 px-1 py-0.5;
  }
  .info {
    @apply absolute bg-background box-content z-[5];
    outline: 1px solid theme('colors.primary');
    &.top {
      @apply top-0 left-0;
    }
    &.bottom {
      @apply bottom-0 right-0;
    }
  }
  button {
    @apply w-full border border-primary;
    img {
      @apply w-full object-contain;
      &.content-img {
        @apply absolute inset-0 cursor-pointer;
      }
    }
  }
  aside {
    @apply float-right absolute bottom-0 -right-4 z-[1];
    /* @apply sticky top-20 mr-0 left-20; */
    writing-mode: vertical-rl;
    text-orientation: sideways;
    p {
      @apply text-left;
    }
  }
}
</style>
