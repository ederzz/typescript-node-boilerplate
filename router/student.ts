import * as Router from 'koa-router'
import * as services from '../services/student'

const router = new Router()

router.post('/', async (ctx, _) => {
    await services.createStudent(ctx.body)

    ctx.body = {
        success: true
    }
})