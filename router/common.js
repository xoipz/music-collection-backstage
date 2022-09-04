const express = require('express')
const router = express.Router()
// 引入导入模块
const multiparty = require('multiparty');
const fs = require("fs");
const { api } = require('../router_handler/hock/useapi');

/**
 * TODO
 * 1.如果没有文件夹不在，不会自动创建
 * 2.不发送文件照样接收而且生成文件
 * 3.缺少异常捕获
 * 4.没有进行文件夹管理，文件夹管理可以单独开一个模块
 */



// 上传文件
router.post("/upload", (req, res)=> {
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = './upload';
  //设置文件大小限制
  // form.maxFilesSize = 1 * 1024 * 1024;
  form.parse(req, (err, fields, files)=> {
    try {
        console.log(err, fields, files)
      let inputFile = files.file[0];
      let uploadedPath = inputFile.path;
      let newPath = form.uploadDir + "/" + inputFile.originalFilename;
      //同步重命名文件名 fs.renameSync(oldPath, newPath)
      fs.renameSync(inputFile.path, newPath);
      res.send({ data: "上传成功！" });
      //读取数据后 删除文件
      // fs.unlink(newPath, function () {
      //   console.log("删除上传文件");
      // })
    } catch (err) {
      console.log(err);
      res.send({ err: "上传失败！" });
    };
  })
})

router.get("/test",(req,res)=>{
  const result = new api()
  result.setcode(200)
  result.setmsg("链接成功")
  res.send(result.get())
})




module.exports = router;