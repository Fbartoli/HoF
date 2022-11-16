<template>
  <div class="horizontal-table">
    <div class="row" :class="row_class" v-for="index in row_count" :key="`horizontal-row-${index}`">
       <slot :name="`row-${index}`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalTable',
  props: {
    row_count: Number,
    row_class: String,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="postcss">
.horizontal-table {
  @apply w-full flex flex-col items-center justify-start;
  .row {
    @apply w-full flex flex-row items-center justify-between text-xl
  }
}
</style>
