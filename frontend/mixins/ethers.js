import { ethers, providers, utils, BigNumber } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"

const network = 'mainnet'
const projectId = process.env.NUXT_ENV_PROJECT_ID
const mainnet_provider = new ethers.providers.InfuraProvider(network, projectId)
const rinkeby_provider = new ethers.providers.InfuraProvider("rinkeby", projectId)
const matic_provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/rIkIy41E_1-EpsMA9jNxjvce0f7YGTsg")
const marketplace_provider = matic_provider
// const matic_provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/")
// let user_provider

// matic: 137, mainnet: 1, rinkeby: 4

export default {
  data() {
    return {
    }
  },
  computed: {
  },
  async mounted() {
  },
  methods: {
    // ens codes
    _get_checksum_address(address) {
      return utils.getAddress(address)
    },
    async _get_ens_name(address) {
      const lookup_address = utils.getAddress(address)
      const name = await mainnet_provider.lookupAddress(lookup_address);
      return name
    },
    async _resolve_ens_name(name) {
      const address = await mainnet_provider.resolveName(name);
      return address
    },
    _is_eth_address(address) {
      return ethers.utils.isAddress(address)
    },
    async _resolve_address_search(input) {
      const is_ens_name = input.includes('.')
      const is_address = this._is_eth_address(input)

      const result = {
        address: null,
        ens_name: null
      }

      if (is_address) {
        console.log("detected address")
        const checksum_address = ethers.utils.getAddress(input)
        result.address = checksum_address
        result.ens_name = await this._get_ens_name(checksum_address)
        return result
      } else {
        console.log("detected ens name")
        const possible_ens_name = input.includes('.') ? input : input + '.eth'
        const address = await this._resolve_ens_name(possible_ens_name)
        if (address) {
          result.address = address
          result.ens_name = possible_ens_name
          console.log("search result:", result)
          return result
        } else {
          return null
        }
      }
    },
    async _get_ens_avatar(ens_name, network = "mainnet") {
      const endpoint_url = `https://metadata.ens.domains/${network}/avatar/${ens_name}/meta`
      try {
        return await this.$axios.get(endpoint_url).then((response) => {
          const data = response.data
          if (data.image) {
            const image_url_unsafe = data.image
            const image_url = image_url_unsafe.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
            return image_url
          } else {
            return null
          }
        })
      } catch (error) {
        console.log(error)
        return null
      }
    },
    // sig
    async _sign_message(message) {
      const signer = this.$store.getters['account/getProvider'].getSigner()
      const signed_message = await signer.signMessage(message)
      console.log("signed_message:", signed_message)
      return signed_message
    },
    async _sign_typed_message(domain, types, value) {
      const signer = this.$store.getters['account/getProvider'].getSigner()
      const signature = await signer._signTypedData(domain, types, value)
      return signature
    },
  }
}