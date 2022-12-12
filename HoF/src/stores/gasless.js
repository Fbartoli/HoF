import {ethers} from "ethers";
import { RelayProvider } from "@opengsn/provider"
import Paymaster from "../assets/contracts/Paymaster.json"

let conf = {
  paymasterAddress: Paymaster.addresses[4],
  relayLookupWindowBlocks: 100000,
  pastEventsQueryMaxPageSize: 100000,
  relayRegistrationLookupBlocks: 100000
}

export const state = () => ({
  openGSNProvider: null,
  subsidy: false
});

export const getters = {
  getOpenGSNProvider(state) {
    return state.openGSNProvider
  },
  getSubsidy(state) {
    return state.subsidy
  },
};

export const actions = {
  async initOpenGsn({commit, getters, rootGetters}) {
    let w3Provider = rootGetters["account/getProvider"].provider;
    if (getters.getOpenGSNProvider || !w3Provider) return
    let gnsProvider = await RelayProvider.newProvider({
      provider: w3Provider,
      config: conf
    }).init()
    let etherSubsidisedProvider = new ethers.providers.Web3Provider(gnsProvider)
    commit("setGSNProvider", etherSubsidisedProvider);
  },
  changeSubsidy({commit}) {
    commit("setSubsidy")
  }
};

export const mutations = {
  setGSNProvider(state, provider) {
    state.openGSNProvider = provider
  },
  setSubsidy(state) {
    state.subsidy = !state.subsidy
  }
};
