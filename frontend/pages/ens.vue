<template>
<div class="">
  <button @click="createSubDomain"> subdomain </button>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: 'ENS',
  computed: {
    ...mapGetters("account", ["isUserConnected"])
  },
  methods : {
    ...mapActions("ens", ["createSubDomain"]),
    ...mapActions("account", ["connectWeb3Modal"])
  }
}
</script>
