const usersModel = require('../models/users')
const tools = require('../utils/tools')

module.exports = {
  async signup(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8') // 定义返回的字符串为json字符串
    let {username, password} = req.body

    // 判断用户是否存在
    let result = await usersModel.findOne(username)
    if(!result) {
      // 密码加密
      let newPassword = await tools.crypt(password)
      // console.log(newPassword)

      // res.send('signup')
      // 保存数据到数据库
      await usersModel.save({
        username,
        password: newPassword
      }) //不用担心插入别的，因为传进去之后被解构了
      // console.log(result)
      // res.json(result)

      // 给前端返回接口
      // 由于模板在app.js中定义过了，所以不需要加载
      res.render('success', {
        data: JSON.stringify({
          msg: '用户注册成功'
        })
      })
    }
    res.render('fail', {
      data: JSON.stringify({
        msg: '用户已存在'
      })
    })
  },
  
  async signin(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8') // 定义返回的字符串为json字符串
    let {username, password} = req.body
    // 从数据库中根据用户名取出用户信息
    let result = await usersModel.findOne(username)
    // console.log(result)
    if(result) {
      if(await tools.compare(password, result.password)) {
        res.render('success', {
          data: JSON.stringify({
            msg: '用户登录成功',
            username
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            msg: '账户或密码错误'
          })
        })
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '账户或密码错误'
        })
      })
    }
  }
}