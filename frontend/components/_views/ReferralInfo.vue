<template>
  <div class="ref-info">
    <h5 class="">Refer a friend</h5>
    <p class="">Use this URL to share RUG SUPPLY with your friends and earn 1% of all sales that come in using your URL.</p>
    <div class=""></div>
    <p class="">Limit 500 USDC in rewards per wallet.</p>
    <ReferralLink :ref_url="ref_url" :hide_title="true" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ReferralInfo',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('account', ['isUserConnected', 'getActiveAccount', 'getEnsName']),
    ref_url() {
      try {
        const ref = this.getEnsName || this.getActiveAccount
        return `${window.location.origin}?ref=${ref}`
      } catch {
        return null
      }
    },
  },
  methods: {},
}
</script>

<style lang="postcss" scoped>
.ref-info {
  @apply w-full flex flex-col items-start justify-start gap-1;
  h5 {
    @apply uppercase text-base font-bold;
  }
  p {
    @apply text-left;
  }
}
</style>
