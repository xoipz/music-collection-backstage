const safeJsonStringify = require("safe-json-stringify");
const { api } = require("./hock/useapi");
const NeDB = require("nedb");
const db = new NeDB({
  filename: "./db/sheet.db",
  autoload: true,
  corruptAlertThreshold: 1, //不在乎文件被修改，0这在乎
});

// 添加歌单
const addsheet = (req, res) => {
  const body = req.body;
  const result = api();

  // 歌单
  const sheet = {
    type: body.type,
    sheetname: body.sheetname,
    // sheetid: "",
    sheetimg: body.sheetimg,
    songs: [],
    creater: body.creater,
    authorid: [],
  };

  db.insert({ ...sheet }, (err, docs) => {
    console.log("Alice found:", err, docs);
  });

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
