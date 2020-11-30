import { request } from '../request.js'
var app = getApp();
//新闻快讯
export function getNews(data) {
  let {page,size,params}= data;
  return request({
      url: `/newsReport/v1/miniApp/getNewReportList?page=${page}&size=${size}`,
      method: 'POST',
      data:params,
      header:{
        "Content-Type": "application/json",
        "web": "true",
        "mall": "DDH",
        "token":app.globalData.token 
    },
  })
}
//查找详情
export function getNewsDetail(params) {
  return request({
      url: '/newsReport/v1/selectOne',
      method: 'POST',
      data:params
  })
}
