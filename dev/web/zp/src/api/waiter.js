import axios from '@/utils/axios';
 /**
  * 根据id删除客服
  * @param {object} param {id:''} 
  */
 export function deleteCustomerServiceById(id) {
    return axios.post('/CustomerService/deleteById',id);
  }
  /**
 * 查找所有客服信息
 */
export  function findAllCustomerService() {
    return axios.get('/CustomerService/findAll'); 
  }
/**
 * 通过状态查找客服（在线/离线）
 */
export  function findCustomerServiceByEducation(status) {
    return axios.get('/CustomerService/findByEducation',{params:status}); 
}
/**
 * 通过性别查找客服（男/女）
 */
export  function findCustomerServiceByGender(gender) {
    return axios.get('CustomerService/findByGender',{params:gender}); 
}
/**
 * 通过id查找客服
 */
export  function findCustomerServiceById(id) {
    return axios.get('CustomerService/findById',{params:id}); 
}
/**
 * 通过用户名查找客服
 */
export  function findCustomerServiceByUsername(username) {
    return axios.get('/CustomerService/findByUsername',{params:username}); 
}
  
//添加或修改客服信息
export function saveOrUpdateCustomerService(infor) {
    return axios.post('/CustomerService/saveOrUpdate',infor);
  }  
  