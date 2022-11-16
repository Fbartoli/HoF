<template>
  <div>
    <a @click="toggleAccordion()" class="accordion" :aria-expanded="isOpen" :aria-controls="`collapse${_uid}`">
      <slot name="title" />
      <svg
        class=""
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        }"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 10"
        aria-hidden="true"
      >
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
    <Transition name="fade-fast">
      <div v-show="isOpen" :id="`collapse${_uid}`" class="content">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'FaqAccordion',
  props: {
    index: Number,
    open_first: Boolean,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {
    if (this.open_first && this.index == 0) {
      this.isOpen = true
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
      this.$emit('toggled', this.index)
    },
    closeAccordion() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.accordion {
  @apply w-full flex items-center border border-primary bg-background text-left px-4 py-2 gap-4 z-[1] cursor-pointer;
  svg {
    @apply w-3 transition-all duration-200 transform;
  }
}
  .content {
    @apply text-left z-[0];
  }
</style>