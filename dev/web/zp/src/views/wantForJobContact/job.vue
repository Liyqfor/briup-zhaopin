/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: zhuyf
 * @Last Modified time: 2019-12-27 09:30:43
 */
<template>
  <div id="jobList">
      <!-- {{currentJober}} -->
    <!-- {{WithJobhAndEmplData}} -->
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待联系" name="first"></el-tab-pane>
    <el-tab-pane label="已联系" name="second"></el-tab-pane>
  </el-tabs>
    <el-table
      :data="WithJobhAndEmplData"
      style="width: 100%">
      <el-table-column
        prop="jobhunter.realname" label="求职人" width="180">
      </el-table-column>
      <el-table-column
        prop="jobhunter.telephone" label="联系方式" width="180">
      </el-table-column>
      <el-table-column
        prop="employment.job" label="求职岗位" width="180">
      </el-table-column>
      <el-table-column
         label="简历" width="180">
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
   <el-dialog :title="WithJobhAndEmplData.realname" :visible.sync="seeVisible">
      <div class="seeDiv">
        <span>性别：</span>
        {{WithJobhAndEmplData.gender}}
      </div>
      <div class="seeDiv">
        <span>学历：</span>
        {{WithJobhAndEmplData.education}}
      </div>
      <div class="seeDiv">
        <span>出生日期：</span>
        {{WithJobhAndEmplData.birth}}
      </div>
      <div class="seeDiv">
        <span>工作经验：</span>
        {{WithJobhAndEmplData.workTime}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllWithJobhAndEmpl } from "@/api/EmploymentJobhunter.js";
import { findAllJobhunter } from "@/api/Jobhunter.js";

export default {
  data() {
    return {
      activeName: 'first',
      // tableData: [{
      //       username: '朱喻峰',
      //       telephone:"123456789",
      //       job:"Boss",
      //       resume:'一张白纸',
      //       askTime:'2019-12-24'
      //     }], 
  
      // username:"",
      // telephone:"",
      // job:"",
      // resume:"",
      // askTime:"",
      // usernameData: [],
      // telephoneData: [],
      // jobData: [],
      // resumeData: [],
      // askTimeData: [],
      WithJobhAndEmplData:[],
      //当前查看的对象
      currentJober: {},
      //模态框显示与否
      seeVisible: false
    };
  },
  computed: {},
  methods: {
    handleClick(tab, event) {

        console.log(tab, event);
        
      },
      async findAllWithJAndE() {
      try {
        let res = await findAllWithJobhAndEmpl();
        this.WithJobhAndEmplData = res.data;
        console.log(WithJobhAndEmplData);
      } catch (error) {

      }
    },
    //查看
    toSee(row) {
      this.WithJobhAndEmplData = { ...row.jobhunter };
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
</style>