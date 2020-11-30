import { request } from '../request.js'
var app = getApp();
// 全局搜索
export function getAllSearch(params) {
  return request({
    url: `/search/v1/getAllSearch?index=MEETING_LIVE&keyWord=${params.keyWord}`,
    method: 'POST',
    header: {
      "content-type": "application/json",
      "web": "true",
      "mall": "DDH",
      "token":app.globalData.token 
    },
  })
}
// 全局搜索
// export function getAllSearch(params) {
//   return request({
//     url: `/search/v1/getAllSearch?index=MEETING_LIVE&keyWord=${params.keyWord}`,
//     method: 'POST',
//     data: params,
//     header: {
//       "content-type": "application/json",
//       "web": "true",
//       "mall": "DDH",
//       "token":app.globalData.token 
//     },
//   })
// }
//搜索历史
export function getHistory(params) {
  return request({
      url: `/userSearch/v1/miniApp/getUserSearch?page=${params.page}&size=10`,
      method: 'POST',
  })
}
//热搜词
export function getHot() {
  return request({
      url: '/userSearch/v1/miniApp/getHotSearch?page=1&size=10',
      method: 'POST',
  })
}