let myAjax = require('./ajax.js');

// 登录相关 
let LOGIN_BASE = 'https://juejin.im/auth/type';

let loginByPhoneNumber = (type, params) => {
  if (type === 'phoneNumber') { // 手机号登录
    let api = LOGIN_BASE + '/phoneNumber';
  } else if (type === 'email') { // 邮箱登录
    let api = LOGIN_BASE + '/email';
  }

  myAjax({
    url: api,
    data: {
      phoneNumber: params.username,
      password: params.password
    },
    method: 'POST'
  });
};