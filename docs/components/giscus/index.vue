<template>
  <Giscus
    repo="2sky2night/note-press"
    repo-id="R_kgDOKpx2iw"
    category="Show and tell"
    category-id="DIC_kwDOKpx2i84Catgi"
    mapping="pathname"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="bottom"
    lang="zh-CN"
    crossorigin="anonymous"
    async
    :key="route.path"
    :theme="isDark"
  />
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from "@giscus/vue";

const pageData = useData();
const route = useRoute();

const isDark = computed(() => {
  return pageData.isDark.value ? "dark" : "light";
});

defineOptions({ name: "Comment" });
</script>
