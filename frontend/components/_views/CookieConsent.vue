<template>
  <div class="consent-container">
    <div class="consent">
      <div class="left">
        <p class="">This website uses cookies to ensure you get the best experience on our website.</p>
      </div>
      <div class="right">
        <button @click="accept_consent_pressed" class="">Got it</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CookieConsent',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('gdpr', ['getTrackingAccepted']),
  },
  methods: {
    ...mapActions('gdpr', ['updateTrackingPreference']),
    accept_consent_pressed() {
      this.updateTrackingPreference(true)
    },
  },
}
</script>

<style lang="postcss" scoped>
.consent-container {
  @apply fixed bottom-0 inset-x-0 px-4 py-2 flex items-center justify-center text-base border border-primary bg-background z-[101];
  .consent {
    @apply w-full max-w-screen-lg flex items-center justify-between px-4;
    .left {
      @apply text-left;
    }
    .right {
      @apply flex flex-col items-end justify-center;
      button {
        @apply px-2 py-0.5 bg-background border border-primary text-sm whitespace-nowrap;
      }
    }
  }
}
</style>
