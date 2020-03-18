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

export const openSetting = ()=> {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
      });
  }) 
}

export const getSetting = ()=> {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
      });
  }) 
}

export const chooseAddress = ()=> {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
      });
  }) 
}

export const showModal = (params)=> {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...params,
      success: (result) => {
        resolve(result.confirm)
      },
      fail: (err) => {
        reject(err)
      }
      });
  }) 
}

export const showToast = (params)=> {
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
      });
  }) 
}
  

  