# 基于模块联邦实现微前端
状态更新
路由切换
父子应用通信
应用嵌套多层
生命周期管理
cookie

微前端概念：
- 摒弃大型单体方式，将前端整体分解为小而简单的块，这些块可以独立开发、测试和部署，同时仍然聚合为一个产品出现在客户面前。
- 微前端不是一门具体的技术，而是整合了技术、策略和方法，是一种整体上的架构。

微前端设计方案：
- iframe嵌入
- single-spa、qiankun
- emp

module federation：
- 多个独立的构建可以组成一个应用程序，允许运行时从另一个JavaScript构建中动态地加载代码，同时共享依赖。
- 区分本地模块和远程模块。本地模块即为普通模块，是当前构建的一部分。远程模块不属于当前构建，并在运行时从所谓的容器加载。

微模块
微应用

场景：
- 分布式防火墙
- 微前端

字段名	类型	含义
name	string	必传值，即输出的模块名，被远程引用时路径为${name}/${expose}
library	object	声明全局变量的方式，name为umd的name
filename	string	构建输出的文件名
remotes	object	远程引用的应用名及其别名的映射，使用时以key值作为name
exposes	object	被远程引用时可暴露的资源路径及其别名
shared	object	与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同一份依赖

参考链接：
- https://webpack.docschina.org/concepts/module-federation/
- https://github.com/efoxTeam/emp/wiki/%E3%80%8A%E4%BB%80%E4%B9%88%E6%98%AF%E5%BE%AE%E5%89%8D%E7%AB%AF%E3%80%8B