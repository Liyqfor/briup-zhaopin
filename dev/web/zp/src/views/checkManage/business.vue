/*
 * @Author: liuyr 
 * 商家审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liyq
 * @Last Modified time: 2019-12-28 10:02:19
 */
<template>
  <div id="businessCheck">
      <!-- 下拉框 -->
       <div class="selectDiv">
          <el-select @change="industryChange" v-model="business" clearable placeholder="全部">
            <el-option
              v-for="item in industryData"
              :key="item"
              :label="item"
              :value="item">
             
            </el-option>
          </el-select>
      </div>
  <!-- 表格 -->
      <div class="tableDiv">
          <el-table
            ref="multipleTable"
            :data="businessList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="selectionChange">
            <el-table-column
              type="selection"
              width="55"
            >
            
            </el-table-column>
            <el-table-column
            prop="name"
              label="企业名称"
              >
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column
              prop="contactName"
              label="联系人"
              >
            </el-table-column>
            <el-table-column
              prop="contactPhone"
              label="联系方式"
             >
            </el-table-column>
            <el-table-column
              prop="industry"
              label="行业"
              >
            </el-table-column>
            <el-table-column
             
              label="所在地"
              >
                <template slot-scope="scope">{{ scope.row.province }}-{{scope.row.city}}</template>
            </el-table-column>
            <el-table-column
              prop="scale"
              label="公司规模"
              >
              
            </el-table-column>
            <el-table-column
            
              label="详情">
              <template slot-scope="scope">
                <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100">
            <template  slot-scope="scope">
              <div v-if="scope.row.status==='待审核'">
                    <el-button  class="tonguo" type="text" @click="toEdit(scope.row)" size="small" >通过</el-button>
                    <el-button class="jujue" type="text" size="small" @click="toDelete(scope.row)">拒绝</el-button>
              </div>
              <div v-if="scope.row.status==='审核通过'">
                    <span>审核通过</span>
              </div>
               <div v-if="scope.row.status==='审核未通过'">
                    <span>已拒绝</span>
              </div>
             
            </template>
           </el-table-column>

          </el-table>
      <div class="footerDiv" >
        <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      
      </div>
      
        <div class="pageDiv">
          <el-pagination
            :page-size="pageSize"
            :current-page.sync="currentPage"
            background
            @current-change="pageChange"
            layout="prev, pager, next"
            :total="businessData.length">
        </el-pagination>
        </div>
      </div>
      
      </div>
       <el-dialog :title="currentBus.name" :visible.sync="seeVisible">
          <div class="seeDiv">
            <span>行业类型：</span>
            {{currentBus.industry}}
          </div>
          <div class="seeDiv">
            <span>成立时间：</span>
            {{currentBus.establishedTime}}
          </div>
          <div class="seeDiv">
            <span>注册资本：</span>
            {{currentBus.registeredCapital}}
          </div>
          <div class="seeDiv">
            <span>公司规模：</span>
            {{currentBus.scale}}
          </div>
          <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div>
          <div class="imgDiv">
          <a :href="currentBus.businessLicense" target="_blank">
            <img :src="currentBus.businessLicense" alt width="200" height="150" />
          </a>
        </div>
    </el-dialog>

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
      <el-form :inline="true" :model="currentBus" class="demo-form-inline">
          <el-form-item label="审批人">
        <el-input v-model="currentBus.status" ></el-input>
          </el-form-item>
      </el-form>
      <!-- {{textarea}} -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogtoqx">取 消</el-button>
      <el-button type="primary" @click="dialogtoqd">确 定</el-button>
    </span>
  </el-dialog>


  </div>
  
</template>

<script>
import 
{ findAllBusiness,
  deleteBusinessById,
  saveOrUpdateBusiness,
  findBusinessByScale,
  findBusinessByIndustry
  } from "@/api/business.js";
import config from '@/utils/config.js';
export default {
  data() {
    return {
        business: [],
        businessCheck:[],
        businessData: [],
        // multipleSelection: [],
        currentPage:1,
        pageSize:config.pageSize,
        seeVisible:false,
        currentBus:{},
        dialogVisible:false,
        textarea:'',
        ids:[],
        industryData:[],
        

    };
  },
  computed: {
     businessList() {
      let temp = [...this.businessData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    // 通过选择industry筛序
    async industryChange(val){
      if (val) {
        try {
          let res = await findBusinessByIndustry({ industry: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },

    // 取消
    dialogtoqx(){
      this.textarea='';
      this.dialogVisible=false;
    },
    async dialogtoqd(){
      // this.textarea='';
      let inp=this.currentBus.status;
      console.log(inp);
      this.currentBus.status=inp;
       try {
              // this.currentBus.status=jj;
               let res=await saveOrUpdateBusiness(this.currentBus);    
              if(res.status===200)
              {    
                  
                   this.dialogVisible=false;                
                   config.successMsg(this,"修改成功");
                   this.findAllBus();
              }else{
                config.successMsg(this,"修改失败");

              }
              
            
            } catch (error) {
              console.log(error);
            }
      this.dialogVisible=false;

    },
    // 分页
    pageChange(page){
        this.currentPage=page;
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
                  let res = await deleteBusinessById({ id: id });
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
                this.findAllBus();
              }, 2000);
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

     toSee(row){
        this.currentBus = { ...row };
        this.seeVisible = true;
      },
      async toEdit(row){
        let jj="审核通过";
        this.currentBus = { ...row };
        this.currentBus.status=jj;
         try {
              // this.currentBus.status=jj;
               let res=await saveOrUpdateBusiness(this.currentBus);    
              if(res.status===200)
              {    
                  
                  //  this.dialogVisible=false;                
                   config.successMsg(this,"修改成功");
                   this.findAllBus();
              }else{
                config.successMsg(this,"修改失败");

              }
              
            
            } catch (error) {
              console.log(error);
            }

      },
      toDelete(row){
         this.currentBus = { ...row };
         this.dialogVisible=true;

         
        

      },

      selectionChange(val) {
        console.log(val);
           let ids = val.map(item => {
              return item.id;
            });
            this.ids = ids;
      },

      /* 查找商家数据 */
      async findAllBus(){
        try {
          let res=await findAllBusiness();
          
          this.businessData=res.data;
          // console.log(businessData);
          let industryDataArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.industryData = [...new Set(industryDataArr)];
        } catch (error) {
            config.errorMsg(this,"删除错误");
        }
        
        },  
    
  },
  created() {
    this.findAllBus();
    },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tableDiv {
  margin-top: 10px;
}
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
  .btnDiv {
    float: left;
  }
  .pageDiv{
    float: right;
  }

}
// .tonguo{
//   background:lawngreen;
// }
// .jujue{
//   background:red;
// }
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
  span {
    color: #777;
  }
}
.descDiv {
  font-weight: bold;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv {
  text-align: center;
}
</style>