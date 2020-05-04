<template>
   <div class="issuePage flex">
      <div class="content flex1">
         <div class="issueType flex align-center">
            <div class="label">发布广告类型</div>
            <el-cascader v-model="currentType" :options="types" 
               @visible-change="rangeTypeShow"
               @change="changeType" />
         </div>
         
         <transition name='fade'>
            <recommend :ad-type="adType" :hidden="hidden" v-if='currentTypeID == 4 || currentTypeID == 5 || currentTypeID == 6 || currentTypeID == 7'/> 
         </transition>
         <transition name='fade'>
            <questionAndLuck @preview="preview" :ad-type="adType" v-if='currentTypeID == 8 || currentTypeID == 9'/> 
         </transition>
         <transition name='fade'>
            <publicIssueComponent :ad-type="adType"  v-if='currentTypeID == 1 || currentTypeID == 2 || currentTypeID == 3'/> 
         </transition>
      </div>

      <div class="preview">
         <iframe class="previewPage" id="iframeId" src="http://localhost:8082" frameborder="0"></iframe>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
import recommend from './components/recommend'
import questionAndLuck from './components/questionAndLuck'
import publicIssueComponent from './components/publicIssueComponent'
import { mapGetters,mapMutations } from 'vuex'
export default {
   data() {
      return {
         currentType: '',
         currentTypeID: 1,
         types:[
            {
               value: 1,
               label:'轮播',
               rangType: 1
            },
            {
               value: 2,
               label:'开屏',
               rangType: 1
            },
            {
               value: 3,
               label:'插屏',
               rangType: 1
            },
            {
               value: 0,
               label:'推荐',
               rangType: 1,
               children: [
                  {
                     value: 4,
                     label: '首页推荐',
                  },
                  {
                     value: 5,
                     label: '全国好运推荐',
                  },
                  {
                     value: 6,
                     label: '同城好运推荐',
                  },
                  {
                     value: 7,
                     label: '附近好运推荐',
                  }
               ]
            },
            {
               value: 8,
               label:'问答'
            },
            {
               value: 9,
               label:'好运'
            }
         ],
         activeNames: ['1'],
         previewDialog: false,
         adType:'',
         hidden: false,
      }
   },
   computed: {
      ...mapGetters([
         'getPreviewDialog'
      ]),
   },
   created () {
      this.currentType = this.types[0].value
      this.currentTypeID = this.types[0].value
      this.adType = this.types[0].label
      this.$setStorage('adObj',JSON.stringify(this.types[0]))
   },
   methods: {
      ...mapMutations({
         setPreviewDialog: 'SET_PREVIEWDIALOG',
      }),
      getIssueDates(homeType){
         return this.$post('/api/releaseFreeTime',{homeType})
      },
      preview(data){
         let previewParam = {
            previewType: 0,   //  0: 封面  1:首页  2: 好运
            pagePosition: 0,  // 0:首页弹框 1:首页轮播 2:首页推荐 3:问答 4:好运推荐 5:好运
         }
         data = Object.assign({},data,previewParam)
         let frame = document.getElementById('iframeId');  // 或者用vue语法 let frame = this.$refs.iframeId
         // if(process){}
         frame.contentWindow.postMessage(data,'http://localhost:8082/#/');
      },
      closePreviewDialog(){
         this.setPreviewDialog(false)
      },
      //  供子组件调用  方法
      getPrice(homeAdType,rangType){  
         return this.$post('/api/releasePrice',{homeAdType,rangType})
      },
      rangeTypeShow(val){
         if(val){
            this.hidden = false
         }
         else{
            this.hidden = true
         }
      },
      changeType(val){  
         this.currentTypeID = val[val.length-1]
         let obj;
         for (const item of this.types) {
            if(item.children){
               for (const child of item.children) {
                  if(child.value == this.currentTypeID){
                     obj = child;
                     break
                  }
               }
            }else{
               if(item.value == this.currentTypeID){
                  obj = item
                  break 
               }
            }
         }
         console.log(obj.label)
         this.adType = obj.label
         this.$setStorage('adObj',JSON.stringify(obj))
      },
   },
   components: {
      recommend,questionAndLuck,publicIssueComponent
   }
}
</script>

<style lang="scss" scoped>
.issuePage{
   // margin-top: 40px;
   // margin-bottom: 80px;
   // padding: 0 40px;
   width: 1200px;
   min-height:calc(100% - 170px);
   margin: 20px auto;
   .content{
      padding-right: 80px;
   }
   .issueType{
      margin-bottom: 20px;
      .label{
         color: #606266;
         width: 130px;
         flex-shrink: 0;
      }
   }
   .title{
      font-size: 18px;
      line-height: 60px;
      margin-top: 20px;
   }
   .el-collapse{
      width: 800px;
      margin-top: 50px;
      border-bottom: none;
      .title{
         font-size: 18px;
      }
      /deep/ .el-collapse-item__wrap{
         border: none;
      }
      .el-form{
         width: 800px;
      }
   }
   .preview{
      position: relative;
      width: 306px;
      height: 600px;
      padding: 64px 31px 57px 29px;
      background: url("../../assets/phoneBg.png") no-repeat;
      background-size: 100% 100%;
      .previewPage{
         width: 100%;
         height: 100%;
      }

      /deep/ .el-dialog{
         width: 347px;
         height: 600px;
         margin: auto!important;
         position: absolute;
         left: 0;
         top: 0;
         right: 0;
         bottom: 0;
         margin: auto;
         .el-dialog__header{
            display: none
         }
         .el-dialog__body{
            height: 100%;
            padding: 0;
            background-color: rgba(0,0,0,0.2);
         }
         .body{
            height: 100%;
            background: url("../../assets/phoneBg.png") no-repeat;
            background-size: cover;
            .main{}
            .footer{
               height: 40px;
               background-color: #606266
            }
         }
      }
   }
}
</style>
