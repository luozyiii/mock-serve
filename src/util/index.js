const fs = require('fs');
const path = require('path');
const os = require('os');
const Mock = require('mockjs');

const getIpv4 = () => {
  let ipv4s = [];
  //获取网络接口列表对象
  let interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach(function (key) {
    interfaces[key].forEach(function (item) {
      //跳过IPv6 和 '127.0.0.1'
      if ('IPv4' !== item.family || item.internal !== false) return;
      ipv4s.push(item.address); //可用的ipv4s加入数组
    });
  });
  return ipv4s[0]; //返回一个可用的即可
};

// mock数据
const mockData = (jsonData) => {
  return Mock.mock(jsonData);
};

const getJson = (url) => {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    fs.readFile(path.join(process.cwd(), `src${url}.json`), function (err, data) {
      if (err) {
        resolve({ code: -1, msg: '接口不存在' });
        return console.error(err);
      }
      const jsonData = JSON.parse(data.toString());
      resolve({ code: 200, msg: '请求成功', ...mockData(jsonData) });
    });
  });
};

module.exports = {
  getJson,
  getIpv4,
};
