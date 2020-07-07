const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg:'123',
    isMe:true
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:username', async (ctx, next) => {
  const {username} = ctx.params;
  ctx.body = {
    title: 'this is profile page',
    username:username
  }
})

router.get('/loadmore/:username/:pageindex', async (ctx, next) => {
  const {username,pageindex} = ctx.params;
  ctx.body = {
    title: 'this is loadmore page',
    username,
    pageindex
  }
})

router.post('/login',async (ctx,next)=>{
  const{username,password}= ctx.request.body;
  ctx.body = {
    title:'post',
    username,
    password
  }
})

module.exports = router
