<template>
  <div class="">
    <!-- hero -->
    <HeroContainer>
      <AlternatingTable />
    </HeroContainer>
  </div>
</template>

<script>
export default {
  name: 'Lander',
  components: {},
  data() {
    return {}
  },
  computed: {},
  async mounted() {},
  methods: {},
}
</script>

<style lang="postcss" scoped>
#test {
  button {
    @apply bg-white h-10 w-44 text-red-700;
  }
  h2 {
    @apply text-accent;
    background: white;
  }
}
</style>