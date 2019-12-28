/***
 * @Author:Ivan
 * @Date:2019-12-25 09:39:25
 * @LastModifiedBy:Ivan
 * @Last Modified time:2019-12-28 09:59:02
 */

/*
 * @Author: liuyr 
 * 客服模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-22 19:53:09
 */
import axios from '@/utils/axios'

 /**
  * 根据id删除客服
  * @param {object} param {id:''} 
  */
 export function deleteCustomerServiceById(id) {
  return axios.post('/CustomerService/deleteById',id);
}

/* 查找所有客服信息 */
export  function findAllCustomerService() {
  return axios.get('/CustomerService/findAll'); 
}
//根据教育状态查找客服
export function findByEducationCustomerService(status) {
    return axios.get('/CustomerService/findByEducation',{params:{status}});
}
//根据性别查找客服
export function findByGenderCustomerService(gender) {
    return axios.get('/CustomerService/findByGender',{params:{gender}});
}

//根据id查找客服
export function findByIdCustomerService(id) {
  return axios.get('/CustomerService/findById',{params:{id}});
}
//根据用户名查找客服
export function findByUsernameCustomerService(username) {
    return axios.get('/CustomerService/findByUsername',{params:{username}});
  }
//新增或更新客服信息
export function saveOrUpdateCustomerService(infor) {
  return axios.post('/CustomerService/saveOrUpdate',infor);
}


//post.('',params)