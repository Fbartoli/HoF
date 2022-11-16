import Notify from 'bnc-notify';

export default ({ app }, inject) => {
  inject('notify', Notify({
    dappId: "46e1e03e-38e6-42cb-997e-62d293496eea",       // [String] The API key created by step one above
    networkId: 4  // [Integer] The Ethereum network ID your Dapp uses.
  }));
}
