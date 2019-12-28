
<!--
 @Author:Ivan
 @Date:2019-12-28 15:21:43
 @LastModifiedBy:Ivan
 @Last Modified time:2019-12-28 15:21:43
-->

 @Last Modified time:2019-12-28 15:21:34
-->

<template>
  <div id="modulePosition">
    <el-button id="add" size='small' type="warning" @click="clickadd()">添加职位类型</el-button>

    <!-- 添加div -->
    <div v-if="outsidediv==true">
      <el-card class="box-card">
      <div slot="header" class="clearfix">

        <div class="inputset">
          <div id="addinput"><el-input class="input50px"  v-model="inputjobtype" placeholder="请输入职位类型" id="provinceinput" size='mini'></el-input></div>
          <div class="inputset"><el-button size='mini' @click="toaddJobType()">添加</el-button></div>
        </div>
      </div>

      </el-card>
    </div>
  <!-- 循环生成当前已有卡片{{allJobType}} -->
    <div id="card" v-for="(item,index) in allJobType" :key="index">
      
       <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>{{item.name}}</span>
        </div>
        <div v-for="(it,ind) in item.jobs" :key="ind" class="text item indiv">
        {{it}}
        </div>
        
        <div class="indiv">
          <div class="inputset" v-if="item.outadd"><el-button @click="addJob(item)" type="text" size="small">添加</el-button></div>
          <div v-if="item.add">
            <div id="addinput"><el-input v-model="inputjob"  placeholder="请输入职位" size='mini' id="jobinput"></el-input></div>
            <div class="inputset"><el-button  type="primary" size='mini' @click="saveJob(item,item.name)">添加</el-button></div>
          </div>
        </div>
      </el-card>
      </div>
  </div>
  
</template>

<script>
import {findByStatusJobs,saveOrUpdateJobs } from "@/api/job.js";
import { findAlljobType,saveOrUpdatejobType} from "@/api/job_type.js";
import config from '@/utils/config.js'
axios.defaults.baseURL="http://127.0.0.1:8899";
import axios from "axios";
// 设置基础路径
import qs from 'qs';
export default {
  data() {
    return {
      allJobType:[],
      citylist:[],
      inputjob:'',
      inputjobtype:'',
      outsidediv:false,
      jobtypeagain:false,
      jobagain:false,

    };
  },
  computed: {},
  methods: {
    //  getSt(){
    //    axios.get('/Jobs/findByStatus',{params:{staus:"互联网"}}).then((res)=>{
    //         console.log(res);
            
    //       }).catch((error)=>{console.log(error);});
    //  }
    // ,
    //获取全部职业信息
    getjobType(){
      findAlljobType()
      .then((res)=>{
        let temp=res.data;
        // console.log(temp);
        
        temp.forEach((item,index)=>{
          findByStatusJobs({staus:item.name}).then((res)=>{
            // console.log(res);
            
            // item.jobs=[...new Set(res.data)];
            
            // console.log(res.data);
            let t= res.data.map((item)=>{
              return item.name;
            })
            // console.log(t);
            // item.jobs=t;
            item.jobs=[...new Set(t)];
            item.add=false;
            item.outadd=true;

            
          }).catch((error)=>{console.log(error);});

        });
        setTimeout(()=>{
          // temp= temp.map((item)=>{
          //   
          //   return item;
          // });
          // console.log(temp);
          
          
          this.allJobType=[...temp];},1000);
        
      })
      .catch((error)=>{console.log(error);});
      
    },
    //显示添加职业框
    addJob(item){
      item.add=true;
      item.outadd=false;
      return item;
    },
    //新增职业
    saveJob(item,inf){
      item.add=false;
      item.outadd=true;
      // console.log(item);
       item.jobs.forEach((item,index)=>{
        //  console.log(item.name);
        // console.log(item.name);
        console.log(item);
        if (item==this.inputjob) {
            this.jobagain=true;
            console.log(item);
            
          };
      });
      if(this.inputjob!=''){
        if(this.jobagain==false){
          saveOrUpdateJobs({name:this.inputjob,status:inf})
          .then((res)=>{
            this.getjobType();
            this.inputjob='';
            config.successMsg(this, "新增职位成功")
          })
          .catch((error)=>{console.log(error);
        this.jobagain=false;
        this.inputjob='';});
        }else{
          config.errorMsg(this, "请勿重复添加职位");
          this.jobagain=false;
          this.inputjob='';
        }
      }else{
        config.errorMsg(this, "职业类别不能为空,新增职业类别失败");
        this.jobagain=false;
        this.inputjob='';
      }
      return item;
    },
    //显示添加职位类型框
    clickadd(){
      this.outsidediv=true;
    },
    // outsaveJob(){
    //   this.outaddstuta=true;
    //   this.addstuta=false;
    //   if(this.inputcity!=''){
    //     saveOrUpdateCity({provinceId:id,name:this.inputcity})
    //   .then((res)=>{
    //     this.getjobType();
    //     this.inputcity='';
    //   })
    //   .catch((error)=>{console.log(error);});
    //   }
    //   return item;
    // },
    //添加新增职业类别
    toaddJobType(){
      //console.log(this.inputjobtype);
      this.allJobType.forEach((item,index)=>{
        if(item.name==this.inputjobtype){
          this.jobtypeagain=true;
        }
      });

      if(this.inputjobtype!=''){
        if(!this.jobtypeagain){
          saveOrUpdatejobType({name:this.inputjobtype})
        .then((res)=>{
          console.log(res);
          config.successMsg(this, "新增职业类别成功")
          this.getjobType();
          this.inputjobtype='';
          this.outsidediv=false;
        })
        .catch((error)=>{config.errorMsg(this, "新增错误")
        console.log(error);
        });
        }else{
          config.errorMsg(this, "该行业已存在，请勿重复添加");
          this.inputjobtype='';
           this.jobtypeagain=false;
        }
      }else{
        config.errorMsg(this, "职业类别不能为空,新增职业类别失败");
        this.outsidediv=false;
      }

      

    },
    

  },
  created() {
    this.getjobType();
    // this.getSt();
  },
  mounted() {}
};
</script>
<style scoped>
   .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
    margin: 25px 80px;
  }

  #add{
    position: relative;
    left: 1000px;
    
  }
  .indiv{
    display: inline-block;
    margin: 15px;

  }
  #jobinput{
    width: 50px;
  }
  .inputset{
    display: inline-block;
  }
  #addinput{
    
    display: inline-block;
  }
  /* #provinceinput{
    display: inline-block;
    width: 50px;
  } */

  /* #id{
    div{
      p{

      }
    }
  } */
</style>