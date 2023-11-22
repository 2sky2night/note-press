import { defineConfig } from "vitepress";
import { InterviewDirectory, questionDirectory, studyDirectory } from "./dirs";

// js相关面试题的侧边栏导航
const InterviewJS = InterviewDirectory.JS();
// html相关面试题的侧边栏
const InterviewHTML = InterviewDirectory.HTML();
// CSS相关面试题的侧边栏
const InterviewCSS = InterviewDirectory.CSS();
// 问题的侧边导航栏
const Question = questionDirectory();
// 学习的技术栈
const Study = studyDirectory();

const config = defineConfig({
  base: "/note-blog/", // 此配置会响应打包时文件的请求根路径，启动项目时会在这个路径下启动
  title: "Kinght的小屋",
  outDir: "../dist",
  srcDir: "./src",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/icon/vite.svg",
      },
    ],
  ],
  themeConfig: {
    lastUpdated: {},
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
      "/study": Study,
      "/interview/js": InterviewJS,
      "/interview/html": InterviewHTML,
      "/interview/css": InterviewCSS,
      "/question": Question,
    },
  },
});

export default config;
