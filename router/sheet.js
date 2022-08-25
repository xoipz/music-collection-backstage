const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const sheetHandler = require('../router_handler/sheet')

// 注册新用户
router.get('/getsheet', cesHandler.regUser)
// 登录
router.get('/login', cesHandler.login)

module.exports = router