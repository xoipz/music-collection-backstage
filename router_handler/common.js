// 引入导入模块
const multiparty = require("multiparty");
const fs = require("fs");
const { api } = require("./hock/useapi");
const { mkdirsSync } = require("./hock/usefs");
const sort = {
  music: ["mp3", "m4a"],
  video: ["mp4"],
  image: ["gif", "jpg"],
};

/**
 * TODO
 * 1.如果没有文件夹不在，不会自动创建√
 * 2.不发送文件照样接收而且生成文件√-(会报错文件还是存在)
 * 3.缺少异常捕获 √
 * 4.没有进行文件夹管理，文件夹管理可以单独开一个模块
 * 5.分类√
 */

const upload = (req, res) => {
  let result = new api();
  /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = "utf-8";
  //设置文件存储路径
  form.uploadDir = "./upload";
  //设置文件大小限制
  // form.maxFilesSize = 1 * 1024 * 1024;

  //开始传输
  form.parse(req, (err, fields, files) => {
    let redata = []; //返回的data

    try {
      files.file.map((inputFile) => {
        // 获取文件
        let uploadedPath = inputFile.path;

        //获取文件后缀
        let filesuffix;
        try {
          filesuffix = uploadedPath.split(".");
          filesuffix = filesuffix[filesuffix.length - 1];
        } catch (err) {
          filesuffix = null;
        }

        //设置分类数组
        let keysort = "other";
        Object.entries(sort).forEach(([key, value]) => {
          sort[key].forEach((suffix) => {
            if (suffix == filesuffix) {
              keysort = key;
            }
          });
        });

        //同步重命名文件名 fs.renameSync(oldPath, newPath)
        let newPath =
          form.uploadDir + "/" + keysort + "/" + inputFile.originalFilename;

        //同步创建文件夹
        mkdirsSync(form.uploadDir + "/" + keysort + "/");

        //同步重命名
        fs.renameSync(uploadedPath, newPath);

        //推送结果
        redata.push({
          url: keysort + "/" + inputFile.originalFilename,
        });
      });
      result.setcode(200);
      result.setdata(redata);
      result.setmsg("上传成功！");
      res.send(result.get());
    } catch (err) {
      result.setcode(400);
      result.setmsg(err);
      res.send(result.get());
      return;
    }
  });
};

const test = (req, res) => {
  const result = new api();
  result.setcode(200);
  result.setmsg("链接成功");
  res.send(result.get());
};

module.exports = {
  upload,
  test,
};
