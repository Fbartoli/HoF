<template>
  <div v-if="confirmation_steps" class="multistep-confirmation">
    <ConfirmationStep v-show="!step.is_skip && is_group(step.group_key)" v-for="(step, index) in confirmation_steps" :key="`confirmation-step-${step.title}-${index}`" :index="action_index(index)" :title="step.title" :description="step.description" :class="{'opacity-40 pointer-events-none': is_future_step(step)}" >
      <slot :name="`step-${step.step_index}`" />
    </ConfirmationStep>
  </div>
</template>

<script>
export default {
  name: 'MultiStepConfirmationContainer',
  props: {
    confirmation_steps: Array,
    current_step_key: Number,
    group_key: Number,
    // {
    //   title: 'confirm signature',
    //   description: 'This is a step to sign signature on your wallet.'
    // }
  },
  methods: {
    is_group(group_key) {
      if (!this.group_key || !group_key) {
        return true
      }
      return this.group_key == group_key
    },
    action_index(index) {
      if (this.confirmation_steps[index].is_unnumbered) {
        return null
      }
      return this.confirmation_steps.slice(0,index).filter((data) => !data.is_skip).length + 1
    },
    is_future_step(step) {
      if (this.current_step_key) {
        return step.step_key > this.current_step_key
      }
      return false
    }
  }
}
</script>

<style lang="postcss" scoped>
.multistep-confirmation {
  @apply w-full flex flex-col items-center justify-center gap-y-10 py-4 md:py-6;
}
</style>