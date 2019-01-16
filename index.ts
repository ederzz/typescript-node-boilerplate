import * as Koa from 'koa'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'koa-body'
import * as serve from 'koa-static'
import * as config from 'config'
import * as cors from 'koa2-cors'
import * as shortid from 'shortid'
import * as nunjucks from 'koa-nunjucks-2' 
import chalk from 'chalk'

import indexRouter from './router'
import accountRouter from './router/account'
import apiTestRouter from './router/apiTest'
import githubApiRouter from './router/githubApi'
import uploadRouter from './router/upload'
import crawlerRouter from './router/crawler'
import { mimeCollections } from './constants'
import MongooseStart from './models/db'

const hostname: string = config.get('host.hostname')
const port: number = config.get('host.port')
const staticDirPath: string = '.' + path.resolve(__dirname, '/static')
const logFilePath: string = path.resolve(__dirname, 'log/app.log') // log文件路径
const errorFilePath: string = path.resolve(__dirname, 'log/error.log') // 错误日志文件路径
const mongooseStart = new MongooseStart()
mongooseStart.setUpDb()

const app = new Koa()

// error log
app.use(async (_, next) => {
    try {
        await next()
    } catch (err) {
        const errorLog: string = `${new Date()} 发生错误:\n${err.stack}\n`
        fs.appendFileSync(errorFilePath, errorLog)
    }
})

// request log
app.use(async (ctx, next) => {
    const sTime: number = Date.now();
    await next();
    
    const eTime: number = Date.now();
    const log: string = `请求地址：${ctx.path},请求方法：${ctx.request.method},响应时间：${eTime - sTime}ms,响应状态:${ctx.response.status}--请求时间：${new Date()}\n`;
    console.log(chalk.green(log))
    fs.appendFileSync(logFilePath, log);
});

// 指定静态资源目录
app.use(serve(staticDirPath))

// 模板引擎
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true 
    }
}))

// 解析post body
app.use(bodyParser({
    formidable:{
        uploadDir: __dirname + '/static', // directory where files will be uploaded
        keepExtensions: true,
        onFileBegin(_: any, file: any): any {
            const {
                path: filePath,
                type
            } = file

            const paths: string[] = filePath.split('/')
            const suffixReg: RegExp = /^(.*)(\..*)$/
            const suffix: string = suffixReg.exec(paths[paths.length -1])[2]
            let dirName: string
            if (mimeCollections.imgType.includes(type)) {
                dirName = 'imgs'
            } else if (mimeCollections.musicType.includes(type)) {
                dirName = 'music'
            } else {
                return null
            }
                            
            file.path = path.resolve(paths.slice(0, -1).join('/'), 
                                    dirName, 
                                    `${shortid.generate()}${suffix}`)
        }
    },
    multipart: true,
    urlencoded: true
}))

// cors config
app.use(cors())

// app routes
app.use(indexRouter.routes())
app.use(accountRouter.routes())
app.use(apiTestRouter.routes())
app.use(githubApiRouter.routes())
app.use(uploadRouter.routes())
app.use(crawlerRouter.routes())

app.listen(port, () => {
    console.log(chalk.green(`server is running at ${hostname}:${port}`));
    console.log(process.env.NODE_ENV);
});