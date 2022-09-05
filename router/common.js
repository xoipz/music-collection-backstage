const express = require("express");
const router = express.Router();


// 导入用户路由处理函数模块
const Handler = require('../router_handler/common');

// 上传文件
router.post("/upload",Handler.upload);

router.get("/test", Handler.test);

module.exports = router;
