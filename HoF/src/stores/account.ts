import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import { defineStore } from "pinia";

const injected = injectedModule();
const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x13881",
      label: "Mumbaï",
      token: "Matic",
      rpcUrl:
        "https://polygon-mumbai.alchemyapi.io/v2/au4CaFdS4SH2_EYP4zN0MZ7hJEouxgHh",
    },
  ],
  apiKey: "9313f37f-e661-4fe4-9d85-4c006d2de453",
  notify: {},
});

export interface accountStoreInt {
  ethersProvider: ethers.providers.Web3Provider | null;
}

export const accountStore = defineStore("account", {
  state: (): accountStoreInt => ({
    ethersProvider: null,
  }),
  actions: {
    async connect() {
      const wallets = await onboard.connectWallet();

      if (wallets[0]) {
        console.log(wallets[0]);
        // create an ethers provider with the last connected wallet provider
        this.ethersProvider = new ethers.providers.Web3Provider(
          wallets[0].provider,
          "any"
        );
      }
    },
    getters: {
      provider: (state: accountStoreInt) => state.ethersProvider,
    },
  },
});
