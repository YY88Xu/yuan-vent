const host = "http://127.0.0.1:8081/v1/"
const appKey = "a51b816c3bbf43e198169a7b407b0289"

const tips = {
  1: '网络错误',
  1005: 'appKey无效',
  3000: '期刊不存在'
}

function $ajax(options){
  if(!options.method){
    options.method = 'GET'
  }
  let url = host + options.url;
  return new Promise((resolve, reject)=>{
    wx.request({
      url: url,
      method: options.method,
      data: options.data,
      header: {
        'content-type': 'application/json',
        'appKey': appKey
      },
      success: (res)=>{
        if(res.statusCode==200){
          resolve(res.data);
        }else{
          _show_error(res.data.error_code);
        }
        
      },
      fail: (error)=>{
        _show_error(1);
      }
    })
  })
}

function _show_error(error_code){
  if (!error_code) {
    error_code = 1;
  }
  wx.showToast({
    title: tips[error_code],
    icon: 'none',
    duration: 2000
  })
}

export { $ajax }