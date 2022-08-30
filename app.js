const express = require("express");
const cors = require("cors");
const sheetRouter = require("./router/sheet");
const uploadRouter = require("./router/upload");

// 创建 express 的服务器实例
const app = express();

app.use(express.json()); //数据JSON类型
app.use(express.urlencoded({ extended: false })); //解析post请求数据

//使用全局中间件
// 定义第一个全局中间件
app.use((req, res, next) => {
  // console.log(res.cc)
  next();
});

// 响应数据的中间件
// app.use((req, res, next) => {
//   // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
//   res.cc = (err, status = 1) => {
//     res.send({
//       // 状态
//       status,
//       // 状态描述，判断 err 是 错误对象 还是 字符串
//       message: err instanceof Error ? err.message : err,
//     });
//   };
//   next();
// });

app.use("/sheet", sheetRouter);
app.use("/upload",uploadRouter)

//使用跨域
app.use(cors());

// TODO
app.use(express.urlencoded({ extended: false }));

// write your code here...

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(9007, function () {
  console.log("api server running at http://127.0.0.1:9007");
});
