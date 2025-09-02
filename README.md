# Mock Serve 服务

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Koa](https://img.shields.io/badge/Koa-v2.14+-blue.svg)](https://koajs.com/)
[![MockJS](https://img.shields.io/badge/MockJS-v1.1+-orange.svg)](http://mockjs.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

一个基于 Koa + MockJS 的轻量级 Mock 服务器，用于前后端分离开发中的接口数据模拟。

## ✨ 特性

- 🚀 **轻量快速** - 基于 Koa 框架，启动迅速
- 📁 **目录映射** - 根据文件目录结构自动生成接口路径
- 🎲 **随机数据** - 使用 MockJS 生成丰富的随机数据
- 🔧 **简单配置** - JSON 配置即可定义接口数据结构
- 🌐 **跨域支持** - 内置跨域处理，方便前端调用

## 📋 背景

在前后端分离的开发模式中，前后端通常并行开发。通过约定好接口 API 后，前端需要 Mock 数据来进行开发和测试。

### 常见的 Mock 方案对比

| 方案 | 描述 | 优点 | 缺点 |
|------|------|------|------|
| **硬编码数据** | 项目中直接写死数据，使用 setTimeout 模拟延时 | 简单直接 | 数据固定，不够真实 |
| **本地 Mock 服务** | 本地起 Node 服务，配合 MockJS 生成数据 | 数据丰富，可控性强 | 需要额外维护 |
| **在线 Mock 服务** | 使用 Postman、EasyMock 等在线服务 | 无需本地搭建 | 依赖网络，定制性差 |
| **代理工具** | 使用 Whistle 等代理工具 | 功能强大 | 配置复杂 |

本项目采用 **本地 Mock 服务** 方案，提供最佳的开发体验。

## 🎯 核心功能

- ✅ 根据 JSON 模板随机生成返回数据
- ✅ 按目录结构组织 Mock 文件（如：`src/mock/project-a/login/index.json`）
- ✅ 目录路径自动映射为接口路径
- ✅ 支持 MockJS 全部语法规则

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/luozyiii/mock-serve.git
cd mock-serve

# 安装依赖
npm install
```

### 启动服务

```bash
# 开发模式 (文件变化自动重启)
npm run dev

# 生产模式
npm start

# 自定义端口
PORT=8080 npm start
```

服务启动后，你会看到：
```
mock-serve 服务已启动！！！
http://127.0.0.1:3000
http://192.168.x.x:3000
```

## 📁 项目结构

```bash
mock-serve/
├── src/                        # 源码目录
│   ├── mock/                   # Mock 数据文件目录
│   │   ├── demo/               # 示例项目
│   │   │   └── test.json       # 测试接口数据
│   │   ├── project-a/          # A项目 Mock 数据
│   │   ├── project-b/          # B项目 Mock 数据
│   │   └── common/             # 公共 Mock 数据
│   ├── util/                   # 工具函数
│   └── main.js                 # 服务入口文件
├── package.json                # 项目配置
└── README.md                   # 项目文档
```

## 📖 使用指南

### 基本用法

1. **创建 Mock 文件**

在 `src/mock/` 目录下创建 JSON 文件，例如 `src/mock/demo/test.json`：

```json
{
  "data|1-3": [
    {
      "id|+1": 1,
      "name": "@cname",
      "email": "@email"
    }
  ]
}
```

2. **访问接口**

启动服务后，访问对应的接口：
```
GET http://127.0.0.1:3000/mock/demo/test
```

3. **获得响应**

```json
{
  "code": 200,
  "msg": "请求成功",
  "data": [
    {
      "id": 1,
      "name": "王秀英",
      "email": "c.anderson@miller.gov"
    },
    {
      "id": 2,
      "name": "李娜",
      "email": "susan.wilson@jackson.net"
    }
  ]
}
```

### 路径映射规则

文件路径会自动映射为接口路径：

| 文件路径 | 接口路径 |
|----------|----------|
| `src/mock/demo/test.json` | `/mock/demo/test` |
| `src/mock/user/login.json` | `/mock/user/login` |
| `src/mock/project-a/api/list.json` | `/mock/project-a/api/list` |

## 🎲 MockJS 语法指南

MockJS 提供了丰富的数据生成规则，以下是常用语法：

### 数据类型

#### 1. 数组和数量控制

```json
{
  "list|1-10": [
    {
      "id|+1": 1,
      "name": "@cname"
    }
  ]
}
```
- `|1-10`：随机生成 1-10 个元素
- `|+1`：自增，从 1 开始

#### 2. 字符串

```json
{
  "name": "@cname",              // 中文姓名
  "title": "@ctitle(5,10)",      // 中文标题，5-10个字
  "sentence": "@csentence(3,5)", // 中文句子，3-5个词
  "paragraph": "@cparagraph(1,3)" // 中文段落，1-3句话
}
```

#### 3. 数字

```json
{
  "integer": "@integer(60, 100)", // 60-100的整数
  "float": "@float(60, 100, 3, 5)", // 60-100的浮点数，3-5位小数
  "natural": "@natural(1, 100)"   // 1-100的自然数
}
```

#### 4. 布尔值

```json
{
  "boolean": "@boolean",           // 随机布尔值
  "boolean2": "@boolean(1, 9, true)" // true的概率是1/(1+9)
}
```

#### 5. 日期时间

```json
{
  "date": "@date('yyyy-MM-dd')",   // 日期
  "time": "@time('HH:mm:ss')",     // 时间
  "datetime": "@datetime",         // 日期时间
  "now": "@now"                    // 当前时间
}
```

#### 6. 图片和颜色

```json
{
  "avatar": "@image('200x200', '#50B347', '#FFF', 'avatar')",
  "color": "@color",               // 随机颜色
  "hex": "@hex"                    // 十六进制颜色
}
```

#### 7. 网络相关

```json
{
  "url": "@url",                   // 随机URL
  "domain": "@domain",             // 随机域名
  "email": "@email",               // 随机邮箱
  "ip": "@ip"                      // 随机IP地址
}
```

#### 8. 地址信息

```json
{
  "region": "@region",             // 地区
  "province": "@province",         // 省份
  "city": "@city",                 // 城市
  "county": "@county(true)",       // 县，true表示包含省市
  "zip": "@zip"                    // 邮政编码
}
```

### 完整示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list|5-10": [
      {
        "id|+1": 1,
        "name": "@cname",
        "age|18-65": 1,
        "gender|1": ["男", "女"],
        "email": "@email",
        "phone": /^1[3-9]\d{9}$/,
        "address": "@county(true)",
        "avatar": "@image('100x100')",
        "createTime": "@datetime",
        "isActive": "@boolean"
      }
    ],
    "total|50-200": 1,
    "pageSize": 10,
    "currentPage|1-10": 1
  }
}
```

> 📚 更多语法规则请参考 [MockJS 官方文档](http://mockjs.com/examples.html)

## 🛠️ 高级配置

### 自定义端口

修改 `src/main.js` 中的端口配置：

```javascript
// 端口
const port = 3000; // 修改为你想要的端口
```

### 自定义响应格式

默认响应格式为：
```json
{
  "code": 200,
  "msg": "请求成功",
  "data": "你的mock数据"
}
```

如需自定义，可修改 `src/util/index.js` 中的响应处理逻辑。

### 跨域配置

服务已内置跨域支持，如需自定义跨域规则，可在 `src/main.js` 中添加中间件。

## 📝 最佳实践

### 1. 目录组织建议

```bash
src/mock/
├── common/              # 公共接口
│   ├── user.json       # 用户相关
│   └── config.json     # 配置相关
├── project-a/          # A项目
│   ├── auth/
│   │   ├── login.json
│   │   └── logout.json
│   └── api/
│       ├── list.json
│       └── detail.json
└── project-b/          # B项目
    └── ...
```

### 2. 命名规范

- 文件名使用小写字母和连字符：`user-list.json`
- 目录名使用小写字母和连字符：`project-name`
- 接口路径语义化：`/mock/user/profile` 而不是 `/mock/user/1`

### 3. 数据设计原则

- **真实性**：模拟真实的业务数据结构
- **多样性**：使用 MockJS 生成多样化的测试数据
- **完整性**：包含各种边界情况的数据

## 🔧 开发工具

### VSCode 插件推荐

- **REST Client** - 直接在 VSCode 中测试接口
- **JSON Tools** - JSON 格式化和验证
- **MockJS Snippets** - MockJS 语法提示

### 接口测试

创建 `test.http` 文件进行接口测试：

```http
### 测试用户列表接口
GET http://127.0.0.1:3000/mock/demo/test

### 测试登录接口
POST http://127.0.0.1:3000/mock/user/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

## 🐛 故障排除

### 常见问题

**Q: 服务启动失败？**
A: 检查端口是否被占用，或者 Node.js 版本是否符合要求。

**Q: 接口返回 404？**
A: 检查文件路径是否正确，确保 JSON 文件存在于 `src/mock/` 目录下。

**Q: JSON 语法错误？**
A: 使用 JSON 验证工具检查文件格式，确保符合 JSON 规范。

**Q: MockJS 语法不生效？**
A: 检查语法是否正确，参考官方文档确认用法。

### 调试技巧

1. 查看控制台输出的服务地址
2. 使用浏览器开发者工具检查网络请求
3. 检查 JSON 文件的语法正确性
4. 确认文件路径与接口路径的映射关系

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范

项目使用 ESLint + Prettier 进行代码格式化，提交前会自动格式化代码。

## 📄 许可证

本项目基于 [ISC](LICENSE) 许可证开源。

## 🔗 相关链接

- [Koa.js 官网](https://koajs.com/)
- [MockJS 官网](http://mockjs.com/)
- [MockJS GitHub](https://github.com/nuysoft/Mock)
- [项目仓库](https://github.com/luozyiii/mock-serve)

---

如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！
