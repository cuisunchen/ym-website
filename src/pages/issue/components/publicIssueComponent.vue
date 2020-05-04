<template>
   <el-form class="publicWrap" :rules="rules" ref="ruleForm" :model="form" label-width="130px" label-position="left">
      <el-form-item class="item flex align-center contentUploadItem" prop="homeTopImgUrl" ref="brand">
         <p slot="label">上传{{adType}}图</p>
         <div class="wrap flex align-center " :class="{'swiper-uplpader':form.homeType == 1,'cover-uplpader':form.homeType == 2}">
            <el-upload v-if="!form.homeTopImgUrl"
               class="avatar-uploader"
               
               action=""
               :show-file-list="false"
               :http-request="recommendImgUploadSuccess"
               :before-upload="beforeAvatarUpload">
               <el-button v-if="recommendImgLoading" circle :loading="recommendImgLoading"></el-button>
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="form.homeTopImgUrl">
               <img v-if="form.homeTopImgUrl" :src="form.homeTopImgUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <el-col :span="14">
               <div class="desc" v-if="form.homeType == 1">宽高比应为2:1适宜</div>
               <div class="desc" v-if="form.homeType == 2">宽高比应为2:3适宜</div>
            </el-col>
         </div>
      </el-form-item>

      <el-form-item class="flex align-center contentUploadItem">
         <p slot="label" class="contentUrl">
            上传内容图片 <br>
            或内容网址
         </p>
         <div class="wrap flex align-center content-upload">
            <el-upload
               class="avatar-uploader"
               action=""
               :show-file-list="false"
               :http-request="contentImgUploadSuccess"
               :before-upload="beforeAvatarUpload">
               <el-button v-if="contentImgLoading" circle :loading="contentImgLoading"></el-button>
               <div v-else>
                  <img v-if="form.homeBigImgUrl" :src="form.homeBigImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </div>
            </el-upload>
            <span class="and flex all-center">或</span>
            <el-form-item prop="url" ref="imageUrl" class="flex1">
               <el-input v-model.trim="form.url" placeholder="请填写第三方链接地址" clearable />
            </el-form-item>
         </div>
         <p class="desc" style="margin-top: 20px; margin-left: 0">如内容和图片都填写,网址优先</p>
      </el-form-item>
      

      <el-form-item prop="dateVal">
         <span slot="label">发布时间</span>
         <el-select v-if="dataOptions" v-model="form.dateVal" multiple placeholder="请选择" 
            class="datePicker" @change="dateChange">
            <el-option
               v-for="item in dataOptions"
               :key="item"
               :label="item"
               :value="item">
            </el-option>
         </el-select>
      </el-form-item>

      <el-form-item>
         <div class="xy flex align-center" @click="signXY">
            <div class="checkbox flex all-center" :class="{'checked': checked}">
               <div class="dot"></div>
            </div>
            <div class="content">
               阿萨德化工是大法官
            </div>
         </div>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" @click="onSubmit('ruleForm')" :loading="submitLoading">确认提交</el-button>
         <el-button type="success" @click="preview">预览效果</el-button>
      </el-form-item>
   </el-form>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import { getStorage,setStorage } from '../../../tools/utils'
