import * as Router from 'koa-router'
import axios from 'axios'

const router = new Router({
    prefix: '/crawler'
})

router
.get('/test', async (ctx) => {
    const result = await axios.get('https://www.baidu.com')
    console.log(result)
    ctx.body = 'test'
})

export default router