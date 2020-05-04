<template>
   <div class="orderWrap">
      <el-form :inline="true" class="demo-form-inline">
         <el-form-item label="状态">
            <el-select v-model="selectVal" placeholder="请选择">
               <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
               </el-option>
            </el-select>
         </el-form-item>
         
         <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
         </el-form-item>
      </el-form>
      <p class="header">订单中心列表</p>

      <el-table :data="tableData" style="width: 100%" fit highlight-current-row v-loading="loading">
         <el-table-column prop="money" label="商标">
            <template slot-scope="scope">
               <div class="content flex all-center">
                  <img class="brand" :src="scope.row.imgUrl" alt="">
                  <!-- <span v-else>{{scope.row.brand}}</span> -->
               </div>
            </template>
         </el-table-column>

         <el-table-column prop="releasePrice" label="金额" />

         <el-table-column prop="releaseTime" label="发布时间" />

         <el-table-column prop="homeType" label="订单类型" />

         <el-table-column prop="status" label="订单状态">
            <!-- <template slot-scope="scope">
               <p class="status" v-if="scope.row.status == 0">待上架</p> 
               <p class="status" v-if="scope.row.status == 1">待支付</p> 
               <p class="status" v-if="scope.row.status == 2">上架中</p> 
            </template> -->
         </el-table-column>

         <el-table-column label="详情" align="center">
            <template>
               <el-button type="primary" size="mini">进入详情</el-button>
            </template>
         </el-table-column>
      </el-table>

      <el-pagination background
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="[100, 200, 300, 400]"
         :page-size="20"
         layout="total, sizes, prev, pager, next, jumper"
         :total="400" />
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   data() {
      return {
         options: [
            {
               value: '1',
               label: '已驳回'
            },{
               value: '2',
               label: '待支付'
            },{
               value: '3',
               label: '待审核'
            },
            // {
            //    value: '4',
            //    label: '待发布'
            // },
            {
               value: '5',
               label: '发布中'
            },{
               value: '6',
               label: '已完成'
            }
         ],
         selectVal: '3',
         tableData: [],
         loading: false,
         currentPage: 1,
      }
   },
   created () {
     this.getDatas() 
   },
   methods: {
      search(){
         this.loading = true
         let url = ''
         switch (this.selectVal) {
            case '1':  //  已驳回
               url = '/api/find/notPassed'
               break;
            case '2':  //  待支付
               url = '/api/find/notPay'
               break;
            case '3':  //  待审核
               url = '/api/find/unreviewed'
               break;
            case '5':  //  发布中
               url = '/api/find/passed'
               break;
            case '6':  //  已完成
               url = '/api/find/completed'
               break;
         }
         this.getDatas(url)
      },
      getDatas(url){
         this.$get(url?url:'/api/find/unreviewed').then( res => {
            if(res.code == 200){
               this.tableData = res.data;
               this.loading = false
            }
         })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
   },
   components: {

   }
}
</script>

<style lang="scss" scoped>
.orderWrap{
   width: 1280px;
   margin: 20px auto 60px;
   // padding-top: 30px;
   .header{
      color: #666;
      line-height: 50px;
      padding-left: 20px;
      border: 1px solid #f3f3f3;
      border-bottom: none;
   }
   .el-table{
      border: 1px solid #f3f3f3;
      border-top: none;
      border-bottom: none;
      /deep/ thead{
         tr{
           th{
              background-color: #f2f2f2; 
           }
         }
      }
      .yellowFont{
         color: #C3913C
      }
      .status{
         color: #7ed321;
      }
      .brand{
         width: 60px;
         height: 60px;
      }
      .content{
         // width: 70%;
         .imgBox{
            margin-right: 10px;
            img{
               width: 60px;
               height: 60px;
            }
         }
         .text{
            color: #0073bd;
            // font-size: 14px;
            padding-right: 16px;
            // overflow: hidden;
            // text-overflow:ellipsis;
            // white-space: nowrap;
         }
      }
   }
   .el-pagination{
      text-align: center;
      margin: 20px 0 40px;
   }
}
</style>
