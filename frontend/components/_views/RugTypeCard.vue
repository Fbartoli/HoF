<template>
  <button v-if="type_data" @click="selected" class="type-card">
    <div class="left">
      <div class="top">
        <h4 class="">{{ type_data.name }}</h4>
        <p v-if="price_difference" class="">{{ price_difference }}</p>
      </div>
      <p class="">{{ type_data.description }}</p>
    </div>
    <div class="right">
      <img :src="get_asset_image(type_data.image)" alt="" class="" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'RugTypeCard',
  props: {
    type_data: Object,
    selected_type_data: Object,
  },
  data() {
    return {}
  },
  computed: {
    price_difference() {
      if (this.selected_type_data) {
        const selected_price = this.selected_type_data.price
        const card_price = this.type_data.price
        const price_change = card_price - selected_price
        if (price_change) {
          const plus_minus = price_change > 0 ? '+' : '-'
          return `${plus_minus}$${Math.abs(price_change)}`
        }
        return null
      }
      if (this.type_data.price) {
        const plus_minus = this.type_data.price > 0 ? '+' : '-'
        return `${plus_minus}$${Math.abs(this.type_data.price)}`
      }
      return null
    },
  },
  methods: {
    selected() {
      this.$emit('type_selected', this.type_data)
    },
  },
}
</script>

<style lang="postcss" scoped>
@import 'style/components/adaptive_font.scss';
.type-card {
  @apply w-full bg-background border rounded-none flex flex-row items-center justify-between p-4;
  .left {
    @apply flex flex-col items-start justify-center gap-y-0 text-left;
    .top {
      @apply inline-flex items-center justify-start gap-2;
      h4 {
        @apply uppercase;
      }
      p {
        @apply text-xs;
      }
    }
    p {
      @apply text-xs uppercase max-w-[300px];
    }
  }
  .right {
    @apply flex flex-row items-center justify-center aspect-square;
    img {
      @apply w-24 object-contain;
    }
  }
}
</style>
