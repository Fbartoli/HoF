<template>
  <div class="panel-layout">
    <!-- left side panel -->
    <aside class="relative left-panel panel-transition" :class="left_span_class">
      <SidePanelContainer :back_text="left_back_text" side="left" :is_open="is_panel_open('left')" @close_panel="close_panel">
        <slot name="left-panel" />
      </SidePanelContainer>
    </aside>
    <!-- main content -->
    <div class="relative center-content panel-transition" :class="center_span_class">
      <!-- left panel open toggle -->
      <button v-if="show_left_panel_toggle" @click="open_panel('left')" class="left-panel-toggle" :class="left_panel_open_toggle_class">
        <div v-if="left_back_text" class="text-xs">{{ left_back_text }}</div>
        <img src="@/assets/icons/back_arrow_reverse.svg" alt="" class="" />
      </button>
      <!-- right panel open toggle -->
      <button v-if="show_right_panel_toggle" @click="open_panel('right')" class="right-panel-toggle" :class="right_panel_open_toggle_class">
        <img src="@/assets/icons/back_arrow.svg" alt="" class="" />
        <div v-if="right_back_text" class="text-xs">{{ right_back_text }}</div>
      </button>
      <!-- main content -->
      <slot name="main-content" />
    </div>
    <!-- right side panel -->
    <aside class="relative right-panel panel-transition" :class="[right_span_class]">
      <SidePanelContainer :back_text="right_back_text" side="right" :is_open="is_panel_open('right')" @close_panel="close_panel">
        <slot name="right-panel" />
      </SidePanelContainer>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    show_left_panel_toggle: Boolean,
    show_right_panel_toggle: Boolean,
    left_back_text: String,
    right_back_text: String,
  },
  data() {
    return {
      panel_state: '',
    }
  },
  computed: {
    left_span_class() {
      return this.is_panel_open('left') ? 'w-0 md:w-[300px] opacity-100 z-[1]' : 'w-0 opacity-delay-150 opacity-100 z-[0] no-user-interaction'
    },
    center_span_class() {
      return this.panel_state ? 'opacity-0 md:opacity-100' : ''
    },
    right_span_class() {
      return this.is_panel_open('right') ? 'w-0 md:w-[300px] opacity-100 z-[1]' : 'w-0 opacity-delay-150 opacity-100 z-[0] no-user-interaction'
    },
    left_panel_open_toggle_class() {
      return this.is_panel_open('left') ? '-translate-x-10 opacity-0 no-user-interaction' : 'duration-300 ease-out translate-x-0 delay-150'
    },
    right_panel_open_toggle_class() {
      return this.is_panel_open('right') ? 'translate-x-10 opacity-0 no-user-interaction' : 'duration-300 ease-out translate-x-0 delay-150'
    },
  },
  methods: {
    toggle_panels() {
      if (!this.panel_state) {
        this.panel_state = 'left'
      } else if (this.panel_state == 'left') {
        this.panel_state = 'right'
      } else {
        this.panel_state = ''
      }
    },
    open_panel(side) {
      this.panel_state = side
    },
    close_panel() {
      this.panel_state = ''
    },
    is_panel_open(side) {
      return this.panel_state == side
    },
  },
}
</script>

<style lang="postcss" scoped>
.panel-layout {
  @apply w-screen h-screen grid gap-4;
  grid-template-columns: min-content 1fr min-content;
}

aside {

  .left-panel {
  }

  .right-panel {
  }
}

.panel-transition {
  @apply transition-all duration-300 ease-in-out;
  transition: width 0.3s;
}

.center-content {
  .left-panel-toggle {
    @apply fixed mt-4 ml-4 inline-flex items-center justify-start gap-x-1 transform z-[10];
  }

  .right-panel-toggle {
    @apply fixed mt-4 mr-4 right-0 inline-flex items-center justify-end gap-x-1 transform z-[10];
  }

  img {
    @apply w-8 h-8 object-contain opacity-80;
  }
}
</style>