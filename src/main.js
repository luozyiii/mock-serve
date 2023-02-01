const Koa = require('koa');
const util = require('./util');
const pkgName = require('../package.json').name;
const app = new Koa();

// 端口
const port = 3000;

app.use(async (ctx) => {
  ctx.body = await util.getJson(ctx.url);
});

app.listen(port, () => {
  console.log(`${pkgName} 服务已启动！！！`);
  console.log(`http://127.0.0.1:${port}`);
  console.log(`http://${util.getIpv4()}:${port}`);
});
