<template>
  <div v-if="item && (item.is_on_site || is_show_all)" class="testimonial-card">
    <img v-if="item.image_url" @click="open_lightbox(item.image_url)" :src="item.image_url" alt="" />
    <div v-if="item.text" class="testimonial">
      <p class="">{{item.text}}</p>
      <div class="author">
        <a :href="item.tweet_url" target="_blank" class="contents">
          <img :src="item.avatar_url" alt="" />
          <div class="username">{{item.twitter}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import lightbox from '@/mixins/lightbox'
Vue.mixin(lightbox)
export default {
  name: 'Testimonials',
  props: {
    item: Object,
  },
  data() {
    return {
      is_show_all: true,
    }
  },
  computed: {},
  methods: {},
}
</script>

<style lang="postcss" scoped>
.testimonial-card {
  @apply flex flex-col items-center justify-start gap-2 border border-primary;
  img {
    @apply w-full h-[300px] object-cover cursor-pointer;
  }
  .testimonial {
    @apply w-full flex flex-col items-center justify-center gap-2 p-4;
    p {
      @apply w-full text-left;
    }
    .author {
      @apply w-full self-end inline-flex items-center justify-end gap-1 text-xs;
      img {
        @apply w-4 h-4 rounded-full border border-primary object-contain;
      }
      .username {
        @apply font-bold text-left whitespace-nowrap;
      }
    }
  }
}
</style>
