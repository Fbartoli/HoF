<template>
  <div id="file-drop-container" class="" @drop.prevent="onDrop">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FileDropContainer',
  data() {
    return {
      event_names: ['dragenter', 'dragover', 'dragleave', 'drop'],
    }
  },
  mounted() {
    this.event_names.map((event) => {
      document.getElementById('file-drop-container').addEventListener(event, this.preventDefaults)
    })
  },
  beforeDestroy() {
    try {
      this.event_names.map((event) => {
        document.getElementById('file-drop-container').removeEventListener(event, this.preventDefaults)
      })
    } catch {}
  },
  methods: {
    onDrop(event) {
      this.$emit('file_dropped', [...event.dataTransfer.files])
    },
    preventDefaults(event) {
      event.preventDefault()
    },
  },
}
</script>

<style>
</style>