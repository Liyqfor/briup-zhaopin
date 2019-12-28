/***
 * @Author:Ivan
 * @Date:2019-12-25 09:39:25
 * @LastModifiedBy:Ivan
 * @Last Modified time:2019-12-25 15:11:47
 */

/*
 * @Author: liuyr 
 * 福利模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-22 19:53:09
 */
import axios from '@/utils/axios'

 /**
  * 根据id删除福利
  * @param {object} param {id:''} 
  */
 export function deleteWelfareById(id) {
  return axios.post('/Welfare/deleteById',id);
}

/* 查找所有福利信息 */
export  function findAllWelfare() {
  return axios.get('/Welfare/findAll'); 
}

//根据id查找福利
export function findByIdWelfare(id) {
  return axios.get('/Welfare/findById',{params:{id}});
}
//新增或更新福利信息
export function saveOrUpdateWelfare(infor) {
  return axios.post('/Welfare/saveOrUpdate',infor);
}


//post.('',params)