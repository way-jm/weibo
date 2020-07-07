const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('../routes')
const users = require('../routes/users')

// error handler--在屏幕上显示
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 静态化，通过目录的方式访问
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/../views', {
  extension: 'ejs'
}))

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling-打印error
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
