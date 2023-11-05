<template>
  <a :href="link">{{ title }}</a>
</template>

<script setup>
defineProps({
  title: String,
  link: String,
});
</script>

<style scoped>

</style>
