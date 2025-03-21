import { JSTitle, questionTitle, HTMLTitle, CSSTitle } from "../title";
import { getFilename, getDir, getTitle } from "../tools";
import { DefaultTheme } from "vitepress";

/**
 * 面试相关的目录
 */
export const InterviewDirectory = {
  /**
   * HTML面试题
   */
  HTML() {
    return getDir("/interview/html").map((filename) => {
      const _filename = getFilename(filename);
      return {
        text: getTitle(_filename, HTMLTitle),
        link: `/interview/html/${_filename}`,
      };
    });
  },
  /**
   * JS面试题
   */
  JS() {
    return getDir("/interview/js").map((fileName) => {
      const _filename = getFilename(fileName);
      return {
        text: getTitle(_filename, JSTitle),
        link: `/interview/js/${_filename}`,
      };
    });
  },
  /**
   * CSS面试题相关
   */
  CSS() {
    return getDir("/interview/css").map((filename) => {
      const _filename = getFilename(filename);
      return {
        text: getTitle(_filename, CSSTitle),
        link: `/interview/css/${_filename}`,
      };
    });
  },
};

/**
 * 踩过的坑的目录
 */
export const questionDirectory = () => {
  const nav: DefaultTheme.Sidebar = [];
  /** question文件夹中的所有文件 */
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

/**
 * 学习的技术栈的目录
 */
export const studyDirectory = () => {
  return getDir("/study").map((filename) => {
    const _filename = getFilename(filename);
    return {
      text: _filename,
      link: `/study/${_filename}`,
    };
  });
};
