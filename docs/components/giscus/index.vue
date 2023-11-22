<template>
  <!--正常配置-->
  <!-- <Giscus
    :key="route.path"
    repo="2sky2night/note-press"
    repo-id="R_kgDOKpx2iw"
    category="Announcements"
    category-id="DIC_kwDOKpx2i84Catge"
    mapping="pathname"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="bottom"
    :theme="isDark"
    lang="zh-CN"
    crossorigin="anonymous"
    async /> -->

  <!--若此仓库需要迁移到其他仓库中去，需要修改repo以及id-->
  <Giscus
    repo="2sky2night/note-blog"
    repo-id="R_kgDOKqOR9g"
    category="Announcements"
    category-id="DIC_kwDOKqOR9s4CavqB"
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
