/*
 * @Author: liuyr 
 * 招聘审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liyq
 * @Last Modified time: 2019-12-28 14:39:39
 */
<template>
  <div id="recruitCheck">
     <!-- 下拉框 -->
      <!-- {{jobData}} -->
       <div class="selectDiv">
          <el-select @change="jobTyleData" v-model="recruit" clearable placeholder="职位类型">
            <el-option
              v-for="item in jobData"
              :key="item"
              :label="item"
              :value="item">
             
            </el-option>
          </el-select>
      </div>
      <div class="Key-s">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input4" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="关键字">
                <el-option label="餐厅名" value="1"></el-option>
               
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
      </div>
      <!-- 表格 -->
      <el-table
    ref="multipleTable"
    :data="recruitDatareList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="title"
      label="招聘标题"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="contactName"
      label="发布人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="contactPhone"
      label="联系方式"
      >
    </el-table-column>
     <el-table-column
      prop="job"
      label="职位"
      >
    </el-table-column>
     <el-table-column
      prop="publishTime"
      label="发布时间"
      >
    </el-table-column>
     <el-table-column
      
      label="详细信息"
      >
       <template slot-scope="scope">
         <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
       </template>
    </el-table-column>
     <el-table-column
      prop="status"
      label="状态"
      >
    </el-table-column>
  </el-table>
  <div class="footerDiv">
  <div class="btnDiv">
        <el-button @click="toBatchPass" size="mini" type="danger" plain>批量删除</el-button>
    </div >
         <div class="pageDiv">
            <el-pagination
              :page-size="pageSize"
              :current-page.sync="currentPage"
              background
              @current-change="pageChange"
              layout="prev, pager, next"
              :total="recruitData.length"
            ></el-pagination>
          </div>
      </div>
  </div>
</template>

<script>
import{
  findAllEmployment,
  findEmploymentByJob,
  deleteByIdEmployment,
  } 
  from "@/api/employment-controller.js";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      // 招聘信息审核
      recruitData:[],
      recruit:[],
      jobData:[],
      multipleSelection: [],
      input4:'',
      select:[],
      pageSize:config.pageSize,
      currentPage:1,
      ids:[],
     
      
    };
  },
  computed: {
    //分页数据
   recruitDatareList() {
      let temp = [...this.recruitData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  
  },
  methods: {
    // 批量删除
    toBatchPass(val){
      

    },
    // 通过jobType筛选数据
    async jobTyleData(val){
      if (val) {
        try {
          let res = await findEmploymentByJob({ job : val });
          this.recruitData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
          // console.log(error);
        }
      } else {
        this.findAllEmp();
      }
    },
    // 翻页
    pageChange(page) {
      this.currentPage = page;
    },

      // 获取招聘信息对象
     async findAllEmp(){
        try {
            let res=await findAllEmployment();
            this.recruitData=res.data;
            let jobDataArr=res.data.map(item=>{
              return item.job;
            })
            this.jobData=[...new Set(jobDataArr)];
        } catch (error) {
          config.errorMsg(this,"获取招聘信息失败");
        }
      },

       toSee(row){
        this.currentBus = { ...row };
        this.seeVisible = true;
      },
      toEdit(){
        alert(1);

      },
      toDelete(row){
        this.dialogVisible=true;

      },

      selectionChange(val) {
        console.log(val);
           let ids = val.map(item => {
              return item.id;
            });
            this.ids = ids;
      },


  },
  created() {
    this.findAllEmp();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.Key-s{
  float: right;
  width: 300px;
  .el-select{
    width: 100px;
  }
}
.selectDiv{
  float: left;
}
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
}
</style>