# 仓库迁移
若仓库需要迁移，注意改动成本：

`docs/.vitepress/config.ts`：
1. 修改`base`配置项为对应部署的资源路径位置

`docs/components/giscus/index.vue`: 
1. 修改giscus的配置。
2. 注意，迁移后之前的评论都会丢失掉
3. 配置链接：https://giscus.app/zh-CN
