let {myAjax} = require('./ajax.js');

// 登录相关 
let LOGIN_BASE = 'https://juejin.im/auth/type';

let userLogin = (type, params) => {
  if (type === 'phoneNumber') { // 手机号登录
    let api = LOGIN_BASE + '/phoneNumber';
    return myAjax({
      url: api,
      data: {
        phoneNumber: params.username,
        password: params.password
      },
      method: 'POST'
    });
  } else if (type === 'email') { // 邮箱登录
    let api = LOGIN_BASE + '/email';
    return myAjax({
      url: api,
      data: {
        email: params.username,
        password: params.password
      },
      method: 'POST'
    });
  }
};

module.exports = {
  userLogin: userLogin
};