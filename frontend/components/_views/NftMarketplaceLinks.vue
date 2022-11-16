<template>
  <div class="marketplace-card-container">
    <h4 v-if="title" class="">{{title}}</h4>
    <div class="marketplace-cards">
      <a v-for="(marketplace, index) in marketplaces" :key="`marketplace-${index}`" :href="marketplace_url(marketplace)" target="_blank" class="">
      <div class="marketplace-card">
        <img :src="require(`@/assets/icons/${marketplace.image}`)" alt="" class="" />
        <p class="">{{ marketplace.name }}</p>
      </div>
    </a>
    </div>
  </div>
</template>

<script>
import marketplaces from '~/assets/data/marketplaces.json'
export default {
  name: 'NftMarketplaceLinks',
  props: {
    title: String,
    contract_address: String,
    token_id: Number,
  },
  data() {
    return {
       marketplaces: marketplaces,
    }
  },
  computed: {},
  methods: {
    marketplace_url(marketplace) {
      return `${marketplace.base_url}${this.contract_address}${marketplace.separation}${this.token_id}`
    },
  },
}
</script>

<style lang="postcss" scoped>
.marketplace-card-container {
  @apply flex flex-col items-center justify-center gap-2;
  .marketplace-cards {
    @apply grid grid-cols-3 items-center justify-center gap-y-2;
  .marketplace-card {
    @apply bg-background flex flex-col items-center justify-center p-2 w-20 gap-1;
    img {
      @apply w-12 object-contain;
    }
    p {
      @apply text-xs uppercase;
    }
  }
  }
}
</style>
