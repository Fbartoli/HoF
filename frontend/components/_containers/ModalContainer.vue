<template>
  <div class="center-container">
    <div @click="toggle_modal" class="dismiss-overlay"></div>
    <div class="modal-container">
      <div class="modal-desktop-close-button-container">
        <button @click="toggle_modal" class="">
          <img src="@/assets/icons/close_icon_black.svg" alt="" class="" />
        </button>
      </div>
      <aside v-if="title" class="right">
        <transition name="slide-fade" mode="out-in">
          <h2 :key="title">{{ title }}</h2>
        </transition>
      </aside>
      <div class="content-container">
        <div class="close-button-container">
          <button @click="toggle_modal" class="">
            <img src="@/assets/icons/close_icon_black.svg" alt="" class="" />
          </button>
        </div>
        <div class="" :class="content_class">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContainer',
  props: {
    title: String,
    content_class: String,
  },
  computed: {},
  methods: {
    toggle_modal() {
      this.$emit('toggle_modal')
    },
  },
}
</script>

<style lang="postcss">
.center-container {
  @apply fixed inset-0 flex flex-col items-center justify-center gap-0 z-[101];
  .dismiss-overlay {
    @apply absolute inset-0 z-0;
  }
  .modal-container {
    @apply relative w-full mmd:h-full md:max-w-[700px] z-[2];
  }
  .modal-container {
    @apply relative w-full msm:h-full max-w-[420px];
    aside {
      @apply absolute top-10 z-[1];
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
}
.modal-desktop-close-button-container {
  @apply hidden sm:block absolute top-0 -left-10;
  button {
    @apply bg-background border border-primary p-0.5;
    img {
      @apply w-6 h-6 object-contain;
    }
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
.panel-layer {
  @apply fixed inset-0 z-[101] w-full h-full bg-background bg-opacity-80;
}
.modal-top-padding {
  @apply pt-16 pb-4 sm:py-4;
}
</style>