import axios from 'axios'
export default {
   props: {
      adType: {
         type: String
      }
   },
   data() {
      const checkHomeTopImgUrl = (rule, value, callback) =>{
         if (!value) {
            return callback(new Error(`${this.adType}图不能为空`))
         }else{
            callback()
         }
      }
      const checkurl = (rule, value, callback) => {
         if (!value && !this.form.homeBigImgUrl) {
            return callback(new Error('内容图片和第三方链接地址必须填写一项'))
         }else{
            callback()
         }
      }
      const checkDateVal = (rule, value, callback) => {
         if (value.length < 1) {
            return callback(new Error('日期不能为空'))
         }else{
            callback()
         }
      }
      const checkHomeBigImgUrl = (rule, value, callback) => {
         if (!value && !this.form.imageUrl) {
            return callback(new Error('内容图片和第三方链接地址必须填写一项'))
         }else{
            callback()
         }
      }
      return {
         form: {
            homeTopImgUrl: '',           //  商标或者推荐图
            homeBigImgUrl:'',         //  内容图片
            url: "",
            releaseTimes: [],
            dateVal:[],
         },
         rules: {
            homeTopImgUrl:[
               { validator: checkHomeTopImgUrl,trigger: 'submit' }
            ],
            url: [
               { validator: checkurl, trigger: 'blur' }
            ],
            dateVal: [
               { validator: checkDateVal }
            ],
            homeBigImgUrl: [
               { validator: checkHomeBigImgUrl }
            ]
         },
         // pickerOptions: {
         //    disabledDate(time) {
         //       return time.getTime() <= Date.now();
         //    }
         // },
         dataOptions:[],
         recommendImgLoading: false,
         contentImgLoading: false,
         checked: false,
         submitLoading: false,
         configs:{}
      }
   },
   watch: {
      $route(val){ 
         this.initForm()
      },
      adType(val){
         
         this.initForm()
         this.form.homeType = JSON.parse(this.$getStorage('adObj')).value
         console.log(this.form.homeType)
         this.$parent.getPrice(this.form.homeType,1).then(res => {
            this.configs = res.data
         })
         this.$parent.getIssueDates(this.form.homeType).then(res=>{
         this.dataOptions = res.data
      })
      }
   },
   created () {
      let adObj = JSON.parse(this.$getStorage('adObj'))
      this.form.homeType = adObj.value
      this.$parent.getPrice(this.form.homeType,1).then(res => {   // 轮播/封面和弹窗都是全国类型,所以rangType写死成1
         this.configs = res.data
      })
      this.$parent.getIssueDates(this.form.homeType).then(res=>{
         this.dataOptions = res.data
      })
   },
   methods: {
      initForm(){
         this.form = {
            homeTopImgUrl: '',           //  商标或者推荐图
            homeBigImgUrl:'',         //  内容图片
            url: "",
            releaseEndTime: "",
            releaseTime: "",
         }
         let adObj = JSON.parse(this.$getStorage('adObj'))
         this.form.homeType = adObj.value
         this.$refs.ruleForm.resetFields();
      },
      preview(){
         this.$refs.ruleForm.validate(valid => {
            if (valid) {
               this.$parent.preview(this.form)
            } else {
               console.log('error submit!!');
               return false;
            }
         });
         
      },
      dateChange(val){
         this.form.releaseTimes = val
      },
      recommendImgUploadSuccess(file){
         this.$refs.brand.clearValidate()   //  清楚验证错误提示
         let fd=new FormData();
         fd.append("file",file.file);
         this.recommendImgLoading = true
         this.successRequest(fd,'homeTopImgUrl')
      },
      //  内容图上传
      contentImgUploadSuccess(file){
         this.$refs.imageUrl.clearValidate()
         let fd=new FormData();
         fd.append("file",file.file);
         this.contentImgLoading = true
         this.successRequest(fd,'homeBigImgUrl')
      },
      //  图片上传请求
      successRequest(fd,imgType){
         this.$imgUpload('/image/upload',fd).then(res=>{
            this.contentImgLoading = false
            this.recommendImgLoading = false
            this.form[imgType] = res.data
         }).catch(err=>{
            this.$message.error('请求错误!')
            this.contentImgLoading = false
            this.recommendImgLoading = false
         })
      },
      recommendTypeChange(value){
         console.log(value);
         console.log(this.recommendType);
      },
      signXY(){
         this.checked = !this.checked
      },
      beforeAvatarUpload(file) {
         const isJPG = file.type === 'image/jpeg' || file.type ===  'image/png';
         const isLt2M = file.size / 1024 / 1024 < 2;
            
         if (!isJPG) {
            this.$message.error('上传图片只能是 JPG或PNG 格式!');
         }
         if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
         }
        return isJPG && isLt2M;
      },
      onSubmit(formName) {
         console.log('submit!');
         this.$refs[formName].validate(valid => {
            if (valid) {
               this.submitLoading = true
               this.submitRequest()
            } else {
               console.log('error submit!!');
               return false;
            }
         });
      },
      submitRequest(){
         let {homeTopImgUrl,homeBigImgUrl,url,releaseTimes,dateVal,homeType} = this.form
         if(url){
            homeBigImgUrl = url
         }
         releaseTimes = releaseTimes.map(item => item+" 00:00:00")
         let params = {
            homeBigImgUrl,
            homeTopImgUrl,
            homeType,
            releaseTimes
         }
         this.$post('/api/release',params).then(res=>{
            this.submitLoading = false
            if( res.code == 200 ){
               this.$message.success('发布成功')
               this.initForm()
               this.$parent.getIssueDates(this.form.homeType).then(res=>{
                  this.dataOptions = res.data
               })
            }
         })
      }
   },
   components: {

   }
}
</script>

<style lang="scss" scoped>
.publicWrap{
   /deep/ .el-form-item__content{
      line-height: 0
   }
   /deep/ .el-collapse-item__content{
      line-height: 0
   }
   .desc{
      margin-left: 20px;
      color: #999;
   }
   .datePicker{
      width: 100%;
   }
   .contentUploadItem{
      /deep/ .el-form-item__label{
         flex-shrink: 0;
      }
      /deep/ .el-form-item__content{
         width: 100%;
         margin-left: 0!important;
      }
   }
   .item{
      /deep/ .el-form-item__content{
         position: relative;
      }
      .area{
         position: absolute;
         top: 0;
         left: 0;
         bottom: 0;
         height: 100%
      }
   }
   .xy{
      cursor: pointer;
      -moz-user-select:none; /*火狐*/
      -webkit-user-select:none; /*webkit浏览器*/
      -ms-user-select:none; /*IE10*/
      -khtml-user-select:none; /*早期浏览器*/
      user-select:none;
      .checkbox{
         width: 12px;
         height: 12px;
         margin-right: 6px;
         border: 1px solid #DCDFE6; 
         border-radius: 50%;
         &.checked{
            background-color: #50A839;
            border-color: #50A839;
         }
         .dot{
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #fff;
         }
      }
      .content{
         color: #50A839
      }
   }
}
/deep/ .el-upload{
   display: flex;
   align-items: center;
   justify-content: center;
   width: 98px;
   height: 98px;
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
   .el-button{
      border: none;
      font-size: 20px;
   }
  }
  .swiper-uplpader{
     /deep/ .el-upload{
        width: 196px;
        height: 98px;
     }
      .avatar {
         width: 196px;
         height: 98px;
      }
  }
  .cover-uplpader{
     /deep/ .el-upload{
        width: 98px;
        height: 147px;
     }
      .avatar {
         width: 98px;
         height: 147px;
      }
  }
  .content-upload{
      /deep/ .el-upload{
         height: 150px;
      }
      .avatar {
         width: 294px;
         height: 98px;
         border-radius: 6px;
      }
   }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .avatar {
    width: 99px;
    height: 99px;
    display: block;
    border-radius: 6px;
  }
  .contentUrl{
     line-height: 20px;
  }
  .and{
     width: 60px;
     height: 60px;
  }
</style>
