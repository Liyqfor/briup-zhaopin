<!--
 @Author:Ivan
 @Date:2019-12-28 15:22:00
 @LastModifiedBy:Ivan
 @Last Modified time:2019-12-28 15:22:00
-->

 @Last Modified time:2019-12-28 15:21:56
-->





<template>
  <div id="moduleCity">
    <el-button id="add" size='small' type="warning" @click="clickadd()">添加省份</el-button>

    <!-- 添加div -->
    <div v-if="outsidediv==true">
      <el-card class="box-card">
      <div slot="header" class="clearfix">

        <div class="inputset">
          <div id="addinput"><el-input class="input50px"  v-model="inputprovince" placeholder="请输入省份" id="provinceinput" size='mini'></el-input></div>
          <div class="inputset"><el-button size='mini' @click="toaddprovince()">添加</el-button></div>
        </div>
      </div>
      <!-- <div class="indiv" v-if="outsidecity==true">
          <div class="inputset" v-if="outaddstuta==true"><el-button @click="outaddCity()"  type="text" size="small">添加</el-button></div>
          <div>
            <div id="addinput" v-if="addstuta==true"><el-input v-model="inputcity"  placeholder="请输入城市" size='mini' id="cityinput"></el-input></div>
            <div class="inputset" v-if="addstuta==true"><el-button  type="primary" size='mini' @click="outsaveCity()">添加</el-button></div>
          </div>
        </div> -->
      </el-card>
    </div>
  <!-- 循环生成当前已有卡片 -->
    <div id="card" v-for="(item,index) in allprovince" :key="index">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>{{item.name}}</span>
        
        </div>
        <div  v-for="(it,ind) in item.city" :key="ind" class="text item indiv">
        {{it.name}}
        </div>
        
        <div class="indiv">
          <div class="inputset" v-if="item.outadd"><el-button @click="addCity(item)" type="text" size="small">添加</el-button></div>
          <div v-if="item.add">
            <div id="addinput"><el-input v-model="inputcity"  placeholder="请输入城市" size='mini' id="cityinput"></el-input></div>
            <div class="inputset"><el-button  type="primary" size='mini' @click="saveCity(item,item.id)">添加</el-button></div>
          </div>
        </div>
      </el-card>
      </div>
  </div>
  
</template>

<script>
// import { log } from '../../../../IntelliJ IDEA 2019.3/plugins/textmate/lib/bundles/git/src/util';
import { findAllProvince,saveOrUpdateProvince } from "@/api/province.js";
import { findCityByProvinceId,saveOrUpdateCity } from "@/api/city.js";
import config from '@/utils/config.js'
export default {
  data() {
    return {
      // 所有省份信息
      allprovince:[],
      //
      //citylist:[],
      //添加城市的输入
      inputcity:'',
      //outaddstuta:true,
      // addstuta:false,
      //添加的省份
      inputprovince:'',
      // 新添加的div，可见设置
      //新增省份输入框
      outsidediv:false,
      //判断新增省份是否重复
      provinceagain:false,
      //判断新增城市是否重复
      cityagain:false,
      //outsidecity:false,
      // dialogFormVisible:false,
      // visibleadd:true,

    };
  },
  computed: {},
  methods: {
    //获取所有省份信息
    getprovincecity(){
      findAllProvince()
      .then((res)=>{
        // console.log(res.data);
        let temp=res.data;
        // this.allprovince=temp;
        // console.log(temp);
        temp.forEach((item,index)=>{
          findCityByProvinceId(item.id).then((res)=>{
            item.city=res.data;
            item.add=false;
            item.outadd=true;
            // console.log(item);
            
          }).catch((error)=>{console.log(error);});

        });
        //setTimeout(()=>{this.allprovince=temp},2000);
        //console.log(this.allprovince);
        console.log(temp);
        setTimeout(()=>{this.allprovince=[...temp]},1000);
        
        // console.log(this.allprovince);
        
      })
      .catch((error)=>{console.log(error);});
      
    },
    //添加城市对话框显示
    addCity(item){
      item.add=true;
      item.outadd=false;
      return item;
    },
    //保存城市
    saveCity(item,id){
      item.add=false;
      item.outadd=true;

      item.city.forEach((item,index)=>{
        // console.log(item.name);
        console.log(item.name);
        if (item.name==this.inputcity) {
            this.cityagain=true;
            console.log(item.name);
            
          };
      });
      if (this.cityagain==false) {
          if(this.inputcity!=''){
          saveOrUpdateCity({provinceId:id,name:this.inputcity})
        .then((res)=>{
          this.getprovincecity();
          this.inputcity='';
          config.successMsg(this, "新增城市成功")
          this.cityagain=false;
        })
        .catch((error)=>{console.log(error);config.errorMsg(this, "新增城市失败"); this.cityagain=false;});
        }
      } else {
        config.errorMsg(this, "该城市已存在，请勿重复添加");
        this.inputcity='';
        this.cityagain=false;
      }

      
      return item;
    },
    //添加省份信息
    clickadd(){
      this.outsidediv=true;
    },
    // outaddCity(){
    //   this.outaddstuta=false;
    //   this.addstuta=true;
    // },

    // outsaveCity(){
    //   this.outaddstuta=true;
    //   this.addstuta=false;
    //   if(this.inputcity!=''){
    //     saveOrUpdateCity({provinceId:id,name:this.inputcity})
    //   .then((res)=>{
    //     this.getprovincecity();
    //     this.inputcity='';
    //   })
    //   .catch((error)=>{console.log(error);});
    //   }
    //   return item;
    // },
    //添加新增省份
    toaddprovince(){
      //console.log(this.inputprovince);
      this.allprovince.forEach((item,index)=>{
        if(item.name==this.inputprovince){
          this.provinceagain=true;
        }
      });
      if(this.inputprovince!=''){
        if (this.provinceagain==false) {
        saveOrUpdateProvince({name:this.inputprovince})
        .then((res)=>{
        console.log(res);
        config.successMsg(this, "新增省份成功")
        this.getprovincecity();
        this.inputprovince='';
        this.outsidediv=false;
        })
        .catch((error)=>{config.errorMsg(this, "新增省份失败")
        console.log(error);
        });
      }else{
        config.errorMsg(this, "该省份已存在，请勿重复添加");
        this.inputprovince='';
        this.provinceagain=false;
      }
      }else{
        config.errorMsg(this, "省份不能为空,新增省份失败");
        this.outsidediv=false;
        this.provinceagain=false;
      }

    },

  },
  created() {
    this.getprovincecity();
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
  #cityinput{
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