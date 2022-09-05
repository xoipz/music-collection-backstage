const safeJsonStringify = require("safe-json-stringify");
const { api } = require("./hock/useapi");
const NeDB = require("nedb");
var url = require("url");
const db = new NeDB({
  filename: "./db/sheet.db",
  autoload: true,
  corruptAlertThreshold: 1, //不在乎文件被修改，0这在乎
  timestampData: true, //生成时间戳
});

// 添加歌单
const addsheet = (req, res) => {
  // post获取body
  const body = req.body;
  const result = api();

  // 歌单
  const sheet = {
    type: body.type || "null",
    sheetname: body.sheetname || "sheetname",
    sheetimg: body.sheetimg || "",
    describe: body.describe || "",
    songs: [],
    creater: body.creater || "user",
    authorid: body.authorid || [],
  };

  const insert = () => {
    let promise = new Promise((resolve, reject) => {
      db.insert(sheet, (err) => {
        if (err) {
          result.setmsg(err);
          reject();
        }
        result.setmsg("添加成功");

        resolve();
      });
    });
    return promise;
  };

  insert().then(() => {
    res.send(result.get());
  });
};

// 获取歌单
const getsheet = (req, res) => {
  let id;
  const result = api();
  const resquery = url.parse(req.url, true).query;
  if (req.url != "/favicon.ico" && resquery.id) id = resquery.id;

  const find = () => {
    let promise = new Promise((resolve, reject) => {
      let finddata = {};

      db.find(finddata)
        .sort({ createdAt: 1 })
        .exec((err, docs) => {
          if (err) {
            result.setmsg(err);
            reject();
          }
          result.setdata(
            docs.map((i) => {
              const tem = {
                ...i,
                id: i._id,
              };
              delete tem._id;
              delete tem.songs;
              return tem;
            })
          );
          resolve();
        });
    });

    return promise;
  };

  find().then(() => {
    res.send(result.get());
  });
};

const test = () => {
  db.find({})
    .sort({ createdAt: 1 })
    .exec((err, doc) => {
      console.log("test", err, doc);
    });
};

// // 登录的处理函数
// const get = (req, res) => {
//   db.find({}, (err, docs) => {
//     console.log("Alice found:", err, docs);
//   });
//   res.send({ msg: "get OK" });
// };

module.exports = {
  addsheet,
  getsheet,
  test,
};
