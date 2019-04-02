"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const services = require("../services/student");
const router = new Router();
router.post('/', async (ctx, _) => {
    await services.createStudent(ctx.body);
    ctx.body = {
        success: true
    };
});
