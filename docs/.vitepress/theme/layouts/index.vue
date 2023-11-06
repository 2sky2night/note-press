<template>
  <Layout>
    <template #doc-footer-before><Comment /> </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import Comment from "../../../components/giscus/index.vue";
const { Layout } = DefaultTheme;
defineOptions({ name: "Layouts" });
</script>
