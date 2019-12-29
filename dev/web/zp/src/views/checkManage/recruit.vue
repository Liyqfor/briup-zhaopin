/*
 * @Author: liuyr 
 * 招聘审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liyq
 * @Last Modified time: 2019-12-29 20:40:02
 */
<template>
  <div id="recruitCheck">
     <!-- 下拉框 -->
      <!-- {{jobData}} -->
        <!-- {{recruit}} -->
       <div class="selectDiv" >
          <el-select @change="jobTyleData" size="mini" v-model="recruit" clearable placeholder="职位类型">
            <el-option
              v-for="item in jobData"
              :key="item"
              :label="item"
              :value="item">
             
            </el-option>
          </el-select>
      </div>
      <div class="Key-s">
          <div style="">
            <el-input @change="inputChange" size="mini" placeholder="请输入内容" v-model="searchKeyword" class="input-with-select">
              <el-select   @change="optionChange" v-model="searchType" slot="prepend" placeholder="关键字">
                   <el-option label="招聘标题" value="1"></el-option>
                   <el-option label="职位名称" value="2"></el-option>
               
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchForEmploy" ></el-button>
            </el-input>
          </div>
      </div>
      <!-- 表格 -->
      <el-table
      class="tableCss"
    ref="multipleTable"
    :data="recruitDatareList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column
      type="selection"
      >
    </el-table-column>
    <el-table-column
      prop="title"
      label="招聘标题"
      >
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="contactName"
      label="发布人"
      >
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
     
      label="状态"
      >
       <template  slot-scope="scope">
              <div v-if="scope.row.auditStatus==='待审核'">
                    <el-button  class="tonguo " type="text" @click="toEdit(scope.row)" size="small" >通过</el-button>
                    <el-button class="jujue " type="text" size="small" @click="toDelete(scope.row)">拒绝</el-button>
              </div>
              <div v-if="scope.row.auditStatus==='审核通过'">
                    <span class="tg_span">审核通过</span>
              </div>
               <div v-if="scope.row.auditStatus==='审核未通过' ">
                    <span  class="jj_span">已拒绝</span>
              </div>
             
            </template>
    </el-table-column>
  </el-table>
  <div class="footerDiv">
  <div class="btnDiv">
        <el-button @click="toBatchPass" size="mini" type="danger" plain>一键通过</el-button>
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
      <el-dialog
    title="请填写拒绝理由"
     
    :visible.sync="dialogVisible"
     width="30%"
    >
      <!-- <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
        
      </el-input> -->   
      <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="拒绝理由:">
        <el-input type="textarea"
        
        style="width:425px"
        :rows="5"
        :col="3" ></el-input>
          </el-form-item>
      </el-form>
      <!-- {{textarea}} -->
      <div class="footer_jj">
        <span slot="footer" class="dialog-footer" >
          <el-button @click="dialogVisible=false" >取 消</el-button>
          <el-button type="primary" @click="dialogtoqd">确 定</el-button>
        </span>
      </div>
  </el-dialog>

   <el-dialog class="toSeeBox"
        :title="list.title"
        :visible.sync="seeVisible"
        width="30%"
        >

        <!-- 最外层容器 -->
        <div class="seeBoxContainer">

           <!-- 第一行 -->
          <div class="oneFlour Flour">

            <!-- 左边的招聘人数和地址 -->
            <div class="oneFlourLeft">
              <div class="zhaoren1"><i class="el-icon-document"> 需求人数：{{list.num}}</i> </div>
              <div class="position"><i class="el-icon-location"> {{list.province}} - {{list.city}} </i></div>
            </div>

            <!-- 右边的工资 -->
            <div  class="oneFlourRight">        
              <div class="salary"><h2>{{list.salary}}元/月</h2></div>
            </div>

          </div>

          <!-- 第二行 -->
          <div class="twoFlour Flour">

            <div class="tagBox">
              <el-tag 
              :key="tag"
              v-for="tag in welfareData"
              type="success">{{tag}}</el-tag>
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
          <div class="fourFlour Flour" style="margin-top:10px">
            <el-row>
              <el-col :span="24"> <b>职位：{{list.job}}</b> </el-col>
            </el-row>
          </div>

          <!-- 第五行 -->
          <div class="fiveFlour Flour" style="margin-top:10px">
            <b>职位介绍</b>
          </div>

          <!-- 第六行 -->
          <div class="sixFlour Flour" style="margin-top:5px">
            <div class="workingHours">
              每天工作{{list.workingHours}}小时
            </div>
          </div>


          <!-- 第七行 -->
          <div class="sevenFlour Flour">
            <div class="desc">
              {{list.description}}
            </div>
          </div>

        </div>

        <!-- 脚步按钮 -->
        <span slot="footer" class="dialog-footer">        
          <el-button type="primary" @click="seeVisible = false">关闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import{
  findAllEmployment,
  findEmploymentByJob,
  deleteByIdEmployment,
  findEmploymentByTitle,
  saveOrUpdateEmployment,
  findEmploymentById,
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
      searchKeyword:'',
      select:[],
      pageSize:config.pageSize,
      currentPage:1,
      ids:[],
      auditStatus:[],
      searchType:'',
      employmentTitleData:[],
      dialogVisible:false,
      seeVisible:false,
      list:{},
      textarea:'',
      welfareData:[],


      
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
      optionChange(){
        this.recruit="";
        this.findAllEmp();
        this.currentPage=1;
      },
      inputChange(){
      
      this.recruit="";
      this.findAllEmp();
    },
  //通过招聘标题发生改变
   async searchForEmploy(searchKeyword){   
      if(this.searchType === "2"){
        if(this.searchKeyword){
          
          try {
            let res = await findEmploymentByJob({job:this.searchKeyword});
            // console.log(res.data);
            this.recruitData = res.data;
           
            this.currentPage = 1;
            this.recruitData.forEach(item=>{
             item.publishTime=item.publishTime.slice(0,10);})
             console.log(recruitData);
          } catch (error) {
            config.errorMsg(this,'请输入与'+searchType+'相关的关键字');
          }
        }
        else{
          this.findAllEmp();
        }
      }
      else{
        if(this.searchKeyword){
          // console.log(this.searchKeyword);
          try {
            let res = await findEmploymentByTitle({title:this.searchKeyword});
            this.recruitData = res.data;
            this.currentPage = 1;
            this.recruitData.forEach(item=>{
             item.publishTime=item.publishTime.slice(0,10);})
          } catch (error) {
            config.errorMsg(this,'请输入与'+searchType+'相关的关键字');
          }
        }
        else{
          this.findAllEmp();
        }
      }
    },
    
   toSee(row){
        this.list = { ...row };
        // console.log(this.recruit);
        this.seeVisible = true;
        let str=this.list.welfare;
        this.welfareData=str.split(",");
      },

       toDelete(row){
        //  console.log('----',row);
        this.list={...row};
        // console.log(this.list.id,this.list.status);
        this.dialogVisible=true;
        
        // this.list=[...this.recruitData];

      },
      // dialogtoqux(){
      //     this.textarea="";
      //     //  console.log(this.inp);
      //      dialogVisible=false;

      //   },
     
       async dialogtoqd(){
        
        // console.log(this.list);
      
          try {
                  delete this.list.publishTime;
                  delete this.list.startTime;
                  delete this.list.endTime;
              // this.currentBus.status=jj;
              this.list.auditStatus="审核未通过";
               
               let res=await saveOrUpdateEmployment(this.list);
                   
              if(res.status===200)
              {    
                  
                   this.dialogVisible=false;                
                   config.successMsg(this,"拒绝成功");
                   this.recruit="";
                   this.findAllEmp();
                  
              }else{
                config.successMsg(this,"拒绝失败");

              }
              
            
            } catch (error) {
              console.log(error);
            }
        this.dialogVisible=false;
      },
    

  //通过关键字查询数据

    
    

    // 一键通过
    async toBatchPass(){
       let ids = this.ids;
       if (ids.length > 0) {
        this.$alert("是否通过？", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            if (action === "confirm") {
              let result = [];           
              ids.forEach(async id => {
                try {
                 
                  let res = await findEmploymentById({id:id});
                  // console.log(res.data) ;
                  res.data.auditStatus="审核通过";
                  this.recruitData=res.data;
                    delete this.recruitData.publishTime;
                    delete this.recruitData.startTime;
                    delete this.recruitData.endTime;
                      try {
                        let stu=await saveOrUpdateEmployment(this.recruitData);
                        this.findAllEmp();
                      } catch (error) {
                        config.successMsg(this,"保存错误！");
                      }
                  // console.log(res.data.status);
                  result.push(res.auditStatus);
                } catch (error) {
                  result.push(200);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量通过成功");
                        this.recruit="";
                        
                } else {
                  config.successMsg(this, "批量通过成功");
                  this.recruit="";
                }
                this.findAllEmp();
              }, 500);
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
    // 通过jobType筛选数据
    async jobTyleData(val){
      if (val) {
        try {
          let res = await findEmploymentByJob({ job : val });
          this.recruitData = res.data;
          this.currentPage = 1;
          this.recruitData.forEach(item=>{
          item.publishTime=item.publishTime.slice(0,10);})
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
          // console.log(error);
           // 格式化时间
            
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

        // 格式化时间
            this.recruitData.forEach(item=>{
             item.publishTime=item.publishTime.slice(0,10);})

        } catch (error) {
          config.errorMsg(this,"获取招聘信息失败");
        }
      },

      
      async toEdit(row){
        // console.log(row);    
         
        this.recruitData = {...row};
                delete this.recruitData.publishTime;
                delete this.recruitData.startTime; 
                delete this.recruitData.endTime; 
        this.recruitData.auditStatus="审核通过"; 
         try {
                 
               let res=await saveOrUpdateEmployment(this.recruitData);
               this.findAllEmp();
                 
              if(res.status===200)
              {    
                  
          
                   config.successMsg(this,"通过成功");
                   this.recruit="";
                  //  this.findAllEmp();
              }else{
                config.successMsg(this,"通过失败");

              }
              
            
            } catch (error) {
              console.log(error);
            }

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
.tonguo{
     width: 30px;
     color: #fff;
    background-color: #008000;
}
.jujue{
     width: 30px;
     color: #fff;
    
    background-color: #FF0000;
}
.tableCss{
  // text-align: center;
}
.Key-s{
  float: right;
  width: 300px;
  .el-select{
    width: 110px;
  }
}
.selectDiv{
  margin-bottom:10px;
  float: left;
}
.footerDiv {
  overflow: hidden;
  margin-top: 20px;
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
  .Flour{
  margin-bottom: 10px;
}



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
.footer_jj{
  text-align: center;
}
.tg_span{
  color: #008000;
}
.jj_span{
  color:#FF0000;
}

</style>