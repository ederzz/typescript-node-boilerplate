import * as Router from 'koa-router'
import axios from 'axios'
import {
    load
} from 'cheerio'

const router = new Router({
    prefix: '/crawler'
})

interface ClassifyItem {
    classify: string,
    bookNum: number
}

router
.get('/bookClassifyList', async (ctx) => {
    const {
        status,
        data
    } = await axios.get('https://www.qidian.com/')
    if (status !== 200) {
        ctx.body = '请求失败'
        return 
    }

    const $: CheerioStatic = load(data)
    const classifyList: Cheerio = $('.classify-list dl').children()
    const classifyListData: ClassifyItem[] = []

    classifyList.each((_, ele) => {
        const classify: string = $('a > cite > .info > i', ele).text()
        const bookNum: number = Number($('a > cite > .info b', ele).text())

        classifyListData.push({
            classify,
            bookNum
        })
    })

    ctx.body = classifyListData
})

export default router