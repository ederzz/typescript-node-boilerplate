"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const router = new Router({
    prefix: '/crawler'
});
router
    .get('/bookClassifyList', async (ctx) => {
    const { status, data } = await axios_1.default.get('https://www.qidian.com/');
    if (status !== 200) {
        ctx.body = '请求失败';
        return;
    }
    const $ = cheerio_1.load(data);
    const classifyList = $('.classify-list dl').children();
    const classifyListData = [];
    classifyList.each((_, ele) => {
        const classify = $('a > cite > .info > i', ele).text();
        const bookNum = Number($('a > cite > .info b', ele).text());
        classifyListData.push({
            classify,
            bookNum
        });
    });
    ctx.body = classifyListData;
});
exports.default = router;
