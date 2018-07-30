'use strict';
module.exports = () => {
  return {
    logger: {
      level: 'NONE',
    },
    swagger2: {
      enable: false,
      base: {
        info: {
          description: '这是一个test swagger',
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
        ],
      },
    },
  };
};
