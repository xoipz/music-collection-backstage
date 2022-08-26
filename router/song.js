const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const Handler = require('../router_handler/song')

// 注册新用户
router.get('/add', Handler.add)
// 登录
router.get('/login', Handler.login)
// 登录
router.get('/get', Handler.get)




module.exports = router