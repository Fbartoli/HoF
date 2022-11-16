import moment from 'moment'
export default {
  methods: {
    _plural_s(number) {
      return parseInt(number) == 0 ? 's' : (parseFloat(number) > 1 ? 's' : '')
    },
    get_asset_image(image) {
      return require(`@/assets/images/${image}`)
    },
    get_asset_icon(icon) {
      return require(`@/assets/icons/${icon}`)
    },
    toggle_page_scroll(toggle) {
      if (toggle) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
    set_error_message(data, error) {
      setTimeout(() => {
        data.error_message = null
      }, 5000)
      data.error_message =  error?.error?.message || error?.message || error
    },
    _validate_email(email) {
      console.log("email", email)
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return (true)
      }
      return (false)
    },
    _opensea_assets_url(contract_address, token_id) {
      return `https://opensea.io/assets/${contract_address}/${token_id}`
    },
    _looksrare_assets_url(contract_address, token_id) {
      return `https://looksrare.org/collections/${contract_address}/${token_id}`
    },
    _rarible_assets_url(contract_address, token_id) {
      return `https://rarible.com/token/${contract_address}:${token_id}`
    },
    _x2y2_collection_url(contract_address) {
      return `https://x2y2.io/collection/${contract_address}`
    },
    _x2y2_assets_url(contract_address, token_id) {
      return `https://x2y2.io/eth/${contract_address}/${token_id}`
    },
    async _resolve_address(input) {
      const endpoint_url = `https://ens.quantum.tech/${input}`
      return await this.$axios.get(endpoint_url).then((response) => response.data)
    },
  },
  computed: {
    is_production() {
      return process.env.NODE_ENV === 'production'
    },
    is_development() {
      return process.env.NODE_ENV === 'development'
    },
    cache_timestamp() {
      return Number(Date.now() / 100000000).toFixed(0)
    },
  },
  filters: {
    _digits(number) {
      return number != null ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : number
    },
    _rounded_digits(number) {
      return number
        .toFixed()
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    _shortenAddress(base) {
      if (base == null) {
        return "null address";
      }
      base = base.toString();
      if (base.startsWith("0x") && base.length == 42) {
        let prefix = base.slice(0, 6);
        let suffix = base.slice(38, 42);
        return prefix + "..." + suffix;
      }
      return base.slice(0, 22);
    },
    _shortenAddress_doji_custom(base) {
      if (base == null) {
        return "FM9X";
      }
      base = base.toString();
      if (base.startsWith("0x") && base.length == 42) {
        let prefix = base.slice(0, 6);
        let suffix = base.slice(38, 42);
        return prefix + "..." + suffix;
      }
      return base.slice(0, 15);
    },
    _format_timestamp(timestamp) {
      const date = new Date(parseInt(parseInt(timestamp) * 1000))
      return moment(date).format('MM/DD/YYYY')
    },
    _format_ending_duration(end_timestamp_sec) {
      const end_timestamp = moment(new Date(parseInt(parseInt(end_timestamp_sec) * 1000)))
      const current_timestamp = moment(Date.now())
      const time_diff = end_timestamp.diff(current_timestamp)
      const duration = moment.duration(time_diff)
      const days = duration.days()
      const hours = duration.hours()
      const seconds = duration.seconds()
      if (days >= 1.0) {
        return `${days} day${parseInt(days) == 0 ? 's' : (parseFloat(days) > 1 ? 's' : '')}`
      } else if (hours >= 1.0) {
        return `${hours} hour${parseInt(hours) == 0 ? 's' : (parseFloat(hours) > 1 ? 's' : '')}`
      } else if (seconds >= 1.0) {
        return `${seconds} hour${parseInt(seconds) == 0 ? 's' : (parseFloat(seconds) > 1 ? 's' : '')}`
      } else {
        return ``
      }
    },
    _polygon_tx_url(hash) {
      return `https://polygonscan.com/tx/${hash}`
    },
    _opensea_account_url(address) {
      return `https://opensea.io/${address}`
    },
  }
}