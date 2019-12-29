/*
 * @Author: liuyr
 * 招聘管理页面
 * @Date: 2019-12-22 16:49:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 17:19:08
 */
<template>
  <div id="recruitManage">
    
    <!-- <div class="totalTitle">招聘管理</div> -->
    <div class="cardChangeBox">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="招聘中" name="doing"></el-tab-pane>
        <el-tab-pane label="招聘完结" name="finish"></el-tab-pane>   
      </el-tabs>

    </div>

    <div class="btnBox">

      <el-button type="primary" icon="el-icon-info" size="small" >导入职位</el-button>
      <el-button  @click="toEdit" icon="el-icon-info" size="small" style="background-color:#ff6600;color:white">发布职位</el-button>
      
    </div> 


    <!-- 模态框盒子 -->
    <div class="modelbox">

      <!-- 发布模态框 -->
      <div class="releaseBox">
      <el-dialog title="发布" class="editBox" :visible.sync="editVisible" :before-close="beforeClose">
        <el-form :model="toSeeTitle" ref="ruleForm" :rules="rules">

        <el-row>
          <el-col :span="12">
            <el-form-item label="ID号" prop="id" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.id"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="职业ID" prop="jobid" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.jobId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘标题" prop="title" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.title"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="职业类型" prop="job" :label-width="formLabelWidth">
                <el-select @change="JobSelect" clearable v-model="toSeeTitle.job" placeholder="职位类型" >
            <el-option class="oooo"
              
              v-for="item in jobData"
              :key="item.id"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="businessId" :label-width="formLabelWidth">
                <el-select
                      v-model="toSeeTitle.businessId"
                      placeholder="请选择企业">
                      <el-option
                        v-for="item in AllBusiness"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                </el-select>              
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="需要人数" prop="num" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="所在省份" prop="province" :label-width="formLabelWidth">
              <!-- <el-input v-model="toSeeTitle.province"></el-input> -->
                <el-select
                      @change="dialogProChan"
                      v-model="toSeeTitle.province"
                      placeholder="请选择省份">
                      <el-option
                        v-for="item in provinceData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="所在城市" prop="city" :label-width="formLabelWidth">
                <el-select
                      @change="citychange"
                      v-model="toSeeTitle.city"
                      placeholder="请选择城市">
                      <el-option
                        v-for="item in provinceCityData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="福利" prop="welfare" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.welfare"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="每日工时" prop="workingHours" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.workingHours"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="发布人" prop="contactName" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.contactName"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="联系方式" prop="contactPhone" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.status"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="审核" prop="auditStatus" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.auditStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="月薪" prop="salary" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.salary"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <div></div>
          </el-col>
        </el-row>



        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="toSeeTitle.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">

            <el-button class="editbutton" @click="toCancel('ruleForm')">取 消</el-button>
            <el-button class="editbutton" type="primary" @click="toSave('ruleForm')">保 存</el-button>
            
          </el-col>
        </el-row>
        </el-form>

      </el-dialog>


      </div>

      <!-- 导入模态框 -->
      <div class="importBox">

      </div>

    </div>
  
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {findCityByProvinceId } from "@/api/city.js";
import {findAllEmployment,findEmploymentByJob,deleteEmploymentById,saveOrUpdateEmployment,
        findEmploymentByTitle} from '@/api/employment-controller.js';
import {findAllProvince,findProvinceById} from '@/api/province.js';
import {findBusinessById,findAllBusiness} from '@/api/business.js';

