<script setup lang="ts">
import { ref, toRaw } from "vue";
import { accountStore } from "./stores/account";
import { hofStore } from "./stores/nft";
const account = accountStore();
const hof = hofStore();
let address = ref("");
let id = ref<number>(1);
let addressArray = ref<string[]>([]);
let ids = ref<number[]>([]);
const { connect } = account;
const { mint, grantRewards } = hof;
const add = () => {
  console.log(addressArray, address);
  addressArray.value.push(address.value);
  ids.value.push(id.value);
};
</script>

<template>
  <button @click="connect">connect</button>
  <button @click="mint">mint</button>
  <input type="text" v-model="address" />
  <input type="number" min="1" v-model="id" />
  <ul v-for="(data, i) in addressArray" :key="i">
    {{
      data
    }}
    |
    {{
      ids[i]
    }}
  </ul>
  <button @click="add">add</button>
  <button @click="grantRewards(toRaw(addressArray), toRaw(ids))">
    grantRewards
  </button>
</template>

<style scoped></style>
