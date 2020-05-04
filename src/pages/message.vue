<template>
   <div class="messageWrap">
      <p class="header">消息中心列表</p>
      <el-table :data="tableData" style="width: 100%" fit highlight-current-row >
         <el-table-column align="center"
         prop="type" label="类别" width="180">
         </el-table-column>
         <el-table-column
          align="center"
         label="内容">
            <template slot-scope="scope">
               <div class="content flex flex-between">
                  <div class="text flex1">{{scope.row.content}}</div>
                  <div class="handle" @click="openDetail">查看详情</div>
               </div>
            </template>
         </el-table-column>
         <el-table-column
         prop="date" width="180" align="center"
         label="发布时间">
         </el-table-column>
         <!-- <el-table-column sortable align="center"
         label="状态" width="120">
            <template slot-scope="scope">
               <div :class="{'yellowFont':scope.row.status == 0}">
                  {{scope.row.status == 0 ? '未读' : '已读'}}
               </div>
            </template>
         </el-table-column> -->
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
         tableData: [
            {
               type: '系统消息',
               content: '广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '1'
            }, {
               type: '订单消息',
               content: '广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '0'
            }, {
               type: '订单消息',
               content: '广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '1'
            }, {
               type: '系统消息',
               content: '广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '1'
            },
            {
               type: '系统消息',
               content: '广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '1'
            }, {
               type: '订单消息',
               content: '广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '0'
            }, {
               type: '订单消息',
               content: '广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '1'
            }, {
               type: '系统消息',
               content: '广告内容广告内容广告内容广告内容',
               date:'2020-03-05',
               status: '1'
            }
          ],
          currentPage: 1,
      }
   },
   methods: {
      openDetail(){
         console.log(111)
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
.messageWrap{
   width: 1280px;
   min-height:calc(100% - 160px);
   margin: 30px auto 0;
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
      .content{
         width: 70%;
         margin: 0 auto;
         .text{
            padding-right: 20px;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
         }
         .handle{
            color: #C3913C;
            flex-shrink: 0;
         }
      }
   }
   .el-pagination{
      text-align: center;
      margin: 20px 0 40px;
   }
}
</style>
