/*
 * @Author: liuyr 
 * 招聘中页面
 * @Date: 2019-12-23 17:03:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 14:41:14
 */
<template>
  <div id="recruitDoing">    
    
    <div class="recruitContainer">

      <!-- 按钮搜索栏占行 -->
      <div class="BtnContainer">

        <!-- 搜索栏    -->
        <div class="SearchBox"> 
                 
          <div style="margin-top: 0px;">    
            <el-select @change="searchKey" v-model="value" style="width:110px;" placeholder="关键字">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>           
            <el-input placeholder="请输入关键字" style="width:200px;" class="input-with-select">             
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <!-- 职位选择筛选器 -->
        <div class="jobDropDownBox">
          <el-select @change="JobSelect" clearable v-model="job" placeholder="职位类型" >
            <el-option class="oooo"
              
              v-for="item in jobData"
              :key="item.id"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

        </div>
         
      </div>

      <!-- 数据表格信息 -->
      <div class="formContainer">
        <el-table
        ref="multipleTable"       
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
       
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column prop="title" label="招聘标题"></el-table-column>
          <el-table-column prop="contactName" label="发布人" ></el-table-column>
          <el-table-column prop="contactPhone" label="联系方式" show-overflow-tooltip></el-table-column>
          <el-table-column prop="job" label="职位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="publishTime" width=400 label="发布时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zip" label="详情" width="120">
              <template slot-scope="scope">
                  <el-button @click="toSee(scope.row)" type="text" size="small" >查看</el-button>
                </template>
          </el-table-column>
          <el-table-column    
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="toEdit(scope.row)"  type="text" size="small">编辑</el-button>
                <el-button @click="toDelete(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column>
        </el-table>

      </div>

    <!-- 招聘container -->
    </div>  

    <!-- 底部分页盒子包含批量删除按钮 -->
    <div class="PaginationBox">

      <!-- 批量删除按钮 -->
       <el-button type="danger" icon="el-icon-delete" @click="toBatchDelete"  circle></el-button>


      <!-- 分页器 -->
      <el-pagination class="PageChange" background layout="prev, pager, next"    
      :total="tableData.length" @current-change="huanye" 
      :current-page.sync="currentPage">
      </el-pagination>
    </div>

    <!-- 模态框盒子 -->
    <div class="moderBox">

      <!-- 查看模态框 -->
      <el-dialog class="toSeeBox"
        :title="toSeeTitle.title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <!-- 最外层容器 -->
        <div class="seeBoxContainer">

           <!-- 第一行 -->
          <div class="oneFlour Flour">

            <!-- 左边的招聘人数和地址 -->
            <div class="oneFlourLeft">
              <div class="zhaoren1"><i class="el-icon-document"> 需求人数：{{toSeeTitle.num}}</i> </div>
              <div class="position"><i class="el-icon-location"> {{toSeeTitle.province}} - {{toSeeTitle.city}} </i></div>
            </div>

            <!-- 右边的工资 -->
            <div  class="oneFlourRight">        
              <div class="salary"><h2>{{toSeeTitle.salary}}元/月</h2></div>
            </div>

          </div>

          <!-- 第二行 -->
          <div class="twoFlour Flour">

            <div class="tagBox">
              <el-tag type="success">{{toSeeTitle.welfare}}</el-tag>
            </div>

          </div>

          <!-- 第三行 -->
          <div class="threeFlour Flour">
            <!-- 分割线 -->
            <div class="fence">
              <hr  style="FILTER:alpha(opacity=100,finishopacity=0,style=3)" width="100%" color=#ff9900 SIZE=3 />
            </div>
          </div>

          <!-- 第四行 -->
          <div class="fourFlour Flour">
            <el-row>
              <el-col :span="24"> <b>职位：{{toSeeTitle.job}}</b> </el-col>
            </el-row>
          </div>

          <!-- 第五行 -->
          <div class="fiveFlour Flour">
            <b>职位介绍</b>
          </div>

          <!-- 第六行 -->
          <div class="sixFlour Flour">
            <div class="workingHours">
              每天工作{{toSeeTitle.workingHours}}小时
            </div>
          </div>


          <!-- 第七行 -->
          <div class="sevenFlour Flour">
            <div class="desc">
              {{toSeeTitle.description}}
            </div>
          </div>

        </div>

        <!-- 脚步按钮 -->
        <span slot="footer" class="dialog-footer">        
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 编辑模态框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" :before-close="beforeClose">
        <el-form :model="toSeeTitle" ref="ruleForm" :rules="rules">

        <el-row>
          <el-col :span="12">
            <el-form-item label="ID号" prop="title" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.id"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="职业ID" prop="job" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.job_id"></el-input>
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
              <el-input v-model="toSeeTitle.job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商家ID" prop="contactName" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.businessId"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="需要人数" prop="contactPhone" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="所在省份" prop="province" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.province"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="所在城市" prop="city" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.city"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="福利" prop="contactName" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.welfare"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="工作时间" prop="contactPhone" :label-width="formLabelWidth">
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
            <el-form-item label="状态" prop="contactName" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.status"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="审核" prop="contactPhone" :label-width="formLabelWidth">
              <el-input v-model="toSeeTitle.audit_status"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="toSeeTitle.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div>
            <el-button @click="toCancel('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="toSave('ruleForm')">确 定</el-button>
        </div>

        </el-form>

      </el-dialog>

    </div>

  </div>
