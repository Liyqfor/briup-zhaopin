/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 17:34:03
 */
<template>
  <div id="waiterList">
    <div class="controler">
      <el-button @click="showAddDialg" style="background:rgb(238,121,66); color:#fff;" icon="el-icon-info" size="mini">添加客服</el-button>
      <el-button @click="showImportDialg" type="primary" icon="el-icon-info" size="mini" >导入客服</el-button>
    </div>
    <div class="searchDIV">
      <div class="left-searchDIV">
            <el-select @change="educationChange" v-model="CustomerService" clearable placeholder="全部"  >
              <el-option
                v-for="item1 in CustomerServiceByEducationData"
                :key="item1"
                :label="item1"
                :value="item1">
              </el-option>
            </el-select>
            <el-select @change="genderChange" v-model="CustomerServiceByEducation" clearable placeholder="性别"  >
              <el-option
                v-for="item2 in CustomerServiceByGenderData"
                :key="item2"
                :label="item2"
                :value="item2">
              </el-option>
            </el-select>
            <!-- <span>（当前标准为 <span style="">15</span> 人）</span> -->
      </div>
      <div class="right-searchDIV">
          <el-input placeholder="请输入内容" v-model="sercherBoxInput" @keyup.enter="toSercherCustomerService" clearable  class="input-with-select">
            <el-select v-model="sercherSelectInput"  slot="prepend" placeholder="关键字" style="width:7vw">
              <!-- <el-option label="id" value="111"></el-option> -->
              <el-option label="用户名" value="222"></el-option>
            </el-select>
            <el-button slot="append" @click="toSercherCustomerService" icon="el-icon-search"></el-button>
          </el-input>

      </div>
    </div>

    <div class="tableDiv">
        <el-table
            :data="waiterList"
            tooltip-effect="dark"
            style="width: 100%">
        <el-table-column
            prop=""
            label="#"
            type="selection"
            width="150">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          >
        </el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          prop=""
          label="分配工作"
         
          >
          <template slot-scope="scope"> <el-button @click="toShowDistribute(scope.row)" icon="el-icon-edit" type="text" size="small">分配</el-button></template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
         >
          <template slot-scope="scope"> <el-button @click="toDelete(scope.row.id)" icon="el-icon-delete" type="text" size="small">删除</el-button></template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 客服添加模态框 -->
    <el-dialog title="添加客服" :visible.sync="toAddVisible" :before-close="beforeClose" width="40%">
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
        <el-button type="primary" @click="toAddCustomerServiceSave('ruleForm')" style="width :200px">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 导入客服模态框 -->
    <el-dialog
      title="导入说明"
      :visible.sync="toImportVisible"
      width="40%"
      >
      <el-form >
        <el-form-item label="" prop="" class="import-content">
          <p style="margin-top:0;">使用导入功能时，请按照模板表格规定的字段去填写对应信息，您可以点击按钮下载模板表格，填写完后在下提交 </p>
          <el-button size="mini" style="background: #555; color: #fff;" >下载模板</el-button>
        </el-form-item>
        <el-form-item label="" prop="" >
          <div style="display:flex; justify-content: center;">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
          </div>
              
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button @click="toImportSave" type="primary" style="width :200px" >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 客服分配模态框 -->
    <el-dialog title="工作分配" :visible.sync="toDistributeVisible">
      <div class="toImportHead">
        <!-- <el-checkbox-group v-model="DistributeSelection">
          <el-checkbox label="升序"></el-checkbox>
          <el-checkbox label="降序"></el-checkbox>
          <el-checkbox label="到期标记"></el-checkbox>
        </el-checkbox-group> -->
      <div class="left">

        </div>
        <div class="right">
          <el-button type="info" size="mini" @click="showExpect" style="background: #555; color:#FFF;">自动分配</el-button>
          
          <el-button type="info" size="mini" @click="showExpect" style="background: #555; color:#FFF;">自动填满</el-button>
        </div>
        
      </div>
      <el-table
          :data="applicantList"
           tooltip-effect="dark"
          
           style="width: 100%; margin-top:10px;">
        <el-table-column property="" label="#" type="selection" width="55"></el-table-column>
        <el-table-column property="name" label="求职者" width="80" align="center" header-align="center"></el-table-column>
        <el-table-column property="phoneNum" label="联系方式"  align="center" header-align="center"></el-table-column>
        <el-table-column property="huntingPositions" label="求职岗位" align="center" header-align="center"></el-table-column>
        <el-table-column property="dealCustomerServicerealName" label="经手人" align="center" header-align="center"></el-table-column>
        <el-table-column property="applicationTime" label="申请时间" sortable align="center" header-align="center"></el-table-column>
      </el-table>
      <div style="display: flex;justify-content: space-between; margin-top:5px">
        <div >
          <el-button type="info" size="mini" @click="showExpect" style="background: #409EFF; color:#FFF; border:0;">自动分配</el-button>
          <el-button type="info" size="mini" @click="showExpect" style="background: #409EFF; color:#FFF; border:0;">自动填满</el-button>
        </div>
        <el-pagination
          :page-size="pageSize"

          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="applicant.length" 
        ></el-pagination>
      </div>
      

    </el-dialog>
    <div class="footerDiv">
      <div class="foot-button">

          <el-button type="info" size="mini" @click="showExpect" style="background: #409EFF; color:#FFF; border:0;" >自动分配</el-button>
          <el-button type="info" size="mini" @click="showExpect" style="background: #409EFF; color:#FFF;  border:0;">自动填满</el-button>
      </div>
      
      <div class="pageDiv">
        <el-pagination
          :page-size="5"

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
          CustomerService:"",
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
          CustomerServiceByUsername:"",
          //添加客服的模态框默认不显示
          toAddVisible: false,
          //客服导入的模态框默认不显示
          toImportVisible: false,
          toDistributeVisible: false,
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
          //按类别选择分类查找客服的搜索框的键入值
          sercherBoxInput:"",
          //搜索栏的下拉框所选择的值
          sercherSelectInput:"",
           //当前页
          currentPage: 1,
          //每页条数
          pageSize: config.pageSize,
          //求职人
          applicant:[
            {
              name: "黄茂扬",
              phoneNum: "15862638131",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/05/16",
            },
            {
              name: "茂扬",
              phoneNum: "15862638131",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/05/21",
            },
            {
              name: "黄茂扬",
              phoneNum: "15862638131",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/05/20",
            },
            {
              name: "黄扬",
              phoneNum: "15862638131",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/05/29",
            },
            {
              name: "扬",
              phoneNum: "15862638131",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/05/23",
            },
            {
              name: "李伟",
              phoneNum: "18812344321",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/03/22",
            },
            {
              name: "郝鸽鸽",
              phoneNum: "18812348758",
              huntingPositions: "190/天上一休一连锁超市急招营业员",
              dealCustomerServicerealName: "张三",
              applicationTime: "2019/07/23",
            },
          ],
          //分配模态框里面的升序降序
          DistributeSelection:[],
          DistributeSelectionDaoqi:"",
          
    };
  },
  computed: {
    //分页数据
    waiterList() {
      let temp = [...this.CustomerServiceData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);

    },
    applicantList(){
      let temp = [...this.applicant];
      // alert(temp.lenght)
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    //官方自带的表格排序算法
    formatter(row, column) {
        return row.address;
      },
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
    //分配客服工作
    toShowDistribute(id){
      this.toDistributeVisible =true;
    },
    //添加客服模态框
    showAddDialg(){
      this.toAddVisible = true;
    },
    showImportDialg(){
      this.toImportVisible = true;
    },
    toImportSave(){

      this.toImportVisible = false;
    },
    //在添加客服的模态框的性别单选框改变时触发
    toChangeRadioGender(val){

      let that = this ;
      (val=='1')?(that.toAddCustomerService.gender ="男"):(that.toAddCustomerService.gender = "女");
      // console.log(that.toAddCustomerService.gender);
    },
    //右上角select选择器的状态选择+输入的处理
    toSercherCustomerService(){
      let that = this;
       // 111代表id，222代表用户名
      //  ( that.sercherSelectInput == "111") ?that.find_CustomerServiceById():
       (that.sercherSelectInput == "222") ?that.find_CustomerServiceByUsername()
       :config.errorMsg(this, "请选择查询类别"); 
    },
    //通过id获取客服
    
    async find_CustomerServiceById(){
      let that = this;
      try {
        let res = await findCustomerServiceById({id:that.sercherBoxInput});
        that.CustomerServiceData = [res.data];
        that.currentPage = 1;

      } catch (error) {
        
        config.errorMsg(that, "查找错误");
      }
    },
    //通过用户名获取客服
    async find_CustomerServiceByUsername(){
      let that = this;
      try {
        let res = await findCustomerServiceByUsername({username:that.sercherBoxInput});
        that.CustomerServiceData = res.data;
        that.currentPage = 1;

      } catch (error) {
        config.errorMsg(that, "查找错误");
      }
    },
    //通过真实名字获取客服

    //添加客服的模态框的添加的按钮事件
    toAddCustomerServiceSave(formName){
      this.toAddVisible = true;
        this.$refs[formName].validate(async valid => {
        if (valid) {
            //通过验证

            //保存
            try {
              let res = await saveOrUpdateCustomerService(this.toAddCustomerService);
              if (res.status === 200) {
                this.find_AllCustomerService();
                this.$refs[formName].resetFields();
                this.toAddVisible = false;
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
    },
    showExpect(){
      this.$notify.info({
          title: '消息',
          message: '该功能正在测试，请期待下一版本'
        });
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
.controler{
  position: absolute;
  top: 1%;
  right: 2%;
}
.searchDIV{
  display: flex;
  justify-content: space-between;
}
.tableDiv{
  margin-top: 1%;
  /* width: 90%; */
}
.footerDiv{
  margin-top: 20px;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between
}
.right-searchDIV{
  width: 23%;
}
.import-content p{
  width: 80%;
  float: left;
}
.toImportHead{
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between
}
.dialog-footer{
  position: relative;
  left: -32%;

}
.up-load-file{
  position: relative;
  left: -38%;
}    

</style>