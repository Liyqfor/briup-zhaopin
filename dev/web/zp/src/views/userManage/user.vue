/*
 * @Author: liuyr 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: weilei
 * @Last Modified time: 2019-12-28 15:53:34
 */
<template>
  <div id="userList">
    <div class="searchDiv">
      <div class="selectbox1">
        <el-select @change="educationChange" v-model="education" placeholder="学历" style="width:200px" clearable>
          <el-option v-for="item in educationData" 
            :key="item" 
            :label="item" 
            :value="item"></el-option>
        </el-select>
        <el-select @change="genderChange" v-model="gender" placeholder="性别" style="width:100px" clearable>
          <el-option v-for="item in genderData" 
            :key="item" 
            :label="item" 
            :value="item"></el-option>
        </el-select>
      </div>
      <div class="selectbox2">
        <el-row :gutter="50">
          <el-col :span="6">
            <el-select v-model="keyword" placeholder="关键字" style="width:100px" clearable>
              <el-option label="用户名" value="1"></el-option>
              <el-option label="手机号" value="2"></el-option>
            </el-select>       
          </el-col>
          <el-col :span="12">       
            <el-autocomplete
              class="inline-input"
              v-model="telephone"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>

        <!-- <el-input placeholder="请输入内容" v-model="input" style="width:400px">
          <el-select v-model="keyword" slot="prepend" placeholder="关键字" style="width:100px" clearable>
          <el-option label="用户名" value="item"></el-option>
          <el-option label="手机号" value="item"></el-option>
          </el-select>        
          <el-button @click="toSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>      -->
      </div>
    </div>  
    
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="List"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="realname" label="姓名"></el-table-column>
        <el-table-column align="center" prop="telephone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="gender" label="性别"></el-table-column>
        <el-table-column align="center" prop="birth" label="出生年月"></el-table-column>
        <el-table-column align="center" prop="education" label="最高学历"></el-table-column>
        
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="toEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>  
    </div>
    <div class="bu_b">
      <el-button @click="toBatchDelete" type="danger" size="mini" plain>批量删除</el-button>
    </div>
    <div class="pagi">
      <el-pagination
        @current-change="CurrentChange"   
        :current-page.sync="currentPage"
        background
        layout="prev, pager, next"
        :total="userData.length">
      </el-pagination>
    </div>
    <!-- 修改模态框 -->
    <el-dialog title="修改用户信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose">
      <el-form :model="currentUser" :rules="rules" ref="ruleForm">
        {{telephoneData}}
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="currentUser.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="realname" label="姓名" :label-width="formLabelWidth">
              <el-input v-model="currentUser.realname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="telephone" label="手机号" :label-width="formLabelWidth">
              <el-input v-model="currentUser.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="出生年月" :label-width="formLabelWidth" prop="birth">
                <el-date-picker type="date" placeholder="选择出生年月" v-model="currentUser.birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
              <el-input v-model="currentUser.gender"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="education" label="学历" :label-width="formLabelWidth">
              <el-input v-model="currentUser.education"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="workTime" label="工作时间" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentUser.workTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="resume" label="简历" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentUser.resume"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findAllJobhunter,findJobhunterByEducation,findJobhunterByGender,deleteJobhunterById,saveOrUpdateJobhunter,findJobhunterByTelephone} from "@/api/user.js";
import config from "@/utils/config.js";
import { async } from 'q';
export default {
  data() {
    return {
      //学历
      education:'',
      //性别
      gender:'',
      telephone:'',
      telephoneData:[],
      // input:'',
      keyword:{},
      educationData:[],
      genderData:[],
      userData:[],
      userList:[],
      currentPage:1,
      ids: [],
      editVisible: false,
      formLabelWidth: "80px",
      //当前查看或修改的对象
      currentUser: {},
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        realname: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        telephone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        gender: [
          { required: true, message: "请输入性别", trigger: "blur" }
        ],
        education: [
          { required: true, message: "请输入学历", trigger: "blur" }
        ],
        workTime: [
          { required: true, message: "请输入工作时间", trigger: "blur" }
        ],
        resume: [
          { required: true, message: "请输入简历", trigger: "blur" }
        ],
        birth: [
          { required: true, message: "请选择出生年月", trigger: "change" }
        ],
      },

      
    };
  },
  computed: {
    List(){
      let temp = [...this.userData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize, page * pageSize);
    }
  },
  methods: {
    querySearch(queryString, cb) {
        let array = this.array;
        let results = queryString ? array.filter(this.createFilter(queryString)) : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (telephone) => {
          return (telephone.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        let temp = [...this.telephoneData];
        
        this.array = [];
        for(let i=0;i<temp.length;i++){
          this.array.push({'value':temp[i].restaurant})
        }
        return this.array;
            
      },
      handleSelect(item) {
        console.log(item);
      },
    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.editVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.editVisible = false;
    },
    //保存
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //通过验证，保存
          try {
            let res = await saveOrUpdateJobhunter(this.currentUser);
            if (res.status === 200) {
              this.findAllJob();
              this.editVisible = false;
              config.successMsg(this, "修改成功");
            } else {
              config.errorMsg(this, "修改失败");
            }
          } catch (error) {
            // console.log(error);
            config.errorMsg(this, "修改失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    CurrentChange(val){
      this.currentPage = val;
    },
    //学历发生改变
    async educationChange(val){
      this.gender = "";
      //val 是option的value值
      // console.log(val);
      if(val){
        try{
          let res = await findJobhunterByEducation({education:val});
          this.userData = res.data;
          this.currentPage = 1;
        }catch(error){
          config.errorMsg(this,'通过学历查找用户信息错误');
        }
      }else{
        this.findAllJob();
      }    
    },
    async genderChange(val){
      this.education = "";
      //val 是option的value值
      // console.log(val);
      if(val){
        try{
          let res = await findJobhunterByGender({gender:val});
          this.userData = res.data;
          this.currentPage = 1;
        }catch(error){
          config.errorMsg(this,'通过学历查找用户信息错误');
        }
      } else{
        this.findAllJob();
      }
      
    },
    //编辑
    toEdit(row){
      // alert('编辑');
      this.currentUser = { ...row };
      this.editVisible = true;
    },
    //删除
    toDelete(id){
     this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteJobhunterById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllJob();
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
                  let res = await deleteJobhunterById({ id: id });
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
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllJob();
              }, 1000);
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
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    //查找所有求职者信息
    async findAllJob(){
      try{
      let res = await findAllJobhunter();
      this.userData = res.data;
      //学历数组
      let educationArr = res.data.map(item => {
        return item.education;
      });
      this.educationData = [...new Set(educationArr)];
      //性别数组
      let genderArr = res.data.map(item => {
        return item.gender;
      });
      this.genderData = [...new Set(genderArr)];
      
      //性别数组
      let telephoneArr = res.data.map(item => {
        return item.telephone;
      });
      this.telephoneData = [...new Set(telephoneArr)];

      }catch(error){
        config.errorMsg(this, "查找错误");
      }
      
    }
  },
  created() {
    this.findAllJob();
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
<style scoped>
.selectbox1{
  margin-bottom: 10px;
  width: 400px;
  float: left;
}
.selectbox2{
  float: right;
}
.bu_b{
  float: left;
  margin-top: 10px;
  width: 60px;
}
.pagi{
    float: right;
    margin-top: 10px;

}

</style>