import { ethers } from "ethers"
import NFT from "../assets/contracts/NFT.json";



export const state = () => ({
  NFTAbi: null,
  NFTAddress: null,
  NFTContract: null,
  RemainingToken: 0,
});

export const getters = {
  getNFTAbi(state) {
    return state.NFTAbi;
  },
  getNFTAddress(state) {
    return state.NFTAddress;
  },
  getRemainingToken(state) {
    return state.RemainingToken;
  }
};

export const actions = {
  storeNFTContractDetails({ commit, rootState, rootGetters }) {
    const chainIdDec = parseInt(rootGetters["account/getChainId"]);
    const NFTAddress = NFT.addresses[chainIdDec];
    commit("setNFTAddress", NFTAddress);
    commit("setNFTAbi", NFT.abi);
  },
  async grantRewards({ rootGetters, getters, dispatch }, {addresses, ids}) {
    const address = getters.getNFTAddress
    const abi = getters.getNFTAbi
    const subsidy = rootGetters["gasless/getSubsidy"];
    const provider = subsidy ? rootGetters["gasless/getOpenGSNProvider"]: rootGetters["account/getProvider"]
    const contract = new ethers.Contract(address, abi, provider)
    let tx = await contract.connect(provider.getSigner()).grantRewards(addresses, ids)
    const {emitter} = this.$notify.hash(tx.hash)
    emitter.on('txSent', console.log)
    emitter.on('txPool', console.log)
    emitter.on('txConfirmed', (event) => {
      console.log(event)
      dispatch("fetchRemainingToken")
      return {
        link: `https://rinkeby.etherscan.io/tx/${event.hash}`
      }
    })
    emitter.on('txSpeedUp', console.log)
    emitter.on('txCancel', console.log)
    emitter.on('txFailed', console.log)
    emitter.on('all', console.log)
    return emitter
  },
  async mint({ rootGetters, getters, dispatch }) {
    const address = getters.getNFTAddress
    const abi = getters.getNFTAbi
    const subsidy = rootGetters["gasless/getSubsidy"];
    const provider = subsidy ? rootGetters["gasless/getOpenGSNProvider"]: rootGetters["account/getProvider"]
    const contract = new ethers.Contract(address, abi, provider)
    let tx = await contract.connect(provider.getSigner()).mint()
    const {emitter} = this.$notify.hash(tx.hash)
    emitter.on('txSent', console.log)
    emitter.on('txPool', console.log)
    emitter.on('txConfirmed', (event) => {
      console.log(event)
      dispatch("fetchRemainingToken")
      return {
        link: `https://rinkeby.etherscan.io/tx/${event.hash}`
      }
    })
    emitter.on('txSpeedUp', console.log)
    emitter.on('txCancel', console.log)
    emitter.on('txFailed', console.log)
    emitter.on('all', console.log)
    return emitter
  }
};

export const mutations = {
  setNFTAbi(state, abi) {
    state.NFTAbi = abi;
  },
  setNFTAddress(state, address) {
    state.NFTAddress = address;
  },
  setNFTContract(state, _contract) {
    state.NFTContract = _contract;
  },
  setRemainingToken(state, number) {
    state.RemainingToken = number
  }
};