/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: zhuyf
 * @Last Modified time: 2019-12-28 21:02:01
 */
<template>
  <div id="jobList">
      <!-- {{currentJober}} -->
    <!-- {{WithJobhAndEmplData}} -->
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane prop="temp" label="待联系" name="waiteConn"></el-tab-pane>
        <el-tab-pane label="已联系" name="finishConn"></el-tab-pane>
      </el-tabs>
      
    <el-table
      :data="jobList"
      style="width: 100%">
      <el-table-column
        prop="jobhunter.realname" label="求职人" width="270">
      </el-table-column>
      <el-table-column
        prop="jobhunter.telephone" label="联系方式" width="270">
      </el-table-column>
      <el-table-column
        prop="employment.job" label="求职岗位" width="270">
      </el-table-column>
       <el-table-column
         label="简历" width="270">
         <template slot-scope="scope">
        <el-button @click="toSee(scope.row)" type="text" size="small">查看简历</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="askTime" label="申请时间">
      </el-table-column>
    <!-- <el-option
      v-for="item in WithJobhAndEmplData"
      :key="item.id"
      :label="item.label"
      :value="item.value">
    </el-option> -->
    </el-table>

  </template>
      <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          layout="prev, pager, next"
          :total="WithJobhAndEmplData.length"
        ></el-pagination>
      </div>

   <el-dialog :title="currentJober.realname" :visible.sync="seeVisible" width=30%>
  <!-- {{currentJober}} -->
      <div class="seeDiv">
        <div style="margin-top:-25px">
            <el-tag size="mini">个人信息</el-tag>
          </div>
        <span>性别：</span>
        {{currentJober.gender}}
      </div>
      <div class="seeDiv">
        <span>学历：</span>
        {{currentJober.education}}
      </div>
      <div class="seeDiv">
        <span>出生日期：</span>
        {{currentJober.birth}}
      </div>
      <div class="seeDiv">
        <span>工作经验：</span>
        {{currentJober.workTime}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllWithJobhAndEmpl } from "@/api/EmploymentJobhunter.js";
import config from "@/utils/config.js";
import { findAllJobhunter } from "@/api/Jobhunter.js";

export default {
  data() {
    return {
      activeName: 'waiteConn',
      WithJobhAndEmplData:[],
      //当前查看的对象
      currentJober: {},
      //模态框显示与否
      seeVisible: false,
       //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,
    };
  },
  computed: {
    // 页数发生改变
    jobList() {
      let temp = [...this.WithJobhAndEmplData];
      let page = this.currentPage;
      let pageSize = 10;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },
   
    handleClick(tab, event) {
        // console.log(tab.name);
        this.activeName = tab.name;
        this.findAllWithJAndE();
      },
      async findAllWithJAndE() {
      try {
        let res = await findAllWithJobhAndEmpl();
        let temp;
        if(this.activeName==='waiteConn'){
          //待联系的数据
          temp= res.data.filter((item)=>{
            return item.remark=='待联系';
          });
        }
        if(this.activeName==='finishConn'){
          //已联系的数据
          temp= res.data.filter((item)=>{
            return item.remark=='已联系';
          });
        }
        // let temp= res.data.filter((item)=>{
        //     return item.remark==null;
        // });
        // console.log(temp);
        this.WithJobhAndEmplData = temp;
        this.currentPage = 1;
        this.WithJobhAndEmplData.forEach(item=>{
          item.askTime=item.askTime.slice(0,10);
        })
        console.log(WithJobhAndEmplData);
      } catch (error) {}
      
    },
    //查看
    toSee(row) {
      this.currentJober = { ...row.jobhunter };
      this.seeVisible = true;
    },
  },
  created() {
    this.findAllWithJAndE();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.seeDiv {
  border-bottom: 2px solid #ccc;
  line-height: 40px;
  font-weight: bold;
  span {
    color: #777;
  }
}
.pageDiv {
    float: right;
    margin-top: 20px;
  }
</style>