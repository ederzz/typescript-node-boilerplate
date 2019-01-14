import * as Router from 'koa-router'
import axios from 'axios'
import {
    load
} from 'cheerio'

const router = new Router({
    prefix: '/crawler'
})
const siteAddress: string = 'https://www.qidian.com/' // 站点地址

interface ClassifyItem {
    classify: string,
    bookNum: number
}
interface Book {
    name: string,
    total: number // 月票
}
interface RankList {
    title: string,
    books: Book[]
}

router
.get('/bookClassifyList', async (ctx) => {
    const {
        status,
        data
    } = await axios.get(siteAddress)
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
.get('/rank-lists', async (ctx) => {
    const {
        status,
        data
    } = await axios.get(siteAddress)
    if (status !== 200) {
        ctx.body = '请求失败'
        return
    }

    const $: CheerioStatic = load(data)
    const rankLists: Cheerio = $('.rank-list-row > .rank-list')
    const rankListData: RankList[] = [] // return data

    rankLists.each((_, ele) => {
        const title = $('.wrap-title', ele).text()
        const books: Book[] = []

        $('.book-list > ul', ele).children().each((i, bookEle) => {
            if (i === 0) {
                const name = $('.book-wrap > .book-info > h4 > a', bookEle).text()
                const total = Number($('.book-wrap > .book-info > .digital > em', bookEle).text())
                books.push({
                    name,
                    total
                })
                return
            }
            const name = $('.name-box .name', bookEle).text()
            const total = $('.name-box .total', bookEle).text()

            books.push({
                name,
                total: total && Number(total) || null
            })
        })

        rankListData.push({
            title,
            books
        })
    })

    ctx.body = rankListData
})

export default router