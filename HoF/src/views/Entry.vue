<script setup lang="ts">
import { accountStore } from "../stores/account";
import { hofStore } from "../stores/nft";
const { connect, sign } = accountStore();
const hof = hofStore();
const { mint } = hof;
</script>

<template>
  <main>
    <button @click="connect">connect</button>
    <button @click="sign">sign</button>
    <button @click="mint">mint</button>
  </main>
</template>
