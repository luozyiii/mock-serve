const Koa = require('koa');
const util = require('./util');
const pkgName = require('../package.json').name;
const app = new Koa();

// 端口配置，支持环境变量
const port = process.env.PORT || 3000;

// 简单跨域处理
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 200;
    return;
  }

  await next();
});

// Mock 数据处理
app.use(async (ctx) => {
  ctx.body = await util.getJson(ctx.url);
});

app.listen(port, () => {
  console.log(`${pkgName} 服务已启动！！！`);
  console.log(`http://127.0.0.1:${port}`);
  console.log(`http://${util.getIpv4()}:${port}`);
});
