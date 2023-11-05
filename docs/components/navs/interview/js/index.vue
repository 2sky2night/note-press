<template>
  <NaviItem
    v-for="item in list"
    :title="item.title"
    :link="item.link"></NaviItem>
</template>

<script setup>
import NaviItem from "../../../navigate/index.vue";
import { InterviewDirectory } from '../../../../.vitepress/tools';

const list = InterviewDirectory.JS();
</script>
