'use strict';
const Controller = require('egg').Controller;

class TestController extends Controller {

  async postLogin() {
    const { ctx } = this;
    ctx.body = {
      status: 'SUCCEED',
    };
  }

  async getRoles() {
    const { ctx } = this;
    ctx.body = {
      status: 'SUCCEED',
    };
  }
}

module.exports = TestController;
