"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const axios_1 = require("axios");
const router = new Router({
    prefix: '/crawler'
});
router
    .get('/test', async (ctx) => {
    const result = await axios_1.default.get('https://www.baidu.com');
    console.log(result);
    ctx.body = 'test';
});
exports.default = router;
