import { request } from '../request.js'
var app = getApp();
//景区导览
export function getList(data) {
  let {page,size,params}= data;
  return request({
      url: `/scenicSpot/v1/queryObservationPoint?page=${page}&size=${size}`,
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
//景区详情
export function getDetail(params) {
  return request({
      url: '/scenicSpot/v1/selectOne',
      method: 'POST',
      data:params  
  })
}

export function getScenicDetail(params) {
	return request({
		url: '/scenicSpot/v1/selectOne',
		method: 'POST',
		data:params
	})
}
export function getScenicFacilities(params) {
	return request({
		url: '/scenicFacilities/v1/miniApp/selectByScenicIdAndType',
		method: 'POST',
		data:params
	})
}

// 720全景
export function getAllGuide(data) {
  let {page,size,params}= data;
	return request({
		url: `/scenicSpot/v1/queryPanoramicMap?page=${page}&size=${size}&type=CULTURAL_TOURISM`,
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