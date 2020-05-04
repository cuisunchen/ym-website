<template>
   <el-form :model="form" :rules="rules" ref="ruleForm" class="recommendWrap" label-width="130px" label-position="left">
      <el-form-item label="标题" prop="title">
         <el-input v-model.trim="form.title" maxlength="30" clearable placeholder="请输入标题(50个字符)"></el-input>
      </el-form-item>
      <el-form-item class="item flex align-center contentUploadItem" label="上传推荐图" prop="brand" ref="brand">
         <div class="wrap flex align-center">
            <el-upload
               class="avatar-uploader"
               action=""
               :http-request="recommendImgUploadSuccess"
               :show-file-list="false"
               :before-upload="beforeContentImgUpload">
               <el-button v-if="recommendImgLoading" circle :loading="recommendImgLoading"></el-button>
               <div v-else>
                  <img v-if="form.brand" :src="form.brand" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </div>
            </el-upload>
            <el-col :span="14">
                  <p class="desc" style="line-height: 20px;">宽高比应为1:1适宜</p>
            </el-col>
         </div>
      </el-form-item>
      <el-form-item class="item flex align-center contentUploadItem">
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
               accept="image/jpeg,image/png"
               :before-upload="beforeContentImgUpload">
               <el-button v-if="contentImgLoading" circle :loading="contentImgLoading"></el-button>
               <div v-else>
                  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </div>
            </el-upload>
            <span class="and flex all-center">或</span>
            <el-form-item prop="url" class="flex1" style="width: 100" ref="contentImg">
               <el-input v-model.trim="form.url" placeholder="请填写第三方链接地址" clearable></el-input>
            </el-form-item>
         </div>
         <p class="desc" style="margin-top: 20px; margin-left: 0">如内容图片和第三方链接地址,网址优先</p>
      </el-form-item>
      <el-form-item class="item" label="发布位置" :prop="form.recommendType != 4 || form.recommendType != 5 ? 'location' : ''">
         <p v-if="form.recommendType == 4 || form.recommendType == 5"  style="line-height: 40px; color: #409EFF;">全国</p>
         <div v-else>
            <el-col :span="12">
               <el-cascader ref="cascader"  v-if="hidden" class="citysWrap"
                  popper-class="citysOptions" clearable
                  v-model="form.location"
                  :options="cityOptions"
                  @active-item-change="handleItemChange"
                  @change="cityChange" /> 
               <el-input v-else-if="!hidden" placeholder="请选择"></el-input>
            </el-col>
         </div>
         
      </el-form-item>
      <el-form-item label="发布时间" prop="dateVal">
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
import citys from '../../../tools/citys'
export default {
   props: {
      adType: {
         type: String
      },
      hidden: {
         type: Boolean
      }
   },
   data() {
      const checkBrand = (rule, value, callback) =>{
         if (!value) {
            return callback(new Error('推荐图不能为空'))
         }else{
            callback()
         }
      }
      const checkTitle = (rule, value, callback)=>{
         if (!value) {
            return callback(new Error('标题不能为空'))
         }else{
            callback()
         }
      }
      const checkurl = (rule, value, callback) => {
         if (!value && !this.form.imageUrl) {
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
      const checkLocation = (rule, value, callback) => {
         if(this.form.recommendType == 4 || this.form.recommendType == 5){
            callback()
         }else
         if (!value) {
            return callback(new Error('发布位置不能为空'))
         }else{
            callback()
         }
      }
      const checkRecommendType = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('推荐类型不能为空'))
         }else{
            callback()
         }
      }
      return {
         rules: {
            brand:[
               { validator: checkBrand, trigger: 'change' }
            ],
            title: [
               { validator: checkTitle, trigger: 'blur' }
            ],
            url: [
               { validator: checkurl, trigger: 'blur' }
            ],
            dateVal: [
               { validator: checkDateVal,trigger: 'submit'}
            ],
            location: [
               { validator: checkLocation }
            ],
            recommendType: [
               { validator: checkRecommendType }
            ]
         },
         form: {
            location:'',
            recommendType:'',
            title: '',
            brand: '',           //  商标或者推荐图
            imageUrl:'',         //  内容图片
            url:'',              //  广告url
            dateVal:'',
            radio: '0',
            // type: 0,              //  广告类型
            releaseTimes:[]
         },
         checked: false,
         contentImgLoading: false,
         recommendImgLoading: false,
         rangeOptions: [
            {
               value: 3,
               label: '全国'
            },
            {
               value: 1,
               label: '同城'
            },
            {
               value: 2,
               label: '附近'
            }
         ],
         cityOptions:[],
         submitLoading: false,
         adObj:{},
         rangType: null,
         dataOptions:[],
         configs:{}
      }
   },
   watch: {
      $route(val){
         this.initForm()
      },
      adType(val){
         this.initForm()
         this.adObj = JSON.parse(this.$getStorage('adObj'))
         this.form.recommendType = this.adObj.value
         this.$parent.getIssueDates(this.form.recommendType).then(res=>{
            this.dataOptions = res.data
         })
         if(this.adObj.value == 4 || this.adObj.value == 5){
            this.rangType = 1
         }else if(this.adObj.value == 6){
            this.rangType = 2
         }else{
            this.rangType = 3
         }
         this.$parent.getPrice(this.form.recommendType,this.rangType).then(res => {
            this.configs = res.data
         })
      }
   },
   created () {
      this.cityOptions = JSON.parse(JSON.stringify(citys))
      this.adObj = JSON.parse(this.$getStorage('adObj'))
      this.form.recommendType = this.adObj.value
      if(this.adObj.value == 4 || this.adObj.value == 5){
         this.rangType = 1
      }else if(this.adObj.value == 6){
         this.rangType = 2
      }else{
         this.rangType = 3
      }
      this.$parent.getPrice(this.form.recommendType,this.rangType).then(res => {
         this.configs = res.data
      })
      this.$parent.getIssueDates(this.form.recommendType).then(res=>{
         this.dataOptions = res.data
      })
   },
   methods: {
      initForm(){
         this.form = {
            location:'',
            recommendType:'',
            title: '',
            brand: '',           //  商标或者推荐图
            imageUrl:'',         //  内容图片
            url:'',              //  广告url
            dateVal:'',
            radio: '0',
            releaseTimes:[]
         }
         this.adObj = JSON.parse(this.$getStorage('adObj'))
         this.form.recommendType = this.adObj.value
         this.submitLoading = false
         this.$refs.ruleForm.resetFields();
         console.log(this.hidden)
      },
      handleItemChange(val){
         if(this.form.recommendType == 6){
            let childData = []
            for (let i = 0; i < this.cityOptions.length; i++) {
               if(this.cityOptions[i].value == val){
                  childData = this.cityOptions[i].children
                  for (let o = 0; o < childData.length; o++) {
                     this.$set(childData[o], 'children', undefined)
                  }
               }
            }
         }else{
            this.cityOptions = JSON.parse(JSON.stringify(citys))
         }
      },
      cityChange(val){
         let citysData = this.$refs['cascader'].getCheckedNodes()[0]
         if(citysData){
            this.form.address = citysData.parent.data.label + '/' + citysData.data.label
            this.form.cityCode = citysData.parent.data.value
         }
      },
      dateChange(val){
         this.form.releaseTimes = val
      },
      recommendTypeChange(value){
         this.form.recommendType = value[value.length-1]
      },
      // 签署协议
      signXY(){
         this.checked = !this.checked
      },
      //  推荐图上传
      recommendImgUploadSuccess(file){
         this.$refs.brand.clearValidate()
         let fd=new FormData();
         fd.append("file",file.file);
         this.recommendImgLoading = true
         this.successRequest(fd,'brand')
      },
      //  内容图上传
      contentImgUploadSuccess(file){
         this.$refs.contentImg.clearValidate()
         let fd=new FormData();
         fd.append("file",file.file);
         this.contentImgLoading = true
         this.successRequest(fd,'imageUrl')
      },
      //  图片上传请求
      successRequest(fd,imgType){
         this.$post('/image/upload',fd).then( res => {
            this.contentImgLoading = false
            this.recommendImgLoading = false
            this.form[imgType] = res.data
         }) 
      },
      //  内容图片上传前效验
      beforeContentImgUpload(file) {
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
         let {recommendType,title,brand,imageUrl,url,releaseTimes,address,cityCode} = this.form
         releaseTimes = releaseTimes.map(item => item+" 00:00:00")
         if(recommendType == 6){
            cityCode=cityCode.slice(0,3)
         }
         let param = {
            "address": recommendType == 4 || recommendType == 5 ? '全国' : address,
            "cityCode": recommendType == 4 || recommendType == 5 ? 0 : cityCode,
            "homeBigImgUrl": url?url:imageUrl,
            "homeTopImgUrl": brand,
            // "homeType": recommendType?recommendType:type,
            "homeType": recommendType,
            "releaseTimes": releaseTimes,
            "title": title
         }
         this.$post('/api/recommend',param)
         .then(res => {
            if(res.code == 200){
               this.$message.success('发布成功')
               this.initForm()
            }
         })
      },
      preview(){
         this.$refs.ruleForm.validate(valid => {
            if (valid) {
               this.$parent.preview(this.form)
            } else {
               console.log('error preview!!');
               return false;
            }
         });
         
      }
   }
}
</script>

<style lang="scss">
.citysWrap{
   width: 100%;
}
.citysOptions{
   height: 300px;
   overflow: hidden;
   .el-scrollbar__wrap{
      overflow: inherit
   }
   .el-cascader-panel{
      height: 100%;
      .is-horizontal{
         display: none
      }
      .el-scrollbar__wrap{
         overflow-y: scroll;
      }
   }
}
</style>
<style lang="scss" scoped>
.recommendWrap{
   // width: 80%;
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
    width: 98px;
    height: 98px;
    display: block;
  }
  .contentUrl{
     line-height: 20px;
  }
  .and{
     width: 60px;
     height: 60px;
  }
</style>
