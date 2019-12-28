/***
 * @Author:Ivan
 * @Date:2019-12-25 09:39:25
 * @LastModifiedBy:Ivan
 * @Last Modified time:2019-12-25 20:31:55
 */

/*
 * @Author: liuyr 
 * 职位类型模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-22 19:53:09
 */
import axios from '@/utils/axios'

 /**
  * 根据id删除职位类型
  * @param {object} param {id:''} 
  */
 export function deletejobTypeById(id) {
  return axios.post('/JobType/deleteById',id);
}

/* 查找所有职位类型信息 */
export  function findAlljobType() {
  return axios.get('/JobType/findAll'); 
}

//根据id查找职位类型
export function findByIdjobType(id) {
  return axios.get('/JobType/findById',{params:{id}});
}
//新增或更新职位类型信息
export function saveOrUpdatejobType(infor) {
  return axios.post('/JobType/saveOrUpdate',infor);
}


//post.('',params)