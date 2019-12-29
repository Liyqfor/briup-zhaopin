<!--
 @Author:Ivan
 @Date:2019-12-29 17:03:36
 @LastModifiedBy:Ivan
 @Last Modified time:2019-12-29 17:03:36
-->

 @Last Modified time:2019-12-29 17:03:13
-->

 @Last Modified time:2019-12-29 15:43:40
-->

 @Last Modified time:2019-12-29 15:42:32
-->

 @Last Modified time:2019-12-28 15:22:56
-->

 @Last Modified time:2019-12-28 15:22:11
-->

 @Last Modified time:2019-12-26 22:15:55
-->







/*
 * @Author: liuyr 
 * 福利管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 21:07:41
 */
<template>
  <div id="moduleBoon">
    <!-- 下拉框 -->
    <div class="selectDiv">
      <el-select v-model="selectWelfare" clearable placeholder="全部" @change='selectChange' size="mini">
        <el-option
          v-for="item in welfareName"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="welfList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="福利名称">
        </el-table-column>
        <el-table-column
            id="divfru"
            prop="status"
            label="状态">
            <template slot-scope="scope">
          <div v-if="scope.row.status=='冻结中'" class="frozen" >
            {{scope.row.status}}
          </div>
          <div v-else class="used"  >
            {{scope.row.status}}
          </div>
        </template>
        </el-table-column>
        
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <div  v-if="scope.row.status=='冻结中'">
             <el-button @click="recoverClick(scope.row)" type="success" size="mini">恢复</el-button>
          </div>
          <div  v-else>
            <el-button @click="freezeClick(scope.row)" type="warning" size="mini">冻结</el-button>
          </div>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="delandpage">
      <div class="btndiv" >
          <el-button type="danger" plain size="mini" @click="toBatchDelete()">批量删除</el-button>
      </div>
      <div class="pagediv">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="welfareselectData.length"
        :current-page='startpage' 
        @current-change="pagechange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { findAllWelfare, findByIdWelfare,saveOrUpdateWelfare,deleteWelfareById} from "@/api/welfare.js";
import config from '@/utils/config.js'
export default {
  data() {
    return {
      //福利接口返回的所有总数据
      welfareData:[],
      //所有福利名称
      welfareName:[],
      //选中的福利
      selectWelfare:'',
      //获取的当前页数
      startpage:1,
      divstatus:'divfru',
      welfareselectData:[],
      //批量删除的ids
      ids:[],

    };
  },
  computed: {
    welfList(){
      let allwelfData=[...this.welfareselectData];
      let page=this.startpage;//读当前页数
      let setpage=10;//10行一页
      return allwelfData.slice((page-1)*setpage,page*setpage)
      // 计算属性的函数内记得写返回结果（返回结果要给回属性）
    }
  },
  methods: {
    // 查询所有福利信息
    getallWelfare(){
      findAllWelfare()
      .then((res)=>{
        this.welfareData=[...res.data];
        this.welfareselectData=[...res.data];
        let temp= res.data.map((item)=>{
          return item.status;
        });
        this.welfareName=[...new Set(temp)];
      })
      .catch((error)=>{config.errorMsg(this, "查找错误")});
    },
    //恢复
    recoverClick(val){
      let id=val.id;
      //console.log(id);
      saveOrUpdateWelfare({id,status:'使用中',name:val.name})
      .then((res)=>{
        config.successMsg(this,'状态切换成功');
        setTimeout(()=>{this.selectChange(this.selectWelfare);},50)
        this.getallWelfare();
      })
      .catch((error)=>{config.errorMsg(this, "状态切换失败")});
    },
    //冻结
    freezeClick(val){
      //console.log(val);
      //console.log(2);
      let id=val.id;
      //console.log(id);
      saveOrUpdateWelfare({id,status:'冻结中',name:val.name})
      .then((res)=>{
        config.successMsg(this,'状态切换成功');
        setTimeout(()=>{this.selectChange(this.selectWelfare);},50)
        this.getallWelfare();
        //this.selectChange(this.selectWelfare);
      })
      .catch((error)=>{config.errorMsg(this, "状态切换失败")});
      
      
    },
    //获取当前所选页数
    pagechange(val){
      this.startpage=val;
    },
    //下拉框
    selectChange(val){
      
      if(val!=""){
        let temp= this.welfareData.filter((item)=>{
            return item.status==val;
        });
        //setTimeout(()=>{this.welfareData=[...temp]},2000);
        this.startpage=1;
        this.welfareselectData=temp;
        
      }else{
        this.getallWelfare();
      }
    },
    //复选框事件处理
    selectionChange(val){
      //提取id
      let ids=val.map((item)=>{
        return item.id;
      })
      this.ids=ids;
    },
    //多选删除
    toBatchDelete(){
      //获取被选中的数据 this.ids
    let ids=this.ids;
    if(ids.length>0){
      this.$alert('是否删除？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if(action=='confirm'){
              let result=[];
              ids.forEach((id)=>{
                 deleteWelfareById({id})
                 .then((res)=>{
                  result.push(res.status);
                 })
                 .catch((error)=>{
                   result.push(500);
                   //config.errorMsg(this, "查找错误");
                   })
              })
              setTimeout(()=>{
                //console.log(result);
                let resu =result.every((item)=>{return item===200})
                if(resu){
                  config.successMsg(this,'批量成功');
                }else{
                  config.errorMsg(this, "批量删除失败");
                }
                this.getallWelfare();
                this.selectWelfare='';
              },2000)
              //every用于遍历判断是不是全部都符合return的条件

            }

          }
        });
    }else{
      this.$message({
          message: '请选择要删除的对象',
          type: 'warning'
        });
    }
  },
  },
  created() {
    this.getallWelfare();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
#divfru{
  color: white;
}
.frozen{
  color:orange;
}
.used{
  color: forestgreen;
}
.delandpage{
    overflow: hidden;
    margin-top: 10px;
    .btndiv{
      float: left;
    }
    .pagediv{
      float: right;
    }
  }
.selectDiv{
  margin-bottom: 10px;
}
</style>