'use strict';
const fs = require('fs');
const path = require('path');
const mock = require('egg-mock');
const assert = require('assert');

describe('test/swagger2.test.js', () => {
  describe('swagger enabled', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'swagger-enabled',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('app should has property swagger', () => {
      assert(app.swagger);
    });

    it('app.swagger should has property $method and $method is a function', () => {
      const properties = [ 'head', 'options', 'get', 'put', 'post', 'patch', 'delete', 'del' ];
      for (const prop of properties) {
        assert(app.swagger[ prop ] && typeof app.swagger[ prop ] === 'function');
      }
    });

    it('app.swagger should has property paths and paths is not empty object', () => {
      assert(app.swagger.paths && JSON.stringify(app.swagger.paths) !== '{}');
    });

    it('static dir should has same files with template', () => {
      const files = fs.readdirSync(path.join(app.baseDir, '../../../template/swagger'));
      for (const file of files) {
        const filePath = path.join(app.config.static.dir, 'swagger', file);
        assert(fs.existsSync(filePath));
      }
    });

    it('static dir should has swagger.json and swagger.json is correct', () => {
      const jsonPath = path.join(app.config.static.dir, 'swagger/swagger.json');
      assert(fs.existsSync(jsonPath));
      const json = fs.readFileSync(jsonPath, 'utf-8');
      const jsonObj = Object.assign(app.config.swagger2.base, { paths: app.swagger.paths });
      assert(json.replace('\n', '') === JSON.stringify(jsonObj));
    });
  });
  describe('swagger disabled', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'swagger-disabled',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('static dir should not has swagger dir', () => {
      const filePath = path.join(app.config.static.dir, 'swagger');
      assert(!fs.existsSync(filePath));
    });

  });
});

