<template>
  <div class="relative font-main text-primary">
    <Navbar />
    <main class="relative overflow-x-hidden font-main text-primary">
      <keep-alive>
        <Nuxt />
      </keep-alive>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Navbar from '../components/Navbar.vue'
import ethers from '@/mixins/ethers'
import extensions from '@/mixins/extensions'
Vue.mixin(ethers)
Vue.mixin(extensions)

export default {
  name: 'App',
  components: {
    Navbar,
  },
  async mounted() {

    await this.$store.dispatch('account/initWeb3Modal')
    /* EXAMPLE */
    // this.$store.dispatch('nft/storeNFTContractDetails')
    // this.$store.dispatch('nft/fetchRemainingToken')
    // this.$store.dispatch('nft/NFTListener')
    /* EXAMPLE */
  },
  unmounted() {
    this.$store.dispatch('account/disconnectWeb3Modal')
  },
  methods: {},
}
</script>

<style lang="postcss">
body {
  @apply relative font-main text-primary;
}
main {
  @apply relative font-main text-primary;
}

/* enable for scroll margin */
/* section {
  scroll-margin-top: 80px;
} */

.bg-full-width {
  background-size: 100% auto;
}
.web3modal-modal-lightbox {
  z-index: 1000 !important;
}

.no-user-interaction {
  pointer-events: none;
}

/* hide bnc notify */
/* .bn-notify-custom {
  display: none !important;
} */

/* enable for highlight color */
/* ::selection {
  background: theme('colors.accent');
}
::-moz-selection {
  background: theme('colors.accent');
} */

</style>
