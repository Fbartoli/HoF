
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('account', ['isUserConnected', 'getActiveAccount']),
  },
  methods: {
    ...mapActions('account', ['connectWeb3Modal']),
    async sign_typed_mesage_token_ownership(contract_address, token_id, network) {
      if (!this.isUserConnected) {
        await this.connectWeb3Modal()
      }
      const data = {
        title: `Rug Order`,
        token: {
          contract_address: contract_address,
          token_id: Number(token_id),
          network: network
        },
      }
      const domain = {
        name: 'Prove Token Ownership',
        version: '1',
      }
      const types = {
        token: [
          { name: 'contract_address', type: 'string' },
          { name: 'token_id', type: 'uint256' },
          { name: 'network', type: 'string' },
        ],
        object: [
          { name: 'title', type: 'string' },
          { name: 'token', type: 'token' },
          { name: 'timestamp', type: 'uint256' },
        ],
      }
      const object = {
        title: data.title,
        token: data.token,
        timestamp: Date.now(),
      }
      try {
        const signature = await this._sign_typed_message(domain, types, object)

        // Add information needed by python web3
        types.EIP712Domain = [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
        ]
        const message = {
          domain,
          types,
          message: object,
          primaryType: 'object',
        }
        console.log('message:', message)
        console.log('signature:', signature)
        return {
          message,
          signature,
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async sign_typed_mesage_collection_request(request_information) {
      if (!this.isUserConnected) {
        await this.connectWeb3Modal()
      }
      // console.log("request_information.contract_address", request_information.contract_address)
      const data = {
        title: `Collection Request`,
        collection: {
          name: request_information.project_name,
          contract: request_information.contract_address,
          website: request_information.website,
          twitter: request_information.twitter,
          discord: request_information.discord,
          email: request_information.email,
          collection_image: request_information.collection_image,
        },
        user: {
          name: request_information.name,
          is_collection_owner: request_information.is_project_owner,
        }
      }
      const domain = {
        name: 'Collection Request',
        version: '1',
      }
      const types = {
        collection: [
          { name: 'name', type: 'string' },
          { name: 'contract', type: 'address' },
          { name: 'website', type: 'string' },
          { name: 'twitter', type: 'string' },
          { name: 'discord', type: 'string' },
          { name: 'email', type: 'string' },
          { name: 'collection_image', type: 'string' },
        ],
        user: [
          { name: 'name', type: 'string' },
          { name: 'is_collection_owner', type: 'bool' }
        ],
        object: [
          { name: 'title', type: 'string' },
          { name: 'collection', type: 'collection' },
          { name: 'user', type: 'user' },
          { name: 'timestamp', type: 'uint256' },
        ],
      }
      const object = {
        title: data.title,
        collection: data.collection,
        user: data.user,
        timestamp: Date.now(),
      }
      try {
        const signature = await this._sign_typed_message(domain, types, object)

        // Add information needed by python web3
        types.EIP712Domain = [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
        ]
        const message = {
          domain,
          types,
          message: object,
          primaryType: 'object',
        }
        console.log('message:', message)
        console.log('signature:', signature)
        return {
          message,
          signature,
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async sign_typed_mesage_upload_image(token_id) {
      if (!this.isUserConnected) {
        await this.connectWeb3Modal()
      }
      // console.log("request_information.contract_address", request_information.contract_address)
      const data = {
        title: `Upload Photo`,
        token_id: Number(token_id)
      }
      const domain = {
        name: 'Upload Image',
        version: '1',
      }
      const types = {
        object: [
          // { name: 'title', type: 'string' },
          { name: 'token_id', type: 'uint256' },
          { name: 'timestamp', type: 'uint256' },
        ],
      }
      const object = {
        title: data.title,
        token_id: data.token_id,
        timestamp: Date.now(),
      }
      try {
        const signature = await this._sign_typed_message(domain, types, object)

        // Add information needed by python web3
        types.EIP712Domain = [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
        ]
        const message = {
          domain,
          types,
          message: object,
          primaryType: 'object',
        }
        console.log('message:', message)
        console.log('signature:', signature)
        return {
          message,
          signature,
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
  }
}