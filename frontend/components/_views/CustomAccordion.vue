<template>
  <div>
    <button @click="toggleAccordion()" class="accordion" :aria-expanded="isOpen" :aria-controls="`collapse${_uid}`">
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
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`" class="">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomAccordion",
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
  @apply w-full flex items-center space-x-3 border-b-2 border-primary text-left;
  svg {
    @apply w-3 transition-all duration-200 transform;
  }
  div {
    @apply text-left mt-2;
  }
}
</style>