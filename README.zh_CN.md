# egg-swagger2

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-swagger2.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-swagger2
[travis-image]: https://img.shields.io/travis/CaanDoll/egg-swagger2.svg?style=flat-square
[travis-url]: https://travis-ci.org/CaanDoll/egg-swagger2
[codecov-image]: https://img.shields.io/codecov/c/github/CaanDoll/egg-swagger2.svg?style=flat-square
[codecov-url]: https://codecov.io/github/CaanDoll/egg-swagger2?branch=master
[david-image]: https://img.shields.io/david/CaanDoll/egg-swagger2.svg?style=flat-square
[david-url]: https://david-dm.org/CaanDoll/egg-swagger2
[snyk-image]: https://snyk.io/test/npm/egg-swagger2/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-swagger2
[download-image]: https://img.shields.io/npm/dm/egg-swagger2.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-swagger2

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-swagger2 版本 | egg 2.x
--- | ---
1.x | 😁

### 依赖的插件
- static

## 开启插件

```js
// config/plugin.js
exports.swagger2 = {
  enable: true,
  package: 'egg-swagger2',
};
```

## 使用场景

- 启动程序后自动生成swagger文档。与注解不同，是以配置的方式呈现。相比较注解而言稍微麻烦些但是不需要引入TS或者编译器。完全支持swagger语法
- 推荐在app/router.js中与每个路由对应使用

## 插件配置

```js
// {app_root}/config/config.default.js
exports.swagger2 = {
  enable:false, // 禁用swagger , 默认为true
  base: {
    /* default config,support cover
    schemes: [
        'http',
    ],
    host: '127.0.0.1:7001',
    basePath: '/',
    consumes: [
    'application/json',
    ],
    produces: [
    'application/json',
    ],
    */
    info: {
      description: 'This is a test swagger-ui html',
      version: '1.0.0',
      title: 'TEST',
      contact: {
        email: 'caandoll@aliyun.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    tags: [
      {
        name: 'admin',
        description: 'Admin desc',
      },
      {
        name: 'role',
        description: 'Role desc',
      },
    ],
    definitions:{
    // model definitions
    },
    securityDefinitions:{
    // security definitions
    }
  },
};
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 示例

```js
// {app_root}/app/router.js
 module.exports = app => {
   const { router, controller, swagger } = app;
   router.post('/login', controller.test.postLogin);
   swagger.post('/login', {
       tags: [
         'admin',
       ],
       summary: 'Login a admin',
       description: '',
       parameters: [
         {
           in: 'body',
           name: 'body',
           description: 'admin\'s username & password',
           required: true,
           schema: {
             type: 'object',
             required: [ 'username', 'password' ],
             properties: {
               username: {
                 type: 'string',
                 description: 'admin\'s username',
               },
               password: {
                 type: 'string',
                 description: 'admin\'s password',
               },
             },
           },
         },
       ],
       responses: {
         200: {
           description: 'SUCCEED',
           schema: {
             type: 'object',
             properties: {
               status: {
                 type: 'string',
                 description: 'status',
               },
               data: {
                 type: 'object',
                 description: 'data',
                 properties: {
                   token: {
                     type: 'string',
                     description: 'token',
                   },
                 },
               },
             },
           },
         },
       },
     });
   router.get('/roles', controller.test.getRoles);
   swagger.get('/roles', {
     tags: [
       'role',
     ],
     summary: 'search role by page',
     description: '',
     parameters: [
       {
         in: 'query',
         name: 'name',
         description: 'role\'s name',
       },
       {
         in: 'query',
         name: 'pageIndex',
         description: 'pageIndex',
       },
       {
         in: 'query',
         name: 'pageSize',
         description: 'pageSize',
       },
     ],
     responses: {
       200: {
          description: 'SUCCEED',
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'status',
              },
              datas: {
                type: 'array',
                description: 'result datas',
                properties: {
                  token: {
                    type: 'string',
                    description: 'token',
                  },
                },
              },
              pageIndex:{
                type: 'number',
                description: 'pageIndex',
              },
              pageSize:{
                type: 'number',
                description: 'pageSize',
              },
              totalCount:{
                type: 'number',
                description: 'totalCount',
              },
            },
          },
        },
     },
   });
 };
```
- schema配置都可以通过$ref关联至config中的definitions
- [更多配置请查看swagger editor示例](https://editor.swagger.io/)

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
