<template>
  <div v-show="getLightboxImage" class="lightbox-container">
    <Transition name="fade" mode="out-in">
      <div v-if="getLightboxImage" class="lightbox" :style="`max-width: ${max_width}px;`">
        <button @click="close_lightbox" class="">
          <img src="@/assets/icons/close_icon_black.svg" alt="" class="" />
        </button>
        <img :src="getLightboxImage" alt="" class="main-image" />
      </div>
    <!-- opacity layer -->
    </Transition>
    <Transition name="fade" mode="out-in">
    <div v-if="getLightboxImage" @click="close_lightbox" class="opacity-layer"></div>
    </Transition>
  </div>
</template>

<script>
import Vue from 'vue'
import lightbox from '@/mixins/lightbox'
Vue.mixin(lightbox)

export default {
  name: 'SingleItemLightbox',
  data() {
    return {}
  },
  computed: {
    max_width() {
      return this.getLightboxImageWidth || 500
    }
  },
  methods: {
  },
}
</script>

<style lang="postcss">
.lightbox-container {
  @apply fixed inset-0 flex items-center justify-center z-[101] px-4;
  .lightbox {
    @apply relative w-full border border-primary;
    button {
      @apply fixed top-4 left-4 md:absolute md:-left-10 md:top-0 z-[5];
      img {
        @apply w-8 h-8 object-contain border border-primary bg-background;
      }
    }
    img.main-image {
      @apply w-full object-contain;
    }
  }
  .opacity-layer {
    @apply absolute inset-0 z-[-1] bg-background opacity-80;
  }
}
</style>
