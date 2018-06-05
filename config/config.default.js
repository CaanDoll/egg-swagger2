'use strict';

/**
 * egg-swagger2 default config
 * @member Config#swagger2
 * @property {String} SOME_KEY - some description
 */
exports.swagger2 = {
  base: {
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
  },
};
