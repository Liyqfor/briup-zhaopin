/***
 * @Author:Ivan
 * @Date:2019-12-25 09:39:25
 * @LastModifiedBy:Ivan
 * @Last Modified time:2019-12-25 18:57:53
 */

/*
 * @Author: liuyr 
 * 职位模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-22 19:53:09
 */
import axios from '@/utils/axios'

 /**
  * 根据id删除职位
  * @param {object} param {id:''} 
  */
 export function deleteJobsById(id) {
  return axios.post('/Jobs/deleteById',id);
}

/* 查找所有职位信息 */
export  function findAllJobs() {
  return axios.get('/Jobs/findAll'); 
}

//根据id查找职位
export function findByIdJobs(id) {
  return axios.get('/Jobs/findById',{params:{id}});
}

//根据状态查找职位
export function findByStatusJobs(staus) {
    return axios.get('/Jobs/findByStatus',{params:staus});
  }

//新增或更新职位信息
export function saveOrUpdateJobs(infor) {
  return axios.post('/Jobs/saveOrUpdate',infor);
}


//post.('',params)