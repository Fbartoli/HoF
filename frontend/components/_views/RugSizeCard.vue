<template>
  <div class="card">
    <img :src="get_asset_image(card_data.text_image)" alt="" class="" />
    <!-- <h4 class="">{{card_data.title}}</h4> -->
    <div class="top-right">
      <h6 v-if="card_data.price" class="">${{card_data.price}}</h6>
      <p v-if="card_data.description" class="">{{card_data.description}}</p>
    </div>
    <div class="action">
      <button @click="buy_rug_pressed(card_data.size)" class="">Order {{ card_data.size }}</button>
      <div v-if="stock_remaining != null" class="stock-text">{{ stock_remaining }} in stock</div>
      <!-- <div class="stock-text">100 in stock</div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RugSizeCard',
  props: {
    card_data: Object,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('nft', ['getRemainingStock']),
    stock_remaining() {
      try {
        return this.getRemainingStock[this.card_data.index]
      } catch {
        return null
      }
    },
  },
  async mounted() {
  },
  methods: {
    buy_rug_pressed(size) {
      this.$emit('buy_rug_pressed', size)
    },
  },
}
</script>

<style lang="postcss" scoped>
@import 'style/components/adaptive_font.scss';
.card {
  @apply relative snap-always min-w-[300px] sm:min-w-min flex flex-col items-center justify-start gap-y-2 p-4 aspect-square border border-primary bg-card;
  img {
    @apply self-start w-[80%] object-contain;
  }
  h4 {
    @apply text-left shrink-0;
    line-height: 100%;
    font-size: calc(1.5rem + 100%);
    word-spacing: 100vw;
  }
  .top-right {
    @apply absolute top-4 right-4 flex flex-col items-end justify-start gap-2 text-xs text-right;
    h6 {
      @apply font-bold text-base leading-3;
    }
    p {
 @apply text-base leading-3;
    }
  }
  .action {
    @apply absolute inset-x-0 bottom-4 flex flex-col items-center justify-end gap-y-1 z-[1];
    button {
      @apply text-sm border border-primary bg-background flex items-center justify-center py-1 px-2 uppercase whitespace-nowrap;
    }
    .stock-text {
      @apply text-xs text-center uppercase;
    }
  }
}
</style>