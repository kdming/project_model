const Router = require('koa-router');
const path = require('path');
const glob = require('glob');

const router = new Router({prefix: '/api' });

const loadRouter = () => {
  try {
    // 获取路由文件列表
    const filePath = path.join(`${__dirname}/../../controller`);
    let defines = glob.sync('*/*controller.js', {
      root: 'controller',
      cwd: filePath
    });
    // 加载路由
    for (let v in defines) {
      const controller = require(`${filePath}/${defines[v]}`);
      controller.router(router);
    }
    console.log('路由列表', defines);
  } catch (err) {
    console.log(err);
  }
}

loadRouter();
module.exports = router;