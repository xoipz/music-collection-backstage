/**
 * 在这里定义和用户相关的路由处理函数，供 /router/ces.js 模块进行调用
 */
const NeDB = require("nedb");
const db = new NeDB({
  filename: "./db/sheet.db",
  autoload: true,
});

// 添加歌单
const add = (req, res) => {
  // db.insert(
  //   {
  //     name: "Alice",
  //     age: 20,
  //     rank: 1,
  //   },
  //   (err, doc) => {
  //     console.log("inserted:", err,doc);
  //   }
  // );

  res.send("reguser OK");
};

// 登录的处理函数
const login = (req, res) => {
  res.send({ msg: "login OK" });
};

// 登录的处理函数
const get = (req, res) => {
  db.find({}, (err, docs)=> {
    console.log('Alice found:',err, docs)
})
  res.send({ msg: "get OK" });
};


module.exports = {
  add,
  login,
  get
};
