const express = require("express");
const cors = require("cors");
const sheetRouter = require("./router/sheet");
// 创建 express 的服务器实例
const app = express();

//使用全局中间件
// 定义第一个全局中间件
app.use((req, res, next) => {
  // console.log(res.cc)
  next();
});

// 响应数据的中间件
app.use((req, res, next) => {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

app.use("/sheet", sheetRouter);
app.use(cors());

// TODO https://brucecai55520.gitee.io/bruceblog/notes/nodejs/ev_api_server.html#_1-3-%E9%85%8D%E7%BD%AE%E8%A7%A3%E6%9E%90%E8%A1%A8%E5%8D%95%E6%95%B0%E6%8D%AE%E7%9A%84%E4%B8%AD%E9%97%B4%E4%BB%B6
app.use(express.urlencoded({ extended: false }));

// write your code here...

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log("api server running at http://127.0.0.1:3007");
});
