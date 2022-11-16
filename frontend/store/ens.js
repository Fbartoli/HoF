import {ethers} from "ethers";
import ENS, { getEnsAddress } from '@ensdomains/ensjs'

export const state = () => ({
  ens: null
});

export const getters = {};

export const actions = {
  async createSubDomain({getters, rootGetters}) {
    const provider = rootGetters['account/getProvider'];
    const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
    console.log(await ens.name('specialistk.eth').getAddress());
    await ens.name('specialistk.eth').createSubdomain('iam');
  }
};

export const mutations = {
  setENS(state, ens) {
    state.ens = ens;
  }
};

