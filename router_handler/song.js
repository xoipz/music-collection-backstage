 const NeDB = require("nedb");
 
 const db = new NeDB({
   filename: ("./db/song.db"),
   autoload: true,
 });
 
 // 注册用户的处理函数
 const add = (req, res) => {
   db.insert(
     {
       name: "Alice",
       age: 20,
       rank: 1,
     },
     (err, doc) => {
       console.log("inserted:", err,doc);
     }
   );
 
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
 