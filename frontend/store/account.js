import Web3Modal from "web3modal";
import {ethers} from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from '@coinbase/wallet-sdk'

const PROJECT_ID = process.env.NUXT_ENV_PROJECT_ID
const ALCHEMY = process.env.NUXT_ENV_ALCHEMY
const CHAIN_ID = Number(process.env.NUXT_ENV_CHAIN_ID) || 1

export const state = () => ({
  activeAccount: null,
  ensName: "",
  ensAvatar: "",
  activeBalance: 0,
  subsidy: false,
  chainId: CHAIN_ID,
  chainName: null,
  isConnected: false,
  w3Provider: null, // this is "provider" from Web3Modal
  openGSNProvider: null,
  etherProvider: null,
  readOnlyProvider: null,
  instance: null,
  web3Modal: null
});

export const getters = {
  getActiveAccount(state) {
    if (!state.activeAccount) {
      return null
    }
    return state.activeAccount;
  },
  getActiveBalanceWei(state) {
    return state.activeBalance;
  },
  getActiveBalanceEth(state) {
    return ethers.utils.formatEther(state.activeBalance);
  },
  getChainId(state) {
    return state.chainId;
  },
  getChainName(state) {
    return state.chainName;
  },
  getProvider(state) {
    if (state.etherProvider) {
      return state.etherProvider;
    } else {
      return ethers.providers.getDefaultProvider(CHAIN_ID, {
        infura: PROJECT_ID,
        alchemy: ALCHEMY,
        etherscan:"-",
        pocket:"-",
        ankr:"-"
      })
    }
  },
  getOpenGSNProvider(state) {
    return state.openGSNProvider
  },
  getSubsidy(state) {
    return state.subsidy
  },
  getReadOnlyProvider(state) {
    return state.readOnlyProvider;
  },
  getInstance(state) {
    return state.instance;
  },
  getWeb3Modal(state) {
    return state.web3Modal;
  },
  isUserConnected(state) {
    return state.isConnected;
  },
  getEnsName(state) {
    return state.ensName
  },
  getEnsAvatar(state) {
    return state.ensAvatar
  }
};

