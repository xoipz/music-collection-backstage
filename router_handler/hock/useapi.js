const safeJsonStringify = require("safe-json-stringify");

function api() {
  this.code = 200;
  this.data = {};
  this.msg = "";

  const get = () => {
    let result = {
      code: this.code,
    };
    if (safeJsonStringify(data) != "{}") result.data = this.data;
    if (msg != "") result.msg = this.msg;
    return result;
  };

  const setcode = (code) => {
    this.code = code;
  };

  const setdata = (data) => {
    this.data = data;
  };

  const setmsg = (msg, code) => {
    if (code) {
      this.code = code;
    }
    this.msg = msg;
  };

  return {
    get,
    setcode,
    setdata,
    setmsg,
  };
}

module.exports = {
  api,
};
