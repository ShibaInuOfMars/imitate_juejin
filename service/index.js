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

// 用户信息获取
let INFO_BASE = 'https://user-storage-api-ms.juejin.im/v1';
let getUserInfo = (url, params) => {
  return myAjax({
    url: INFO_BASE + url,
    data: {
      src: params.src, 
      device_id: params.device_id, 
      uid: params.uid, 
      token: params.token, 
      current_uid: params.current_uid
    },
    method: 'GET'
  });
};

// 消息中心消息条数
let MSG_BASE = 'https://ufp-api-ms.juejin.im/v1';
let getUserMsgCount = (url, params) => {
  return myAjax({
    url: MSG_BASE + url,
    data: {
      src: params.src, 
      uid: params.uid, 
      token: params.token
    },
    method: 'GET'
  });
};

module.exports = {
  userLogin: userLogin,
  getUserInfo: getUserInfo,
  getUserMsgCount: getUserMsgCount
};