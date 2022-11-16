<template>
  <div class="referral-link-container">
    <h3 v-if="!hide_title" class="">YOUR LINK</h3>
    <div class="referral-link">
      <div class="link">{{ ref_url }}</div>
      <button @click="copy_pressed" class="">{{ copy_button_text }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReferralLink',
  props: {
    ref_url: String,
    hide_title: Boolean,
  },
  data() {
    return {
      copy_button_text: 'copy',
    }
  },
  computed: {},
  methods: {
    copy_pressed() {
      try {
        navigator.clipboard
          .writeText(this.ref_url)
          .then((_) => {
            this.set_copy_button_text('copied')
            setTimeout(() => {
              this.set_copy_button_text('copy')
            }, 3000)
            console.log('copied url')
          })
          .catch((_) => {
            this.set_copy_button_text('fail')
            setTimeout(() => {
              this.set_copy_button_text('copy')
            }, 3000)
            console.log('failed to copy url')
          })
      } catch (err) {
        // fallback copy
        var el = document.createElement('textarea')
        el.value = this.tools_url
        el.style.top = '0'
        el.style.left = '0'
        el.style.position = 'fixed'
        document.body.appendChild(el)
        el.focus()
        el.select()
        try {
          let success = document.execCommand('copy')
          this.set_copy_button_text('copied')
          setTimeout(() => {
            this.set_copy_button_text('copy')
          }, 3000)
        } catch (error) {
          console.log('failed to copy url', err)
          console.log(error)
        }
        document.body.removeChild(el)
        setTimeout(() => {
          this.set_copy_button_text('copy')
        }, 3000)
      }
    },
    set_copy_button_text(text) {
      this.copy_button_text = text
    },
  },
}
</script>

<style lang="postcss" scoped>
/* @import 'style/components/adaptive_font.scss'; */

.referral-link-container {
  @apply w-full flex flex-col items-start justify-center gap-0;
  h3 {
    @apply text-xl;
  }
  .referral-link {
    @apply w-full border border-primary p-2 flex flex-row items-center justify-between gap-0 text-xs;
    .link {
      @apply select-all whitespace-nowrap truncate;
    }
    button {
      @apply text-right shrink-0;
    }
  }
}
</style>
