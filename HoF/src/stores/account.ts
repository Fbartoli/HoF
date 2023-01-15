import { defineStore } from "pinia";
import {
  configureChains,
  createClient,
  type GetAccountResult,
  type Provider,
  signMessage,
} from "@wagmi/core";

import { polygon, mainnet } from "@wagmi/core/chains";

import { Web3Modal } from "@web3modal/html";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
const chains = [mainnet, polygon];

// Wagmi Core Client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "c69e65ecd5e99efed47122f78766ee94" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

export interface Options {
  route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
}

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal(
  { projectId: "c69e65ecd5e99efed47122f78766ee94" },
  ethereumClient
);

export interface accountStoreInt {
  ensName: string | null;
  account: GetAccountResult<Provider> | null;
  watcher: boolean;
  client: EthereumClient;
}

export const accountStore = defineStore("account", {
  state: (): accountStoreInt => ({
    ensName: null,
    account: null,
    watcher: false,
    client: ethereumClient,
  }),
  actions: {
    async connect() {
      await web3modal.openModal();
    },
    async sign() {
      console.log(this.client);

      await signMessage({ message: "lol" });
    },
    async watchAccount() {
      if (this.watcher) return;
      ethereumClient.watchAccount(async (account) => {
        this.account = account;
      });
    },
    getters: {
      ethereumClient,
    },
  },
});
