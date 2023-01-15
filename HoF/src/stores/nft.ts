import { prepareWriteContract, writeContract } from "@wagmi/core";
import NFT from "../assets/NFT.json";
import { defineStore } from "pinia";

const abi = NFT.abi;
const address = NFT.address["80001"];

export const hofStore = defineStore("hof", {
  state: () => ({}),
  actions: {
    async mint() {
      const config = await prepareWriteContract({
        address: address as `0x${string}`,
        abi: abi,
        functionName: "mint",
      });
      const data = await writeContract(config);
      console.log(data);
    },
    async grantRewards(addresses: string[], ids: number[]) {
      const config = await prepareWriteContract({
        address: address as `0x${string}`,
        abi: abi,
        functionName: "mint",
        args: [addresses, ids],
      });
      const data = await writeContract(config);
      console.log(data);
    },
  },
});
