import { ethers } from "ethers";
import NFT from "../assets/NFT.json";
import { defineStore } from "pinia";
import { accountStore } from "./account";

const abi = NFT.abi;
const address = NFT.address["80001"];

export const hofStore = defineStore("hof", {
  state: () => ({}),
  actions: {
    async mint() {
      const account = accountStore();

      const { ethersProvider } = account;
      if (!ethersProvider) {
        throw new Error("Please connect");
      }
      const contract = new ethers.Contract(address, abi, ethersProvider);
      await contract.connect(ethersProvider.getSigner()).mint();
    },
    async grantRewards(addresses: string[], ids: number[]) {
      const account = accountStore();
      console.log(addresses, ids);
      const { ethersProvider } = account;
      if (!ethersProvider) {
        throw new Error("Please connect");
      }
      const contract = new ethers.Contract(address, abi, ethersProvider);
      await contract
        .connect(ethersProvider.getSigner())
        .grantRewards(addresses, ids);
    },
  },
});
