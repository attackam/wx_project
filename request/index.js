let requestCount = 0;
export const request = (params) => {

  requestCount++;

  wx.showLoading({
    title: '加载中',
    mask: true,
  });

  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
  return new Promise((resolve,reject)=> {
    wx.request({
      ...params,
      url:baseUrl + params.url,
      success: (result) => {
        if(result.data.meta && result.data.meta.status===200) {
          resolve(result.data.message)
        } else {
          reject(err)
        }
        
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        requestCount--;
        requestCount === 0 && wx.hideLoading();
      }
    });
  })
}