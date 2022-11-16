<template>
  <div class="shipping-info-container">
    <div class="head-container">
      <h4 class="">SHIP TO</h4>
      <button @click="back_to_address" class="">EDIT</button>
    </div>
    <div class="shipping-info" v-for="(order, line_index) in shipping_display_order" :key="`address-line-${line_index}`">
      <div v-for="(key, index) in order" :key="key" class="">
        {{get_shipping_field(key)}}<span v-if="order.length > index + 1 && get_shipping_field(order[index + 1]) && show_comma" class="">, </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingDetail',
  props: {
    shipping_field_data: Array,
    shipping_information: Object,
  },
  data() {
    return {
      show_comma: false,
      shipping_display_order: [['name'],['apartment_number'], ['address'], ['city', 'state', 'postal_code'], ['country'], ['phone_dial_code', 'phone'],['email']]
    }
  },
  computed: {
    
  },
  methods: {
    get_shipping_field(key) {
      if (this.shipping_information && key in this.request_information) {
        return this.shipping_information[key]
      }
      return null
    },
    back_to_address() {
      this.$emit('back_to_address')
    }
  },
};
</script>

<style lang="postcss" scoped>
.shipping-info-container {
  @apply w-full flex flex-col items-start justify-start gap-2;
.head-container {
  @apply w-full flex flex-row items-center justify-between uppercase;
  button {
    @apply text-xs underline;
  }
}
.shipping-info {
  @apply w-full inline-flex items-center gap-x-1;
}
}
</style>
