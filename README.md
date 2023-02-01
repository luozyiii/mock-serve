# 搭建一个 Mock Serve 服务

在真实的工作场景中，前后端的工作基本都是并行开发的，一般都是相互约定好接口 API 后，分别进入开发。所以，根据接口 API mock 数据，方便我们开发

## Mock 数据的常见方案

#### 一、项目直接写死数据，使用 settimeout 模拟接口延时

#### 二、本地起一个 node 服务，配合 mock.js 生成接口假数据，自己实现接口 API

#### 三、使用已经搭建好的在线 Mock 服务，如：Postman、EasyMock

#### 四、代理 Whistle

## 需求

1、根据提供的 json 结构，随机生成返回数据
2、按目录结构存放 json，src/mock/a-project/login/index.json
3、根据目录决定接口请求路径

## koa + mockjs 实现（方案二）

采用方案二实现，需要学习 mockjs 规则

### 目录结构

```bash
├── .vscode                     # 该项目 vscode 配置
├── src                         # 源码目录
│   ├── mock                    # mock json 文件, 子目录按项目分类
│   │   ├── demo项目
│   │   ├── a项目
│   │   ├── b项目
│   │   └── 零散json
│   └── main.js                 # 主入口
├── .commitlintrc.js            # git commit 规范配置
├── .eslintrc.js                # eslint 配置
├── .gitignore                  # git忽略文件
├── .prettierrc.js              # prettier 配置
├── package.json
└── README.md                   # 文档说明
```

### 使用

```bash
# 参考src/demo
# 新建 test.json
{
  "data|1-3": [
    {
      "id|+1": 1
    }
  ]
}

# 启动项目
npm run start

# 访问接口
http://127.0.0.1:3000/mock/demo/test

# 响应
{
    "code": 200,
    "msg": "请求成功",
    "data": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```
