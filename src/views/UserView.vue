<template>
  <h2>User: {{ userId }}</h2>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLogoutIdle } from "../composables/logoutIdle.js";
const route = useRoute();
const userId = route.params.userId;
useLogoutIdle();
</script>
