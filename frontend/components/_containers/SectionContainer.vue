<template>
  <section class="relative">
    <div class="content-container" :class="content_class"  :data-aos="disable_aos ? '' : 'fade'" data-aos-delay="300">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    content_class: String,
    disable_aos: Boolean,
  },
  computed: {},
}
</script>

<style lang="postcss" scoped>
/* section {
  @apply 
} */
.content-container {
  @apply relative w-full max-w-screen-2xl mx-auto px-4 sm:px-16 py-8 overflow-hidden;
}
</style>