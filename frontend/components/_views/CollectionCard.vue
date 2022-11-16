<template>
<a :href="collection_data.os_url" target="_blank" class="">
  <div class="card">
  <div class="">
      <img :src="collection_data.image" alt="" class="">
  </div>
  <p class="">{{collection_data.name}}</p>
</div>
</a>
</template>

<script>
export default {
  name: 'CollectionCard',
  props: {
    index: Number,
    collection_data: Object,
  },
  data() {
    return {
      
    }
  },
  computed: {
  },
  methods: {
    
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply aspect-square relative flex flex-col items-center justify-center gap-1;
  div {
    @apply w-full border border-primary;
    img {
      @apply w-full object-contain;
    }
  }
  p {
    @apply text-xs text-center leading-3 hidden;
  }
}
</style>
