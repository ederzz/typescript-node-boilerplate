import { IRouterContext } from 'koa-router'

const {
    timeModel
} = require('../../models')

export const genOneDocument = async (ctx: IRouterContext, _: Function) => {
    try {
        await timeModel.create({
            time: Date.now()
        })

        ctx.body = '创建成功'
    } catch (error) {
        throw error
    }
}
