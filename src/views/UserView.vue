<template>
  <h2>User: {{ userId }}</h2>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const userId = route.params.userId;
</script>