export default {
  name: "recruitManage",
  data() {
    return {
      activeName: "doing",
      provinceData:[],provinceCityData:[], //这里是模态框编辑数据使用的省份和城市选择数组，因为后台没有给相应接口
      formLabelWidth:"80px",
      businessName:"",
      AllBusiness:"",
      string:"",
      matchData:"",
      editVisible:false,  //这个是编辑模态框
      dialogVisible:false,//这个是查看模态框
      toSeeTitle:[],      //这个是查看和编辑模态框绑定的数据
      ids:[],             //这个是储存批量删除的数组，因为后台没给接口
      deleteId:"",
      pagesize:10,
      currentPage:1,//当前页
      tableData:[],
      publishTimeData:[],
      job:"",
      jobData:[],
      options: [{
          value: '招聘标题',
          label: '招聘标题'
        }, {
          value: '发布人',
          label: '发布人'
        }, {
          value: '福利',
          label: '福利'
        }, {
          value: '职位',
          label: '职位'
        },],
      key: '',
      rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
         job: [
            { required: true, message: '请输入职业类型名称', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入发布者名称', trigger: 'blur'  }
          ],
          contactPhone: [
            { required: true, message: '请输入联系方式', trigger: 'blur'  }
          ],
          description: [
            { required: true, message: '请输入内容', trigger: 'blur'  }
          ],
          province: [
          { required: true, message: "请选择省份", trigger: "change" }
          ],
          city: [{ required: true, message: "请选择城市", trigger: "change" }]
        },
    };
  },
  created() {
    this.findEmp();
    this.findProvince();
    this.findAllBus();
  },
  computed: {},
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/recruitManage/index/" + tab.name);
    },

  

    //编辑模态框省份发生改变
    async dialogProChan(val){
      
      try {
        let res = await findCityByProvinceId({provinceId:val});
        this.provinceCityData = res.data;
      
      } catch (error) {}
    },

    async citychange(val){
      console.log(val);
      this.toSeeTitle.city=val;
      console.log(this.toSeeTitle.city);
    },

    //关闭模态框:打叉
    beforeClose(){
      this.$refs["ruleForm"].resetFields();
      this.editVisible=false;
    },

    //关闭模态框:取消
    toCancel(formName){
      
      this.$refs[formName].resetFields();
      this.editVisible=false;
    },

    //编辑保存
    async toSave(formName){


  //表单验证
     this.$refs[formName].validate(async(valid) => {
          if (valid) {
                            // 将省份id转换为省份名字保存到数据库
                if(!isNaN(this.toSeeTitle.province)){
                  let provinceId = this.toSeeTitle.province;
                  let res1 = await findProvinceById({id:provinceId});
                  this.toSeeTitle.province = res1.data.name;
              
                }
              
                  try {
                    // 暂时删除时间戳，由于后端开发问题，传入时间戳会报400错误
                    this.$delete(this.toSeeTitle,'endTime');
                    this.$delete(this.toSeeTitle,'startTime');
                    this.$delete(this.toSeeTitle,'publishTime');
                    let res = await saveOrUpdateEmployment(this.toSeeTitle);
                    if (res.status === 200) {
                          this.findEmp();
                          this.editVisible = false;
                          config.successMsg(this, "修改成功");
                        } else {
                          config.errorMsg(this, "修改失败");
                        }

                  } catch (error) {
                        console.log(error);
                        config.errorMsg(this, "修改失败");}
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });


    },




    //职位类型选择器
    async JobSelect(val){
      if(val){
          try {
          let res = await findEmploymentByJob({job:val});
          
          this.tableData=res.data;
        } catch (error) {}
      }else{this.findEmp();}
      console.log(val);
      
    },



     //编辑
    async toEdit(row){
      this.toSeeTitle={row};
      this.editVisible=true;

      //传入商家信息
      let id = this.toSeeTitle.businessId;
    },


    //查看
    async toSee(){ 

      this.dialogVisible= true;
      let res = await findBusinessById({id:id});
      this.businessName=res.data.name;

    },

    //查找全部商家信息
    async findAllBus(){
      try {
        let res = await findAllBusiness();
        this.AllBusiness = res.data;
      } catch (error) {
        
      }
    },

    // 查找全部省份
    async findProvince(){
      try {
        let res = await findAllProvince();
        this.provinceData=res.data;
      } catch (error) {
        
      }
    },

   //查找全部招聘信息
    async findEmp(){
      try {

        let res = await findAllEmployment();
        this.tableData = res.data;
        

        //获取职位类型并去重
        let jobArr = res.data.map(item => {
          
          return item.job;
        });
        //去重
        this.jobData = [...new Set(jobArr)];

        //时间格式转换
          let timeArr = res.data.map(item =>{
          let tm=item.publishTime;
          item.publishTime=tm.slice(0,10);
          return item.publishTime;
        })

        
        
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },

   

  }
};
</script>

<style scoped>

/* 通用样式 */
#recruitManage{
  height:100%;
  
}

.cardChangeBox{
  float: left;
  width: 82%;
}

.btnBox{
  float:right;
  width: 18%;
  
}
.btnBox>*{
  float: right;
  margin-left:10px; 
}

.tbl-content{
  width: 100%;
  float: left;
}

</style>