</template>

<script>
import { findAllCity, findCityByProvinceId } from "@/api/city.js";
import {findAllEmployment,findEmploymentByJob,deleteEmploymentById,saveOrUpdateEmployment} from '@/api/employment-controller.js';
import config from '@/utils/config.js';

export default {
  data() {
    return { 
      provinceData:[],provinceCityData:[], //这里是模态框编辑数据使用的省份和城市选择数组，因为后台没有给相应接口
      formLabelWidth:"80px",
      search:"",
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
          value: '选项1',
          label: '招聘标题'
        }, {
          value: '选项2',
          label: '发布人'
        }, {
          value: '选项3',
          label: '联系方式'
        }, {
          value: '选项4',
          label: '职位'
        },],
      value: '',
      rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
         job: [
            { required: true, message: '请输入职业类型名称', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人', trigger: 'blur'  }
          ],
          contactPhone: [
            { required: true, message: '请输入联系方式', trigger: 'blur'  }
          ],
          description: [
            { required: true, message: '请输入内容', trigger: 'blur'  }
          ],
          
        },
    };
  },
  computed: {
    // tableList(){
    //   let temp = [...this.tableData];
    //   let pageSize=10;
    //   let page = this.currentPage;
    //   temp.slice(0,pageSize);
    //   return temp.slice((page-1)*pageSize,pageSize*page);
    // }
  },
  methods: {

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
      try {
        
        this.$delete(this.toSeeTitle,'endTime');
        this.$delete(this.toSeeTitle,'startTime');
        this.$delete(this.toSeeTitle,'publishTime');
        console.log(this.toSeeTitle);
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
            config.errorMsg(this, "修改失败");       
      }
    },

    //搜索栏
    searchKey(val){
      this.search=val;
    },

    //批量删除
     toBatchDelete() {
      //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteEmploymentById({id:id});
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this,"批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findEmp();
              });
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
    },

    //复选框切换
    handleSelectionChange(val){
      console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },

    handleClose(done) {
      done();
     
    },
       

    //删除
    toDelete(id){
      
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          try {         
            let res = await deleteEmploymentById({id});
            if(res.status===200){
              this.$message({
               type: 'success',
               message: '删除成功!'
              });
              this.findEmp();
              return true;
            }else{ this.$message({
            type: 'info',
            message: '删除失败!'
          });}

           
          } catch (error) {
            
            this.$message({
              type: 'info',
              message: '删除失败!'
            });
              console.log(error);
         }          

          this.$message({
            type: 'info',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    

    },

    //待编辑
    async JobSelect(val){
      if(val){
          try {
          let res = await findEmploymentByJob({job:val})
          
          this.tableData=res.data;
        } catch (error) {}
      }else{this.findEmp();}
      console.log(val);
      
    },

    //换页
    huanye(val){    
      this.currentPage=val;
    },

     //编辑
    toEdit(row){
      this.toSeeTitle={...row};
      this.editVisible=true;
    },


    //查看
    toSee(row){ 
      this.dialogVisible= true;
      this.toSeeTitle = row;
    },


   //查找全部
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
          var dataee=new Date(tm).toJSON();
          var realdate = new Date(+new Date(dataee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          return realdate;
        })
        
        this.tableData.publishTime=[...new Set(timeArr)];
        
        
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },

  },
  created() {
    this.findEmp();
  },
  mounted() {}
};
</script>


<style scoped>
/* 通用样式 */
#recruitDoing{
  height: 100%;  
}

.BtnContainer{
  width: 100%; 
  height: 50px;
}

.jobDropDownBox{ 
  width: 150px;
  float: left; 
}

.SearchBox{ 
  float: right;
}

.input-with-select{
  width: 340px;
}

.formContainer{
  margin-top: 20px;
  height: 470px;
}

.PageChange{
  float: right;
}


/* （模态框查看内容） */
.Flour{
  margin-bottom: 10px;
}


.oneFlour{
  height: 54px;

}

.oneFlourLeft{
  width:50%;
  float:left;

}

.oneFlourLeft>*{
  margin: 7.5px;
}

.oneFlourRight{
  text-align: center;
  color: coral;
  width:50%;
  float:right;
 
}






/* 平板样式 */



/* 手机样式 */

</style>