/*
 * @Author: liuyr 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-25 09:34:10
 */
import axios from '@/utils/axios'
/**
 * 通过id删除城市信息
 * @param {Object} param {id:''} 
 */
export function deleteCityById(param) {
  return axios.post('/City/deleteById', param);
}
/**
 * 查找所有城市信息
 */
export function findAllCity() {
  return axios.get('/City/findAll');
}
/**
 * 通过id查找城市信息
 * @param {Object} param {id:''}
 */
export function findCityById(param) {
  return axios.get('/City/findById', {
    params: param
  });
}
/**
 * 通过省份id查找城市信息
 * @param {Object} param {provinceId:''}
 */
export function findCityByProvinceId(param) {
  return axios.get('/City/findByProvinceId', {
    params: param
  });
}
/**
 * 保存或更新城市信息
 * @param {Object} param
 */
export function saveOrUpdateCity(param) {
  return axios.post('/City/saveOrUpdate', param);
}
