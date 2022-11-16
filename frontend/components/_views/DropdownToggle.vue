<template>
  <div class="dropdown-toggle-container">
    <div @click="toggle_dropdown()" class="dropdown-toggle" :class="{open: show_dropdown}">
      <!-- <button class="toggle-button clean">
      </button> -->
      <label class="title left noselect">{{ display_name_for(selected_dropdown) }}</label>
      <DropDownSvg :isOpen="show_dropdown" />
    </div>
    <transition name="dropdown" mode="out-in">
      <div v-if="show_dropdown" class="dropdown-dropdown">
        <!-- <div class="border-box" :class="true ? 'border-quantum' : 'border-quantum'"></div> -->
        <button @click="set_dropdown(dropdown)" class="noselect" :class="{ 'text-accent': is_selected_dropdown(dropdown) && false }" v-for="dropdown in dropdown_data" :key="dropdown.value">{{ dropdown.name }}</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'dropdownToggle',
  data() {
    return {
      dropdown_data: [], // replace this
      selected_dropdown: null,
      show_dropdown: false,
    }
  },
  computed: {
    default_dropdown() {
      return this.dropdown_data
        .filter((data) => data.is_default)
        .slice(0, 1)
        .shift()
    },
  },
  mounted() {
    // this.set_default()
  },
  methods: {
    set_default() {
      this.set_dropdown(this.default_dropdown)
    },
    set_dropdown(dropdown) {
      this.selected_dropdown = dropdown
      this.$emit('set_dropdown', dropdown)
      this.show_dropdown = false
    },
    toggle_dropdown() {
      this.show_dropdown = !this.show_dropdown
    },
    display_name_for(dropdown) {
      return dropdown?.name || 'CHANGE DROPDOWN'
    },
    is_selected_dropdown(dropdown) {
      return dropdown?.value == this.selected_dropdown?.value
    },
  },
}
</script>

<style lang="postcss" scoped>
.dropdown-toggle-container {
  @apply relative;
  .dropdown-toggle {
    @apply flex flex-row flex-nowrap items-center justify-between cursor-pointer;
    @apply min-w-[315px] px-4 py-2 border border-primary;
    &.open {
      @apply bg-background;
    }
    label {
      @apply pt-1;
    }
  }
  button {
    @apply relative text-left whitespace-nowrap;
    .border-box {
      border: solid;
      @apply absolute -inset-x-2 inset-y-0 border mt-0 opacity-50 pointer-events-none rounded-sm;
    }
  }
  .dropdown-dropdown {
    @apply absolute inset-x-0 -mt-0.5 flex flex-col items-stretch justify-start gap-0 bg-background z-[3] rounded-sm;
    @apply border-l border-b border-r border-primary;
    transition: max-height 0.5s;
    @apply max-h-[300px] md:max-h-[500px] overflow-y-auto;
    @apply w-full;
    /* &.open {
      @apply max-h-[500px] overflow-y-auto;
    }
    &.close {
      @apply max-h-[0px];
    } */
    /* min-width: calc(100% + theme('padding.4')); */
    .border-box {
      @apply absolute inset-0 border mt-0 opacity-50 pointer-events-none rounded-sm;
    }
    button {
      @apply text-left whitespace-nowrap p-2 px-4 normal-case;
      @apply hover:text-accent;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
  @apply max-h-[300px] md:max-h-[500px];
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  @apply max-h-[0px];
}
</style>
