import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appKey无效',
  3000: '期刊不存在'
}

class HTTP{
  request(params){
    let url = config.api_url + params.url;
    if(!params.method){
      params.method = 'GET';
    }

    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json',
        'appKey': config.appKey
      },
      success: (res)=>{
        let code = res.statusCode.toString();
        let startChar = code.charAt(0);
        if (startChar == '2') {
          params.success && params.success(res);
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (error)=>{
        this._show_error(1);
      }
    })
  }

  _show_error(error_code){
    if (!error_code){
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP } 