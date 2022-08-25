/**
 * 在这里定义和用户相关的路由处理函数，供 /router/ces.js 模块进行调用
 */

// 注册用户的处理函数
const regUser = (req, res) => {
  res.send("reguser OK");
};

// 登录的处理函数
const login = (req, res) => {
  res.send({msg:"login OK"});
};

module.exports = {
  regUser,
  login,
};
