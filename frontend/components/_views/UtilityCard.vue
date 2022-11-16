<template>
  <div class="card">
    <h3 class="">{{ title }}</h3>
    <p class="">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'UtilityCard',
  props: {
    title: String,
    description: String,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="postcss" scoped>
.card {
  direction: ltr;
  @apply snap-always min-w-[300px] sm:min-w-min flex flex-col justify-end gap-y-0 p-4 text-left aspect-square border border-primary bg-card;
}
</style>
