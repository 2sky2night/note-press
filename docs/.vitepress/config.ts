import { defineConfig } from "vitepress";
import { InterviewDirectory, questionDirectory } from "./dirs";

// js相关的面试题的侧边栏导航
const InterviewJS = InterviewDirectory.JS();
// 问题的侧边导航栏
const question = questionDirectory();

const config = defineConfig({
  title: "Kinght的小屋",
  outDir: "../dist",
  srcDir: "./src",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/icon/vite.svg",
      },
    ],
  ],
  themeConfig: {
    search: {
      provider: "local",
    },
    lastUpdatedText: "最近更新时间",
    docFooter: { prev: "上一篇", next: "下一篇" },
    outline: "deep",
    nav: [
      { text: "开始", link: "/guide" },
      { text: "学习", link: "/study" },
      {
        text: "八股",
        items: [
          { text: "HTML", link: "/interview/html" },
          { text: "CSS", link: "/interview/css" },
          { text: "JS", link: "/interview/js" },
          { text: "TS", link: "/interview/ts" },
          { text: "其他", link: "/interview/other" },
        ],
      },
      { text: "踩过的坑", link: "/question" },
    ],
    sidebar: {
      "/interview/js": InterviewJS,
      "/question": question,
    },
  },
});

export default config;
