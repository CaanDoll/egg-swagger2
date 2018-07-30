'use strict';
const fsEx = require('fs-extra');
const path = require('path');

module.exports = app => {
  app.beforeStart(() => {
    const { config, swagger, logger } = app;
    if (config.swagger2.enable === false) {
      logger.info('swagger-ui was disabled');
    } else {
      // 1.拷贝模版文件
      const _static = config.static;
      const staticPath = _static.dir;
      const swaggerPath = path.join(staticPath, 'swagger');
      fsEx.ensureDirSync(swaggerPath);
      fsEx.copySync(path.join(__dirname, 'template/swagger'), swaggerPath);
      // 2.处理swagger json对象
      // --(1)获取合并后的base
      const base = config.swagger2.base;
      // --(2)获取合并后的paths
      base.paths = swagger.paths;
      // 3.生成json文件
      fsEx.writeJsonSync(path.join(swaggerPath, 'swagger.json'), base);
      logger.info(`swagger-ui url:${base.schemes[ 0 ]}://${base.host + _static.prefix}swagger/index.html`);
    }
  });
};
