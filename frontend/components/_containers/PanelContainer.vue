<template>
  <section class="panel-container" :class="`${side}`">
    <div class="desktop-close-button-container" :class="`${side}`">
      <button @click="toggle_panel" class="">
        <img src="@/assets/icons/close_icon_black.svg" alt="" class="" />
      </button>
    </div>
    <aside v-if="title" :class="`${side}`">
      <transition name="slide-fade" mode="out-in">
        <h2 :key="title">{{ title }}</h2>
      </transition>
    </aside>
    <div class="content-container">
      <div class="close-button-container">
        <button @click="toggle_panel" class="">
          <img src="@/assets/icons/close_icon_black.svg" alt="" class="" />
        </button>
      </div>
      <div :class="content_class">
        <slot name="content" />
        <div class="panel-footer-container">
          <div class="panel-footer">
            <slot name="footer" />
            <div v-if="!disable_footer_gradient" class="panel-footer-gradient"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PanelContainer',
  props: {
    title: String,
    content_class: String,
    full_width: Boolean,
    side: String,
    disable_footer_gradient: Boolean,
  },
  computed: {},
  methods: {
    toggle_panel() {
      this.$emit('toggle_panel')
    },
  },
}
</script>

<style lang="postcss">
.panel-container {
  @apply absolute inset-y-0 w-full max-w-[500px];
  &.right {
    @apply right-0;
  }
  &.left {
    @apply left-0;
  }
  aside {
    @apply absolute top-16 z-[1];
    /* @apply sticky top-20 mr-0 left-20; */
    writing-mode: vertical-rl;
    text-orientation: sideways;
    transform: scale(-1);
    &.right {
      @apply left-[-2rem];
      h2 {
        @apply sm:pl-3;
      }
    }
    &.left {
      @apply right-[-2rem];
      h2 {
        @apply sm:pr-3;
      }
    }
  }
}
.desktop-close-button-container {
  @apply hidden sm:block absolute top-4;
  button {
    @apply bg-background border border-primary p-0.5;
    img {
      @apply w-6 h-6 object-contain;
    }
  }
  &.right {
    @apply -left-10;
  }
  &.left {
    @apply -right-10;
  }
}
.content-container {
  @apply relative w-full h-full;
}
.close-button-container {
  @apply sm:hidden absolute left-4 top-4 z-[3];
  button {
    @apply bg-background border border-primary p-0.5;
    img {
      @apply w-6 h-6 object-contain;
    }
  }
}
.panel-footer-container {
  @apply w-full md:w-auto md:absolute md:bottom-4 md:inset-x-4;
  .panel-footer {
    @apply relative flex flex-col items-center justify-end z-[1];
    .panel-footer-gradient {
      @apply absolute -bottom-4 inset-x-0 h-full sm:h-[180%] bg-gradient-to-b from-transparent via-background to-background z-[0] pointer-events-none;
    }
  }
}
.panel-layer {
  @apply fixed inset-0 z-[101] w-full h-full bg-background/80 [@supports(backdrop-filter:blur(0px))]:bg-background/80;
}
.toggle-panel {
  @apply absolute z-[-1] inset-0 w-full h-full cursor-default disabled:cursor-default;
}
.panel-top-padding {
  padding-top: theme('padding.16') !important;
  @media (min-width: theme('screens.sm')) {
    padding-top: theme('padding.10') !important;
  }
  /* @apply pt-16 sm:pt-10; */
}
.panel-bottom-padding {
  padding-bottom: theme('padding.4') !important;
  @media (min-width: theme('screens.sm')) {
    padding-bottom: theme('padding.40') !important;
  }
  /* @apply sm:pb-40; */
}
</style>