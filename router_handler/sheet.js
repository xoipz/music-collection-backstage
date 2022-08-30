const safeJsonStringify = require("safe-json-stringify");
const { api } = require("./hock/useapi");
/**
 * 在这里定义和用户相关的路由处理函数，供 /router/ces.js 模块进行调用
 */
const NeDB = require("nedb");
const db = new NeDB({
  filename: "./db/sheet.db",
  autoload: true,
});

// 添加歌单
const addsheet = (req, res) => {
  const body = req.body;
  //数据判空
  if (!body) {
    res.send({ msg: "获得值为空" });
    return;
  }

  const result = api();

  // 歌单
  const sheet = {
    type: body.type,
    sheetname: body.sheetname,
    sheetid: "",
    songs: [],
    creater: body.creater,
    authorid: [],
  };

  result.setdata(sheet);

  res.send(result.get());
};

// 登录的处理函数
const login = (req, res) => {
  res.send({ msg: "login OK" });
};

// 登录的处理函数
const get = (req, res) => {
  db.find({}, (err, docs) => {
    console.log("Alice found:", err, docs);
  });
  res.send({ msg: "get OK" });
};

module.exports = {
  addsheet,
  login,
  get,
};
