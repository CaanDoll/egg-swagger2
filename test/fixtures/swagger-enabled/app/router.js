'use strict';
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
          properties: {
            username: 'string',
            password: 'string',
          },
        },
      },
    ],
    responses: {
      200: {
        description: 'success',
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
        status: 'SUCCEED',
        datas: [],
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
    },
  });
};
