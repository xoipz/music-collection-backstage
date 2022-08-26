const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const Handler = require('../router_handler/sheet')


//添加歌单
router.get('/add', Handler.add)
// 查询歌单
// router.get('/find', Handler.find)






// 登录
router.get('/login', Handler.login)
// 登录
router.get('/get', Handler.get)




module.exports = router