export const actions = {
  async initWeb3Modal({ commit, dispatch }) {
    const providerOptions = {
      // MetaMask is enabled by default
      // Find other providers here: https://github.com/Web3Modal/web3modal/tree/master/docs/providers
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: PROJECT_ID, // required
          rpc: {
            137: "https://polygon-mainnet.g.alchemy.com/v2/aOec-IwCGq5jQMG2Ettq5YatFEcXtst0"
          }
        }
      },
      'custom-coinbase': {
        display: {
          logo: '/icon/coinbase.png', 
          name: 'Coinbase',
          description: 'Scan with WalletLink to connect',
        },
        options: {
          networkUrl: `https://mainnet.infura.io/v3/${PROJECT_ID}`,
        },
        package: WalletLink,
        connector: async (_, options) => {
          const { appName, networkUrl } = options
          const walletLink = new WalletLink({
            appName
          });
          const provider = walletLink.makeWeb3Provider(networkUrl, CHAIN_ID);
          await provider.enable();
          return provider;
        },
      }
    };
    const w3mObject = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      theme: "dark", //theme
    });

    // This will get deprecated soon. Setting it to false removes a warning from the console.
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    // if the user is flagged as already connected, automatically connect back to Web3Modal
    const mainnetProvider = ethers.providers.getDefaultProvider(1, {
      infura: PROJECT_ID,
      alchemy: ALCHEMY,
      etherscan:"-",
      pocket:"-",
      ankr:"-"
    })
    const network = await mainnetProvider.getNetwork()
    commit("setReadOnlyProvider", mainnetProvider)
    commit("setChainData", network.chainId);
    commit("setWeb3ModalInstance", w3mObject)
  },

  async connectWeb3Modal({ commit, getters, dispatch }) {
    if (!getters.isUserConnected){
      const instance = getters.getWeb3Modal
      const w3Provider = await instance.connect();
      await dispatch("disconnectWeb3Modal");
      const etherProvider = new ethers.providers.Web3Provider(w3Provider, "any")
      if (!etherProvider.provider.isTrust) {
        await etherProvider.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(CHAIN_ID)}],
        });
      }
      const address = await etherProvider.getSigner().getAddress()
      commit("setIsConnected", true);
      commit("setActiveAccount", address);
      await dispatch("fetchActiveBalance");
      commit("setChainData", CHAIN_ID);
      commit("setWeb3Provider", { w3Provider, etherProvider});
      dispatch('ethereumListener')
    }
  },

  async loadEnsData({commit, getters}) {
    const readOnlyProvider = getters.getReadOnlyProvider
    const ensName = await readOnlyProvider.lookupAddress(getters.getActiveAccount)
    commit("setEnsName", ensName)
  },

  async disconnectWeb3Modal({ commit }) {
    await commit("setIsConnected", false);
    await commit("disconnectWallet");
  },

  ethereumListener({ commit, getters, dispatch }) {
    if (!window.ethereum) {
      return
    }
    window.ethereum.on('accountsChanged', async (accounts) => {
      if(accounts.length == 0) {
        await dispatch("disconnectWeb3Modal");
        return 
      }
      const readOnlyProvider = getters.getReadOnlyProvider
      const ensName = await readOnlyProvider.lookupAddress(ethers.utils.getAddress(accounts[0]))
      commit("setEnsName", ensName)
      commit("setActiveAccount", accounts[0]);
      dispatch("fetchActiveBalance");
    });
    window.ethereum.on('chainChanged', (chainId) => {
      commit("setChainData", parseInt(chainId));
      dispatch("fetchActiveBalance");
    });
  },
  async fetchActiveBalance({ commit, getters}) {
    const address = getters.getActiveAccount
    const balance = await getters.getProvider.getBalance(address);
    commit("setActiveBalance", balance);
  },
  changeSubsidy({commit}) {
    commit("setSubsidy")
  },
  async requireChainId({ commit, getters, dispatch }, chain_id){
    const etherProvider = getters.getProvider
    try {
      await etherProvider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexValue(chain_id)}],
      });
      commit("setChainData", parseInt(chain_id));
    } catch {
      throw new Error(`Please change network to ID: ${chain_id}`)
    }

  }
};

export const mutations = {
  async disconnectWallet(state) {
    // state.activeAccount = null;
    // state.activeBalance = 0;
    await state.web3Modal.clearCachedProvider();
    if (state.w3Provider?.disconnect && state.w3Provider !== null) {
      await state.w3Provider.disconnect();
    }
    // state.w3Provider = null
    // state.etherProvider = null
  },
  setActiveAccount(state, selectedAddress) {
    state.activeAccount = selectedAddress;
  },
  setEnsName(state, ensName) {
    state.ensName = ensName;
  },
  setAvatar(state, Avatar) {
    state.Avatar = Avatar;
  },
  setActiveBalance(state, balance) {
    state.activeBalance = balance;
  },
  setChainData(state, chainId) {
    state.chainId = Number(chainId);

    switch(state.chainId) {
      case 1:
        state.chainName = "Mainnet";
        break;
      case 2:
        state.chainName = "Kovan";
        break;
      case 3:
        state.chainName = "Ropsten";
        break;
      case 4:
        state.chainName = "Rinkeby";
        break;
      case 5:
        state.chainName = "Goerli";
        break;
      case "0x539": // 1337 (often used on localhost)
      case "0x1691": // 5777 (default in Ganache)
      case 137:
        state.chainName = "Polygon";
        break;
      case 80001:
        state.chainName = "Mumbaï";
        break;
      default:
        state.chainName = "Localhost";
        break;
    }
  },
  setWeb3Provider(state, { w3Provider, etherProvider }) {
    state.w3Provider = w3Provider
    state.etherProvider = etherProvider
  },
  setIsConnected(state, isConnected) {
    state.isConnected = isConnected;
  },
  setWeb3ModalInstance(state, w3mObject) {
    state.web3Modal = w3mObject;
  },
  setReadOnlyProvider(state, provider) {
    state.readOnlyProvider = provider;
  },
  setGSNProvider(state, provider) {
    state.openGSNProvider = provider
  },
  setSubsidy(state) {
    state.subsidy = !state.subsidy
  }
};
