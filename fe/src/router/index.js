import SMERouter from 'sme-router'

const router = new SMERouter('router-view', 'hash') // 默认就是hash

import Home from '../controllers/home'
import Position from '../controllers/position'

// sme-router 中间件，会在每次路由切换的时候都会触发，调整高亮
router.use((req, res, next) => {
  // console.log(0)
  // console.log(req.url)
  $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass('active')
    .siblings()
    .removeClass('active')
})

// 路由重定向
router.route('/', Home.render)
router.route('/position', Position.render)

// 将页面导航到 /，默认route方法不具备自动导航功能
router.redirect('/') // 一开始就跳转到#/路由

export default router