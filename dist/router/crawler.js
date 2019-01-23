"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const router = new Router({
    prefix: '/crawler'
});
const siteAddress = 'https://www.qidian.com/';
const xzSiteAddress = 'https://www.biquge.info/2_2309/';
router
    .get('/bookClassifyList', async (ctx) => {
    const { status, data } = await axios_1.default.get(siteAddress);
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
})
    .get('/rank-lists', async (ctx) => {
    const { status, data } = await axios_1.default.get(siteAddress);
    if (status !== 200) {
        ctx.body = '请求失败';
        return;
    }
    const $ = cheerio_1.load(data);
    const rankLists = $('.rank-list-row > .rank-list');
    const rankListData = [];
    rankLists.each((_, ele) => {
        const title = $('.wrap-title', ele).text();
        const books = [];
        $('.book-list > ul', ele).children().each((i, bookEle) => {
            if (i === 0) {
                const name = $('.book-wrap > .book-info > h4 > a', bookEle).text();
                const total = Number($('.book-wrap > .book-info > .digital > em', bookEle).text());
                books.push({
                    name,
                    total
                });
                return;
            }
            const name = $('.name-box .name', bookEle).text();
            const total = $('.name-box .total', bookEle).text();
            books.push({
                name,
                total: total && Number(total) || null
            });
        });
        rankListData.push({
            title,
            books
        });
    });
    ctx.body = rankListData;
})
    .get('/xz/chapter-list', async (ctx) => {
    const { status, data } = await axios_1.default.get(xzSiteAddress);
    if (status !== 200) {
        ctx.body = '请求失败';
        return;
    }
    const $ = cheerio_1.load(data);
    const chapterList = $('.box_con > #list > dl').children();
    const chaptersNum = chapterList.length;
    const promiseNum = Math.ceil(chaptersNum / 100);
    const promises = [];
    for (let i = 0; i < promiseNum; i++) {
        promises.push(new Promise((resolve, _) => {
            const chaptersArr = [];
            chapterList.slice(i * 100, i * 100 + 100).each((_, chapter) => {
                chaptersArr.push({
                    name: $(chapter).text(),
                    link: `${xzSiteAddress}${$(chapter).find('a').attr('href')}`
                });
            });
            resolve(chaptersArr);
        }));
    }
    const chapterListData = await Promise.all(promises);
    ctx.body = chapterListData.reduce((data, current) => {
        data.push(...current);
        return data;
    }, []);
});
exports.default = router;
