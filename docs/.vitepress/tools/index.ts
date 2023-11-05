import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * 根据文件名称获取文档标题
 * @param fileName 文件名称
 * @param titleTable 文档标题映射表
 */
export const getTitle = (
  filename: string,
  titleTable: Record<string, string>
) => {
  const title = Reflect.get(titleTable, filename);
  if (title) {
    return title;
  } else {
    return "no title";
  }
};

/**
 * 读取src下的某个文件夹
 * @param dirPath 文件路径，以src目录开始
 * @returns
 */
export const getDir = (dirPath: string) => {
  return readdirSync(path.resolve(__dirname, "../../src", `./${dirPath}`));
};

/**
 * 获取文件的名称
 * @param filename
 * @returns
 */
export const getFilename = (filename: string) => {
  return filename.substring(0, filename.indexOf("."));
};
