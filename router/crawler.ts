import * as Router from 'koa-router'
import axios, { AxiosResponse } from 'axios'
import {
    load
} from 'cheerio'

const router = new Router({
    prefix: '/crawler'
})
const siteAddress: string = 'https://www.qidian.com/' // 站点地址
const xzSiteAddress: string = 'https://www.biquge.info/2_2309/'

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

interface XzChapter {
    name: string,
    link: string
}

router
.get('/bookClassifyList', async (ctx) => {
    const {
        status,
        data
    }: AxiosResponse = await axios.get(siteAddress)
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
    }: AxiosResponse = await axios.get(siteAddress)
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
.get('/xz/chapter-list', async (ctx) => {
    const {
        status,
        data
    }: AxiosResponse = await axios.get(xzSiteAddress)
    if (status !== 200) {
        ctx.body = '请求失败'
        return
    }

    const $: CheerioStatic = load(data)
    const chapterList = $('.box_con > #list > dl').children()
    const chaptersNum: number = chapterList.length
    const promiseNum: number = Math.ceil(chaptersNum / 100)
    const promises: Promise<XzChapter[]>[] = []
    for (let i = 0;i < promiseNum;i++) {
        promises.push(
            new Promise((resolve, _) => {
                const chaptersArr: XzChapter[] = []
                chapterList.slice(i * 100, i * 100 + 100).each((_, chapter) => {
                    chaptersArr.push({
                        name: $(chapter).text(),
                        link: `${xzSiteAddress}${$(chapter).find('a').attr('href')}`
                    })
                })
                resolve(chaptersArr)
            })
        )
    }
    const chapterListData = await Promise.all(promises)
    ctx.body = chapterListData.reduce((data, current) => {
        data.push(...current)
        return data
    }, [])
})

export default router