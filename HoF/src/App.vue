<script setup lang="ts">
import { accountStore } from "./stores/account";
const account = accountStore();
const { watchAccount } = account;
watchAccount();
</script>
<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
