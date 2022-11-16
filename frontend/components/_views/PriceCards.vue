<template>
  <div class="size-card-container">
    <p v-if="price_discount" class="comp-text">{{price_discount}} <img src="@/assets/icons/usdc.svg" alt="" class="inline-icon"> Credit Applied</p>
    <button v-if="size_data" @click="size_selected" class="size-card" :class="card_class">
    <div class="left">
      <h4 class="">{{size_data.size}}</h4>
      <p class="">{{size_data.description}}</p>
    </div>
    <div class="right">
      <div class="">{{displayed_price}}</div>
      <img :src="get_asset_icon(size_data.image)" alt="" class="">
    </div>
  </button>
  </div>
</template>

<script>
export default {
  name: 'PriceCards',
  props: {
    card_class: Array,
    size_data: Object,
    price_discount: Number,
  },
  data() {
    return {}
  },
  computed: {
    displayed_price() {
      if (this.price_discount) {
        const price = this.size_data.price - this.price_discount
        if (price > 0) {
          return price 
        }
      }
      return this.size_data.price
    }
  },
  methods: {
    size_selected() {
      this.$emit('size_selected', this.size_data)
    }
  },
}
</script>

<style lang="postcss" scoped>
@import 'style/components/adaptive_font.scss';
.size-card-container {
  @apply w-full flex flex-col items-end justify-center gap-0;
  .comp-text {
    @apply text-right text-xs;
  .inline-icon {
    @apply inline-block w-3 h-3 object-contain;
  }
  }
}
.size-card {
@apply w-full bg-background border rounded-none flex flex-row items-center justify-between p-4;
  .left {
    @apply flex flex-col items-start justify-center gap-y-0 text-left;
  h4 {
    @apply uppercase;
  }
    p {
      @apply text-xs uppercase;
    }

  }
  .right {
    @apply inline-flex gap-4 items-center justify-end;
    div {
      @apply font-thin adaptive-text-2xl;
    }
    img {
      @apply h-8 w-8 object-contain;
    }
  }
}
</style>
