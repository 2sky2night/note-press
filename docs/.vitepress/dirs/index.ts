import { JSTitle, questionTitle } from "../title";
import { getFilename, getDir, getTitle } from "../tools";
import { DefaultTheme } from "vitepress";

/**
 * 面试相关的目录
 */
export const InterviewDirectory = {
  JS() {
    return getDir("/interview/js").map((fileName) => {
      const _filename = getFilename(fileName);
      return {
        text: getTitle(_filename, JSTitle),
        link: `/interview/js/${_filename}`,
      };
    });
  },
};

/**
 * 踩过的坑的目录
 */
export const questionDirectory = () => {
  const nav: DefaultTheme.Sidebar = [];
  const dirList = getDir("/question");
  dirList.forEach((dirname) => {
    const rootLink = `/question/${dirname}`;
    const list = getDir(rootLink).map((filename) => {
      // 获取文件名
      const _filename = getFilename(filename);
      // 获取文档中文名
      const text = getTitle(`${dirname}-${_filename}`, questionTitle);
      return {
        text,
        link: `${rootLink}/${_filename}`,
      };
    });
    nav.push({
      text: dirname,
      items: list,
    });
  });
  return nav;
};
