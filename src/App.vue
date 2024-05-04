<template>
  <h1>Log out Idle Users</h1>
  <router-view />
</template>

<style scoped></style>

<script>
import { useLogoutIdle } from "../composables/useLogoutIdle.js";
useLogoutIdle();
</script>
