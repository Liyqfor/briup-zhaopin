/*
 * @Author: sumi
 */
import axios from '@/utils/axios'

// 用id删除招聘
export function deleteEmploymentById(param){
  return axios.post('/Employment/deleteById',param);
}

/* 查找所有招聘数据 */
export function findAllEmployment() {
  
  return axios.get('/Employment/findAll');
}

//通过城市找招聘
export function findEmploymentByCity() {
  
    return axios.get('/Employment/findByCity');
}
  

//通过id查找招聘
export function findEmploymentById(param){
  return axios.get('/Employment/findById',{params:param});
}

//通过职位查找招聘
export function findEmploymentByJob(param){
    return axios.get('/Employment/findByJob',{params:param});
}

//通过招聘标题查找招聘
export function findEmploymentByTitle(param){
    return axios.get('/Employment/findByTitle',{params:param});
}

//通过福利查找招聘
export function findEmploymentByWelfare(param){
    return axios.get('/Employment/findByWelfare',{params:param});
}


// 保存更新招聘信息
export function saveOrUpdateEmployment(param){
  return axios.post('/Employment/saveOrUpdate',param);
}



