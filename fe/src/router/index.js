import SMERouter from 'sme-router'
import Home from '../controllers/home'
import Position from '../controllers/position'

const router = new SMERouter('router-view', 'hash') // 默认就是hash

router.route('/', Home.render)
router.route('/position', Position.render)

router.redirect('/') // 一开始就跳转到#/路由

export default router