"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const services = require("../services/student");
const router = new Router();
router.post('/student', async (ctx, _) => {
    await services.createStudent(ctx.request.body);
    ctx.body = {
        success: true
    };
});
router.post('/project', async (ctx, _) => {
    await services.createProject(ctx.request.body);
    ctx.body = {
        success: true
    };
});
router.get('/student/list', async (ctx, _) => {
    const query = Object.assign({ pageNo: 1, pageSize: 20 }, ctx.query);
    const res = await services.getStudents(query);
    ctx.body = res;
});
exports.default = router;
