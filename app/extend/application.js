'use strict';
const swagger = {
  paths: {},
};

const methodList = [ 'head', 'options', 'get', 'put', 'post', 'patch', 'delete', 'del' ];
for (const method of methodList) {
  swagger[ method ] = function(pathParam, params) {
    const path = this.paths[ pathParam ];
    this.paths[ pathParam ] = path ? path : {};
    this.paths[ pathParam ][ method ] = params;
  };
}

module.exports = {
  swagger,
};
