<template>
  <div class="connect-nav-container">
    <div class="connect-nav">
      <div class="left"></div>
      <div class="right">
        <template v-if="isUserConnected">
          <div @click="disconnect_pressed" class="connect-button">disconnect</div>
          <div class="wallet-info">
            <button @click="open_roles" class="address">{{ display_address | _shortenAddress }}</button>
            <div v-if="owned_token_count" class="">|</div>
            <button @click="open_sbt_manager" v-if="owned_token_count" class="">{{ owned_token_count }} SBT{{ _plural_s(owned_token_count) }}</button>
          </div>
        </template>
        <template v-else>
          <div @click="connect_pressed" :disabled="connect_button_text != default_connect_button_text" class="connect-button">{{ connect_button_text }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>import Vue from 'vue'
import metadataloader from '@/mixins/metadataloader.js'
Vue.mixin(metadataloader)
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      connect_button_text: 'connect',
      default_connect_button_text: 'connect',
      // claimable_usdc: 1000, // replace this with vuex variable
    }
  },
  computed: {
    ...mapGetters('account', ['isUserConnected', 'getActiveAccount', 'getEnsName', 'getChainId']),
    // ...mapGetters('nft', ['getUserInventory']),
    owned_token_count() {
      if (this.getUserInventory) {
        return this.getUserInventory.length
      }
      return 0
    },
    display_address() {
      return this.getEnsName || this.getActiveAccount
    },
  },
  watch: {
    // async getActiveAccount(new_val, old_val) {
    //   if (new_val && new_val != old_val) {
    //     await this.walletInventory(new_val)
    //     await this.updateReferralFees()
    //   }
    // },
  },
  methods: {
    ...mapActions('account', ['connectWeb3Modal', 'disconnectWeb3Modal', 'loadEnsData', 'requireChainId']),
    ...mapActions('nft', ['walletInventory']),
    async connect_pressed() {
      try {
        this.set_connect_button_text('connecting...')
        await this.connectWeb3Modal()
        this.loadEnsData()
        // await this.walletInventory(this.getActiveAccount)
        this.set_connect_button_text(this.default_connect_button_text)
      } catch (error) {
        console.log(error)
        this.set_connect_button_text(this.default_connect_button_text)
      }
    },
    async disconnect_pressed() {
      try {
        await this.disconnectWeb3Modal()
      } catch (error) {
        console.log(error)
      }
    },
    open_roles() {
      if (this.getActiveAccount) {
        const roles_url = `https://roles.quantum.tech/${this.getActiveAccount}`
        window.open(roles_url, '_self')
      }
    },
    open_os() {
      if (this.getActiveAccount) {
        const roles_url = `https://opensea.io/${this.getActiveAccount}`
        window.open(roles_url, '_self')
      }
    },
    set_connect_button_text(text) {
      this.connect_button_text = text
    },
  },
}
</script>

<style lang="postcss" scoped>
.connect-nav-container {
  @apply w-full bg-primary text-background text-sm;
  .connect-nav {
    @apply w-full h-8 max-w-screen-lg mx-auto flex flex-row items-center justify-between px-4;
    .right {
      @apply flex flex-row items-center justify-end msm:gap-2;
      .wallet-info {
        @apply font-bold uppercase inline-flex msm:gap-1 gap-2 msm:text-xs whitespace-nowrap;
      }
    }
    .connect-button {
      @apply underline uppercase font-thin text-xs cursor-pointer disabled:opacity-80;
    }
  }
}
</style>