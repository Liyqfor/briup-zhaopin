/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-27 17:24:50
 */
<template>
  <div id="waiterList">
    <div class="controler">
      <el-button @click="showAddDialg" type="primary" size="mini">添加客服</el-button>
      <el-button @click="showImportDialg" type="primary" size="mini">导入客服</el-button>
    </div>
    <div class="searchDIV">
      <el-select @change="educationChange" v-model="CustomerService" clearable placeholder="在线" size="mini" >
        <el-option
          v-for="item1 in CustomerServiceByEducationData"
          :key="item1"
          :label="item1"
          :value="item1">
        </el-option>
      </el-select>
      <el-select @change="genderChange" v-model="CustomerServiceByEducation" clearable placeholder="性别" size="mini" >
        <el-option
          v-for="item2 in CustomerServiceByGenderData"
          :key="item2"
          :label="item2"
          :value="item2">
        </el-option>
      </el-select>
      <span>（当前标准为<span>15</span>人）</span>
    </div>
    {{toAddVisible}}
    <div class="tableDiv">
        <el-table
            :data="CustomerServiceData"
            tooltip-effect="dark"
            style="width: 100%">
        <el-table-column
            prop=""
            label="#"
            width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop=""
          label="分配工作"
          width="180"
          >
          <template slot-scope="scope"> <el-button @click="toSee(scope.row)" type="text" size="small">分配</el-button></template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="180">
          <template slot-scope="scope"> <el-button @click="toDelete(scope.row.id)" type="text" size="small">删除</el-button></template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 客服添加模态框 -->
    <el-dialog title="添加客服" :visible.sync="toAddVisible" :before-close="beforeClose">
      <el-form :model="toAddCustomerService" :rules="rules" ref="ruleForm">
        <el-form-item label="手机号" prop="username" >
          <el-input v-model="toAddCustomerService.username" auto-complete="off" aria-required="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="toAddCustomerService.realname" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="性别" prop="gender" >
           <el-radio-group @change="toChangeRadioGender" v-model="toAddCustomerServiceByGenderCode">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toAddCustomerServiceSave('ruleForm')">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 导入客服模态框 -->
    <el-dialog
      title="导入说明"
      :visible.sync="toImportVisible"
      width="40%"
      :before-close="handleClose">
      <el-form >
        <el-form-item label="" prop="" class="import-content">
          <p>使用导入功能时，请按照模板表格规定的字段去填写对应信息，您可以点击按钮下载模板表格，填写完后在下提交 </p>
          <el-button size="mini" >下载模板</el-button>
        </el-form-item>
        <el-form-item label="" prop="" >
          <input type="file" name="pic" id="pic" accept="image/gif,image/jpeg" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    
    <div class="footerDiv">
      <div class="foot-button">
          <el-button size="small" >自动分配</el-button>
          <el-button size="small">自动填满</el-button>
      </div>
      
      <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="CustomerServiceData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
  
</template>

