<template>
  <div class="count-input">
    <button @click="update_count(false)" :disabled="is_min_count" class="noselect">ー</button>
    <div class="count noselect">{{ count }}</div>
    <button @click="update_count(true)" :disabled="is_max_count" class="noselect">＋</button>
  </div>
</template>

<script>
export default {
  name: 'CountInput',
  props: {
    min_count: {
      type: Number,
      default: 0,
    },
    max_count: {
      type: Number,
      default: Number.POSITIVE_INFINITY,
    }
  },
  data() {
    return {
      count: null,
    }
  },
  computed: {
    is_min_count() {
      return this.count <= this.min_count
    },
    is_max_count() {
      return this.count >= this.max_count
    },
  },
  mounted() {
    this.set_default_count()
  },
  methods: {
    set_default_count() {
      this.count = this.min_count
      this.$emit('update_count', this.count)
    },
    update_count(is_increment) {
      this.count += is_increment ? 1 : -1
      this.$emit('update_count', this.count)
    }
  },
}
</script>

<style lang="postcss" scoped>
.count-input {
  @apply flex flex-row justify-center items-center gap-4 text-center;
  button {
    @apply border-primary text-primary disabled:text-primary/50 rounded-sm;
  }
  .count {
    @apply w-10 text-base;
  }
}
</style>
