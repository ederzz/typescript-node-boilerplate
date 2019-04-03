import * as Router from 'koa-router'
import * as services from '../services/student'

const router = new Router()

router.post('/student', async (ctx: any, _) => {
    await services.createStudent(ctx.request.body)

    ctx.body = {
        success: true
    }
})

router.post('/project', async (ctx: any, _) => {
    await services.createProject(ctx.request.body)

    ctx.body = {
        success: true
    }
})

router.get('/student/list', async (ctx: any, _) => {
    const query = {
        pageNo: 1,
        pageSize: 20,
        ...ctx.query
    }
    const res = await services.getStudents(query)
    ctx.body = res
})

export default router