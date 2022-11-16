<template>
  <div id="footer" class="footer">
    <a href="https://quantum.tech" class="">
      <img src="@/assets/icons/BUILT_BY_QUANTUM.svg" alt="" class="">
    </a>
    <!-- <div class="font-footer font-thin text-md text-primary text-center uppercase tracking-widest mt-4 mb-2">Built by Quantum Tech</div> -->
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="postcss" scoped>
.footer {
  @apply px-8 flex flex-col items-center justify-center gap-y-12 pt-20 pb-10;
  img {
    @apply w-24 object-contain;
  }
}
</style>