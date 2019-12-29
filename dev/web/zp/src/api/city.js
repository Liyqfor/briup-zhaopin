/***
 * @Author:Ivan
 * @Date:2019-12-25 09:33:03
 * @LastModifiedBy:Ivan
 * @Last Modified time:2019-12-29 09:26:06
 */


/*
 * @Author: liuyr 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-22 19:53:09
 */
import axios from '@/utils/axios'

 /**
  * 根据id删除城市
  * @param {object} param {id:''} 
  */
 export function deleteCityById(id) {
  return axios.post('/City/deleteById',id);
}

/* 查找全部城市数据 */
export  function findAllCity() {
  return axios.get('/City/findAll'); 
}
//根据id查找城市
export function findByIdCity(id) {
  return axios.get('/City/findById',{params:{id}});
}
//根据省份查找城市
export function findCityByProvinceId(provinceId) {
  return axios.get('/City/findByProvinceId',{params:{provinceId}});
}
//新增或更新城市信息
export function saveOrUpdateCity(infor) {
  return axios.post('/City/saveOrUpdate',infor);
}

//post.('',params)