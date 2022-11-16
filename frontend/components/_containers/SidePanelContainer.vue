<template>
  <div class="fixed inset-0 md:static w-full h-full" :class="is_open ? 'z-[1]' : 'z-[0]'">
    <div class="relative w-full flex flex-col items-center justify-center gap-y-4" :class="`px-${padding_size}`">
      <!-- mobile close button -->
      <button @click="close_panel" class="md:hidden absolute top-4 left-4">
        <img src="@/assets/icons/close_icon.svg" alt="" class="w-8 h-8 object-contain opacity-80" />
      </button>
      <!-- desktop left panel toggle button -->
      <button v-if="is_left_panel" @click="close_panel" class="hidden md:inline-flex items-center gap-x-1 justify-end absolute top-4 right-4">
        <!-- <img src="@/assets/icons/back_arrow.svg" alt="" class="w-8 h-8 object-contain opacity-80" />
        <div class="text-xs">{{back_text}}</div> -->
        <img src="@/assets/icons/close_icon.svg" alt="" class="w-8 h-8 object-contain opacity-80" />
      </button>
      <!-- desktop right panel toggle button -->
      <button v-if="is_right_panel" @click="close_panel" class="hidden md:inline-flex items-center gap-x-1 justify-start absolute top-4 left-4">
        <!-- <div class="text-xs">{{back_text}}</div>
        <img src="@/assets/icons/back_arrow_reverse.svg" alt="" class="w-8 h-8 object-contain opacity-80" /> -->
        <img src="@/assets/icons/close_icon.svg" alt="" class="w-8 h-8 object-contain opacity-80" />
      </button>
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    side: String,
    back_text: String,
    padding_size: {
      default: 0,
      type: Number,
    },
    is_open: Boolean,
  },
  computed: {
    is_left_panel() {
      return this.side == 'left'
    },
    is_right_panel() {
      return this.side == 'right'
    },
  },
  methods: {
    close_panel() {
      this.$emit('close_panel')
    },
  },
}
</script>

<style>
</style>