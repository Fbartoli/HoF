<template>
  <svg
    class="w-3 h-3"
    :class="{
      'rotate-180': isOpen,
      'rotate-0': !isOpen,
      open: isOpen,
    }"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 10"
    aria-hidden="true"
  >
    <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'DropDownSvg',
  props: {
    isOpen: Boolean,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="postcss" scoped>
svg {
  @apply transition-all duration-200 transform;
}
</style>
