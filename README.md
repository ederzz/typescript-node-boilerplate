
# typescript-node-boilerplate
a koa back-end application in Typescript.

#### 项目命令说明
> 详细命令可查看`package.json`内的`scripts`字段

 - `npm start`：编译`ts`文件并运行
 - `npm run build`： 编译`ts`文件
 - `npm run ts_node`：通过`ts node`运行项目，`--files`选项是为了启动时加载`tsconfig.json`里添加的文件，默认是不加载的，这意味着你在`tsconfig.json`中配置的一些`.d.ts`声明文件会失效，编译时会报`can't find module xxx`等错误
 - `npm run dev`： 通过`nodemon`监听`ts`文件改变，并重新编译运行

#### `nodemon.json`配置文件说明
```Typescript
{
    "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"], // 忽略监听文件
    "watch": ["."], // 监听目录
    "exec": "npm start", // 监听变化后执行npm start命令
    "ext": "ts" // 监听ts文件
}
```

#### 目录结构
```
├── dist                    ts打包输出目录
├── config
│   ├── default.json        默认项目配置
│   └── production.json     生产环境项目配置
├── controller              路由处理逻辑
├── log                     日志目录
│   ├── app.log             
│   └── error.log
├── models                  数据库模型
│   ├── db.ts               链接数据库
│   └── index.ts
├── router                  app路由
├── static                  静态资源
├── views                   html模板
├── index.ts                启动文件
├── utils.ts                工具函数
├── constants.ts            常量
├── externals.d.ts
├── nodemon.json            nodemon配置文件
├── package-lock.json
├── package.json
├── Dockerfile
├── README.md
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```