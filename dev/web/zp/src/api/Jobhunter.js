/*
 * @Author: zhuyf 
 * 求职者API
 * @Date: 2019-12-25 09:04:16 
 * @Last Modified by:   zhuyf 
 * @Last Modified time: 2019-12-25 09:04:16 
 */
import axios from '@/utils/axios';
export function a(param){}
/*查找求职者信息*/
export  function findAllJobhunter() {
    return axios.get('/Jobhunter/findAll');
}
/*通过学位查找求职者信息*/
export  function findByEducation(param) {
    return axios.get('/Jobhunter/findByEducation',
    {params:param});
}
/*通过性别查找求职者信息*/
export  function findByGender(param) {
    return axios.get('/Jobhunter/findByGender',
    {params:param});
}
/*通过id查找求职者信息*/
export  function findById(param) {
    return axios.get('/Jobhunter/findById',
    {params:param});
}
/*通过联系方式查找求职者信息*/
export  function findByTelephone(param) {
    return axios.get('/Jobhunter/findByTelephone',
    {params:param});
}
/*通过姓名查找求职者信息*/
export  function findByUsername(param) {
    return axios.get('/Jobhunter/findByUsername',
    {params:param});
}

