<template>
  <nav>
    <ConnectNav />
    <div class="nav-container">
      <!-- left side -->
      <div class="left-nav">
        <NuxtLink :to="{ name: 'index' }" class="logo-container">
          <!-- <img src="@/assets/images/logo.svg" alt="" class="ml-0.5" /> -->
          <h2 class="">QT</h2>
        </NuxtLink>
        <!-- links -->
        <!-- <div class="links">
        <NuxtLink :to="{name: 'ens'}">ENS</NuxtLink>
      </div> -->
      </div>
      <!-- right side -->
      <div class="right-nav">
        <div class="wallet-status">
          <button class="" @click="button_pressed">Button</button>
          <button v-if="false" class="" @click="connectWeb3Modal">{{ getActiveAccount | _shortenAddress }}</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavBar',

  computed: {
    ...mapGetters('account', ['isUserConnected', 'getActiveAccount']),
  },
  created() {},
  methods: {
    ...mapActions('account', ['connectWeb3Modal']),
    button_pressed() {
      console.log("button pressed")
    },
  },
}
</script>

<style lang="postcss" scoped>
nav {
  @apply bg-background sticky inset-x-0 top-0 mx-auto z-[100] flex flex-col items-center justify-center;
.nav-container {
  @apply w-full bg-background max-w-screen-lg mx-auto flex flex-row items-center justify-between px-6 sm:px-4 py-4;
  .left-nav {
    @apply flex flex-row items-end justify-start gap-x-6;
    .logo-container {
      @apply font-bold text-2xl;
    }
    .links {
      @apply flex flex-row items-center justify-start gap-x-4 font-bold text-xl align-baseline;
    }
  }
  .right-nav {
    @apply flex flex-row items-center justify-end;
    .wallet-status {
      @apply font-bold whitespace-nowrap uppercase text-xs;
      button {
        @apply px-2 py-1 pt-1.5 uppercase border border-primary;
      }
    }
  }
}
}
</style>
