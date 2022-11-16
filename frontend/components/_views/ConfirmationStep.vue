<template>
  <div class="confirmation-step">
    <div class="left-side">
      <h5 v-if="title" :class="{ indent: index }">
        <span v-if="index">{{ index }}. </span>{{ title }}
      </h5>
      <p class="" :class="index ? '' : 'no-indent'">{{ description }}</p>
    </div>
    <div class="right-side">
      <!-- <button v-if="!is_signature_confirmed" @click="confirm_pressed" :disabled="confirm_button_text != defalt_confirm_button_text" class="w-44 bg-accent disabled:bg-gray-600 font-bold text-lg px-2 py-2 uppercase">{{ confirm_button_text }}</button>
      <button v-else :disabled="true" class="w-44 text-button-green font-bold text-lg px-2 py-2 uppercase">CONFIRMED</button> -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationStep',
  props: {
    index: Number,
    title: String,
    description: String,
  },
}
</script>

<style lang="postcss" scoped>
@import 'style/components/adaptive_font.scss';
.confirmation-step {
  @apply w-full flex flex-col md:flex-row items-start md:items-center justify-between;
  .left-side {
    @apply grow flex flex-col items-start justify-center gap-y-2 text-left;
    h5 {
      @apply adaptive-text-xl uppercase;
    }
    .indent {
      text-indent: -34px;
      padding-left: 34px;
    }
    p {
      @apply text-sm text-left;
      padding-left: 34px;
      &.no-indent {
        padding-left: 0px;
      }
    }
  }
  .right-side {
    @apply w-full flex flex-col items-start md:items-end justify-center gap-2;
  }
}
</style>