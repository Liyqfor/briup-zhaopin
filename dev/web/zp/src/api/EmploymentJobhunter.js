/*
 * @Author: zhuyf 
 * @Date: 2019-12-25 09:36:32 
 * @Last Modified by:   zhuyf 
 * @Last Modified time: 2019-12-25 09:36:32 
 */
import axios from '@/utils/axios'
/* 对求职者信息数据进行相关操作 */
export  function deleteById(param) {
  return axios.post('/EmploymentJobhunter/deleteById'),
  ({params:param});
}
export  function findAll() {
  return axios.get('/EmploymentJobhunter/findAll');

}
export  function findById(param) {
  return axios.get('/EmploymentJobhunter/findById'),
  ({params:param});
}
export  function findAllWithJobhAndEmpl() {
  return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl');
}
export  function saveOrUpdate(param) {
  return axios.post('/EmploymentJobhunter/saveOrUpdate'),
  ({params:param});
}