<script>
import { deleteCustomerServiceById, findAllCustomerService, 
findCustomerServiceByEducation,
findCustomerServiceByGender,findCustomerServiceById,
findCustomerServiceByUsername, saveOrUpdateCustomerService } from "@/api/waiter.js";
import config from '@/utils/config.js'
import { async } from 'q';
export default {
  data() {
    return {
          // 客服
          CustomerService: "",
          //  客服数组
          CustomerServiceData:[],
          //客服id
          CustomerServiceId:"",
          //客服状态
          CustomerServiceByEducation:"",
          CustomerServiceByEducationData:[],
          //客服性别
          CustomerServiceByGender:"",
          CustomerServiceByGenderData: [],
          //客服用户名
          CustomerServiceByUsername: "",
          //添加客服的模态框默认不显示
          toAddVisible: false,
          //客服导入的模态框默认不显示
          toImportVisible: false,
          //新增客服对象 默认其所有属性都为空
          toAddCustomerService:{
            gender:"",
            realname:"",
            realname:"",
            status: "离线"
          },
          //label的0，1
          toAddCustomerServiceByGenderCode:"",
          ////校验规则
          rules: {
                gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
                realname: [{ required: true, message: "请输入你的真实名字", trigger: "blur" }],
                username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
           },
           //当前页
          currentPage: 1,
          //每页条数
          pageSize: config.pageSize,
          // pageSize: 8,
          pageSizes:[],
          
    };
  },
  computed: {
    //分页数据
    waiterList() {
      let temp = [...this.CustomerServiceData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      this.pageSizes = temp.slice((page - 1) * pageSize, page * pageSize);
      return this.pageSizes;
    }
  },
  methods: {
    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.toAddVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.toAddVisible = false;
    },
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },
    find_AllCustomerService(){
      findAllCustomerService().then((res)=>{
        this.CustomerServiceData=res.data;
        //在线情况分类
        let status= res.data.map((item)=>{
          return item.status;
        });
        this.currentPage = 1;
        this.CustomerServiceByEducationData= [...new Set(status)];
        //性别分类
        let gender= res.data.map((item)=>{
          return item.gender;
        });
        this.currentPage = 1;
        this.CustomerServiceByGenderData= [...new Set(gender)];
        config.successMsg(this,'查找成功');
      }).catch((error)=>{config.errorMsg(this, "查找错误")});
    },
    //删除客服 
    toDelete(id) {
      // alert("删除");
      this.$confirm("是否删除该客服?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteCustomerServiceById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.find_AllCustomerService();
              this.currentPage = 1;
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加客服
    showAddDialg(){
      this.toAddVisible = true;
    },
    showImportDialg(){
      this.toImportVisible = true;
    },
    toAddSave(formName){
          //  this.toAddVisible = false;
          //  console.log(this.toAddVisible);
        this.$refs[formName].validate(async valid => {
        if (valid) {
            //通过验证
            // console.log("aaaaaaaa");
            // let realname= this.toAddCustomerService.realname;
            // let username= this.toAddCustomerService.username;
            // let gender  = this.toAddCustomerService.gender;
            // if(realname ==="" || username ==="" ||username.length < 12){
            //     return false; 
            // } 
            // saveOrUpdateCustomerService()
            
            
            //保存
            try {
              let res = await saveOrUpdateCustomerService(this.toAddCustomerService);
              if (res.status === 200) {
                this.find_AllCustomerService();
                this.$refs[formName].resetFields();
                this.toAddVisible = false;
                this.currentPage = 1;
                config.successMsg(this, "添加成功");
              } else {
                config.errorMsg(this, "添加失败");
              }
            } catch (error) {
              console.log(error);
              config.errorMsg(this, "添加失败");
            }
          } else {
            console.log("error submit!!");
            return false;
          }
      });
    },
    //在添加客服的模态框的性别单选框改变时触发
    toChangeRadioGender(val){

      let that = this ;
      (val=='1')?(that.toAddCustomerService.gender ="男"):(that.toAddCustomerService.gender = "女");
      // console.log(that.toAddCustomerService.gender);
    },
    //添加客服的模态框的添加的按钮事件
    toAddCustomerServiceSave(formName){
      this.toAddVisible = true;
        this.$refs[formName].validate(async valid => {
        if (valid) {
            //通过验证
            console.log("aaaaaaaa");
            let realname= this.toAddCustomerService.realname;
            let username= this.toAddCustomerService.username;
            let gender  = this.toAddCustomerService.gender;
            // if(realname ==="" || username ==="" ||username.length < 12){
            //     return false; 
            // } 
            // saveOrUpdateCustomerService()
            
            
            //保存
            try {
              let res = await saveOrUpdateCustomerService(this.toAddCustomerService);
              if (res.status === 200) {
                this.find_AllCustomerService();
                this.$refs[formName].resetFields();
                this.editVisible = false;
                config.successMsg(this, "修改成功");
              } else {
                config.errorMsg(this, "修改失败");
              }
            } catch (error) {
              console.log(error);
              config.errorMsg(this, "修改失败");
            }
          } else {
            console.log("error submit!!");
            return false;
          }
      });
    },
    //在线情况发生改变
    async educationChange(val){
      this.CustomerServiceByEducation = "";
      if (val) {
        try {
          let res = await findCustomerServiceByEducation({ status: val });
          this.CustomerServiceData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过在线情况查找客服信息错误");
        }
      } else {
        this.find_AllCustomerService();
      }
    },
    //输入性别发生改变
    async genderChange(val){
      this.CustomerServiceByGender = "";
      if (val) {
        try {
          let res = await findCustomerServiceByGender({ gender: val });
          this.CustomerServiceData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过性别查找客服信息错误");
        }
      } else {
        this.find_AllCustomerService();
      }
    }
  },
  created() {
    this.find_AllCustomerService();
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.import-content p{
  width: 80%;
  float: left;
}.import-content el-button{
  position: relative;
  top:50%;
}
      

</style>