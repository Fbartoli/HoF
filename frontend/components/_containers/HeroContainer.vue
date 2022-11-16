<template>
  <div id="hero" class="">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
#hero {
  @apply relative w-full min-h-[80vh] md:h-auto md:aspect-video xl:h-screen flex flex-col 2xl:flex-row items-center justify-start overflow-hidden px-4;
}
</style>