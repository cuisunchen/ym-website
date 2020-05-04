<template>
   <el-form class="questionWrap" ref="ruleForm" :rules="rules" :model="form" label-width="130px" label-position="left">
      <div>
         <el-form-item prop="title" label="标题" ref="brand">
            <el-input v-model="form.title" max-length="30" placeholder="请输入标题"></el-input>
         </el-form-item>
      </div>

      <div>
         <el-form-item class="flex align-center contentUploadItem" prop="homeTopImgUrl" ref="brand">
            <p slot="label">上传{{adType}}图</p>
            <div class="wrap flex align-center" :class="{'gl-upload': form.type == 9}">
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
                  <div class="desc" v-if="form.type == 8">宽高比应为1:1适宜</div>
                  <div class="desc" v-if="form.type == 9">宽高比应为3:1适宜</div>
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
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                  <div v-else>
                     <img v-if="form.homeBigImgUrl" :src="form.homeBigImgUrl" class="avatar">
                     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
               </el-upload>
               <span class="and flex all-center">或</span>
               <el-form-item prop="url" ref="imageUrl" class="flex1" style="width: 100">
                  <el-input v-model.trim="form.url" placeholder="请填写网址地址" clearable></el-input>
               </el-form-item>
            </div>
            <p class="desc" style="margin-top: 20px;margin-left:0;">如内容和图片都填写,网址优先</p>
         </el-form-item>

         <el-form-item v-if="form.type == 8" class="item" label="请您提问" prop="quesstion">
            <el-input v-model="form.quesstion" maxlength="50" placeholder="请输入问题" clearable></el-input>
         </el-form-item>

         <el-form-item v-if="form.type == 8" class="item" label="正确答案" prop="rightAnswer">
            <el-input v-model.trim="form.rightAnswer" maxlength="50" placeholder="请输入正确答案" clearable></el-input>
         </el-form-item>

         <el-form-item v-if="form.type == 8" class="item" label="错误答案" prop="wrongAnswer">
            <el-input v-model.trim="form.wrongAnswer" maxlength="50" placeholder="请输入错误答案" clearable></el-input>
         </el-form-item>

         <el-form-item class="item" label="发布类型" prop="rangeType">
            <el-col :span="12">
               <el-select style="width:100%" v-model="form.rangeType" placeholder="请选择" 
                  @visible-change="rangeTypeShow"
                  @change="rangeTypeChange">
                  <el-option
                     v-for="item in rangeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                  </el-option>
               </el-select>
            </el-col>
         </el-form-item>
         <el-form-item class="item" label="发布位置" ref="location" :prop="form.rangeType == 1?'':'location'">
            <p v-if="form.rangeType=='全国' || form.rangeType == 1" style="line-height: 40px; color: #409EFF;">全国</p>
            <div class="wrap" v-else>
               <el-col :span="12">
                  <el-cascader style="width:100%" ref="cascader" v-if="hidden"
                     popper-class="citysOptions" clearable
                     v-model="form.location"
                     :options="options"
                     @active-item-change="handleItemChange"
                     @change="cityChange" />
                  <el-input v-else-if="!hidden" placeholder="请选择"></el-input>
               </el-col>
            </div>
         </el-form-item>

         <el-form-item class="item" label="发布兴趣">
            <p class="area flex align-center map-container">服装</p>
         </el-form-item>

         <el-form-item label="发布时间" prop="dateVal">
            <el-col :span="12">
               <el-date-picker
                  v-model="form.dateVal"
                  type="datetime"
                  placeholder="选择发布时间"
                  :picker-options="pickerOptions"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="dateChange" />
            </el-col>
         </el-form-item>

         <el-form-item label="发布总数" prop="totalNum">
            <div class="wrap flex align-center">
               <el-col :span="12">
                  <el-input v-model.trim="form.totalNum" :placeholder="`请输入广告条数,最少${configs.minNumber}条`" />
               </el-col>
               <el-col :span="16" v-if="form.type == 9">
                  <p class="desc" style="color: #333;">
                     当前中奖率为: 
                     <span class="rate">{{rate}}</span> %
                     <em style="color: #F56C6C;font-size: 12px;line-height: 1;margin-left: 2px">(中奖率不能低于{{!configs.minRate?20:configs.minRate}}%)</em>
                  </p>
               </el-col>
            </div>
         </el-form-item>
      </div>

      <div v-if="form.type == 9">
         <div class="box flex">
            <el-col :span="12">
               <el-form-item label="最大奖励" prop="maxReward">
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.maxReward" class="flex1"
                              :placeholder="`金额最低${configs.qmaxPrice}元`" />
                  </div>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item prop="maxNum">
                  <div slot="label" style="text-indent: 30px;">数量</div>
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.maxNum" class="flex1"
                              placeholder="数量(最低1)" />
                  </div>
               </el-form-item>
            </el-col>
         </div>

         <div class="box flex">
            <el-col :span="12">
               <el-form-item label="中间奖励 (可选)" prop="middleReward1">
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.middleReward1" class="flex1"
                              :placeholder="`金额需>= ${configs.qminPrice}元,< ${configs.qmaxPrice}元`"/>
                  </div>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item prop="middleNum1">
                  <div slot="label" style="text-indent: 30px;">数量 (可选)</div>
                  <div class="wrap flex align-center">
                      <el-input v-model.trim="form.middleNum1" class="flex1"
                           placeholder="数量1" />
                  </div>
               </el-form-item>
            </el-col>
         </div>

         <div class="box flex">
            <el-col :span="12">
               <el-form-item label="中间奖励 (可选)" prop="middleReward2">
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.middleReward2" class="flex1"
                              :placeholder="`金额需>= ${configs.qminPrice}元,< ${configs.qmaxPrice}元`"/>
                  </div>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item prop="middleNum2">
                  <div slot="label" style="text-indent: 30px;">数量 (可选)</div>
                  <div class="wrap flex align-center">
                      <el-input v-model.trim="form.middleNum2" class="flex1"
                           placeholder="数量1" />
                  </div>
               </el-form-item>
            </el-col>
         </div>

         <div class="box flex">
            <el-col :span="12">
               <el-form-item label="中间奖励 (可选)" prop="middleReward3">
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.middleReward3" class="flex1"
                              :placeholder="`金额需>= ${configs.qminPrice}元,< ${configs.qmaxPrice}元`"/>
                  </div>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item prop="middleNum3">
                  <div slot="label" style="text-indent: 30px;">数量 (可选)</div>
                  <div class="wrap flex align-center">
                      <el-input v-model.trim="form.middleNum3" class="flex1"
                           placeholder="数量1" />
                  </div>
               </el-form-item>
            </el-col>
         </div>

         <div class="box flex">
            <el-col :span="12">
               <el-form-item label="最低奖励" prop="minReward">
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.minReward" class="flex1"
                           :placeholder="`金额最低${configs.qminPrice}元`"/>
                  </div>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item prop="minNum">
                  <div slot="label" style="text-indent: 30px;">数量</div>
                  <div class="wrap flex align-center">
                     <el-input v-model.trim="form.minNum" class="flex1"
                           placeholder="数量(最低1)" />
                  </div>
               </el-form-item>
            </el-col>
         </div>
      </div>
      
      <div class="explain">
         说明: <br>
         1.系统会以发布的条数随机将广告推送给符合条件的对应用户,不会重复发送给同一个用户,最大限度的增大广告产品的曝光率;  <br>
         2.加入今天发布条数没有用完,第二天回接着推送,知道发布的条数用完为止
      </div>
      <el-form-item>
         <div class="xy flex align-center" @click="signXY">
            <div class="checkbox flex all-center" :class="{'checked': checked}">
               <div class="dot"></div>
            </div>
            <div class="content">
               阿萨德化工是大法官
            </div>
         </div>
         <!-- <el-radio v-model="form.radio" label="1">备选项</el-radio> -->
      </el-form-item>
      <el-form-item>
         <el-button type="primary" @click="onSubmit('ruleForm')">确认提交</el-button>
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
      }
   },
   data() {
      const self = this
      const checkTitle = (rule, value, callback)=>{
         if (!value) {
            return callback(new Error('标题不能为空'))
         }else{
            callback()
         }
      }
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
      const checkQuesstion = (rule, value, callback) =>{
         if (!value) {
            return callback(new Error('提问不能为空'))
         }else{
            callback()
         }
      }
      const checkRightAnswer = (rule, value, callback) =>{
         if (!value) {
            return callback(new Error('正确答案不能为空'))
         }else{
            callback()
         }
      }
      const checkWrongAnswer = (rule, value, callback) =>{
         if (!value) {
            return callback(new Error('错误答案不能为空'))
         }else{
            callback()
         }
      }
      const checkLocation = (rule, value, callback) =>{
         if (!value) {
            return callback(new Error('发布位置不能为空'))
         }else{
            callback()
         }
      }
      const checkDateVal = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('日期不能为空'))
         }else{
            callback()
         }
      }
      const checkRange = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('发布类型不能为空'))
         }else{
            callback()
         }
      }
      const checkTotalNum = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('发布条数不能为空'))
         }else if(Number(value) < self.configs.minNumber){
            return callback(new Error(`发布条数不能低于${self.configs.minNumber}条`))
         }else{
            callback()
         }
      }
      const checkMaxReward = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('最大奖励不能为空'))
         }else if(Number(value) < self.configs.qmaxPrice){
            return callback(new Error(`最大奖励金额不能小于${self.configs.qmaxPrice}元`))
         }else{
            callback()
         }
      }
      const checkMaxNum = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('最大奖励数量不能为空'))
         }else if(isNaN(value)){
            return callback(new Error('请输入合法数量'))
         }else if(Number(value) < 1){
            return callback(new Error('最大奖励数量不能小于1'))
         }else{
            callback()
         }
      }
      const checkMiddleReward1 = (rule, value, callback) => {
         if (!value) {
            callback()
         }else if(isNaN(value)){
            return callback(new Error('请输入合法金额'))
         }else if(Number(value) < self.configs.qminPrice){
            return callback(new Error(`中间奖励金额不能小于${self.configs.qminPrice}元`))
         }else{
            callback()
         }
      }
      const checkMiddleNum1 = (rule, value, callback) => {
         if (!value) {
            callback()
         }else if(isNaN(value)){
            return callback(new Error('请输入合法数量'))
         }else if(Number(value) < 1){
            return callback(new Error('最大奖励数量不能小于1'))
         }else{
            callback()
         }
      }
      const checkMiddleReward2 = (rule, value, callback) => {
         if (!value) {
            callback()
         }else if(isNaN(value)){
            return callback(new Error('请输入合法金额'))
         }else if(Number(value) < self.configs.qminPrice){
            return callback(new Error(`中间奖励金额不能小于${self.configs.qminPrice}元`))
         }else{
            callback()
         }
      }
      const checkMiddleNum2 = (rule, value, callback) => {
         if (!value) {
            callback()
         }else if(isNaN(value)){
            return callback(new Error('请输入合法数量'))
         }else if(Number(value) < 1){
            return callback(new Error('最大奖励数量不能小于1'))
         }else{
            callback()
         }
      }
      const checkMiddleReward3 = (rule, value, callback) => {
         if (!value) {
            callback()
         }else if(isNaN(value)){
            return callback(new Error('请输入合法金额'))
         }else if(Number(value) < self.configs.qminPrice){
            return callback(new Error(`中间奖励金额不能小于${self.configs.qminPrice}元`))
         }else{
            callback()
         }
      }
      const checkMiddleNum3 = (rule, value, callback) => {
         if (!value) {
            callback()
         }else if(isNaN(value)){
            return callback(new Error('请输入合法数量'))
         }else if(Number(value) < 1){
            return callback(new Error('最大奖励数量不能小于1'))
         }else{
            callback()
         }
      }
      const checkMinReward = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('最小奖励金额不能为空'))
         }else if(Number(value) < self.configs.qminPrice){
            return callback(new Error(`最小奖励金额不能小于${self.configs.qminPrice}元`))
         }else{
            callback()
         }
      }
      const checkMinNum = (rule, value, callback) => {
         if (!value) {
            return callback(new Error('最小奖励数量不能为空'))
         }else if(isNaN(value)){
            return callback(new Error('请输入合法数量'))
         }else if(Number(value) < 1){
            return callback(new Error('最大奖励数量不能小于1'))
         }else{
            callback()
         }
      }
      return {
         rules: {
            title: [
               { validator: checkTitle, trigger: 'blur' }
            ],
            homeTopImgUrl:[
               { validator: checkHomeTopImgUrl,trigger: 'submit' }
            ],
            url: [
               { validator: checkurl, trigger: 'blur' }
            ],
            quesstion:[
               { validator: checkQuesstion, trigger: 'blur' }
            ],
            rightAnswer:[
               { validator: checkRightAnswer, trigger: 'blur' }
            ],
            wrongAnswer:[
               { validator: checkWrongAnswer, trigger: 'blur' }
            ],
            location:[
               { validator: checkLocation, trigger: 'submit' }
            ],
            dateVal: [
               { validator: checkDateVal, trigger: 'blur'}
            ],
            rangeType: [
               { validator: checkRange }
            ],
            totalNum: [
               { validator: checkTotalNum, trigger: 'blur' }
            ],
            maxReward: [
               { validator: checkMaxReward, trigger: 'blur' }
            ],
            maxNum: [
               { validator: checkMaxNum, trigger: 'blur' }
            ],
            middleReward1: [
               { validator: checkMiddleReward1, trigger: 'blur' }
            ],
            middleNum1: [  
               { validator: checkMiddleNum1, trigger: 'blur' }
            ],
            middleReward2: [
               { validator: checkMiddleReward2, trigger: 'blur' }
            ],
            middleNum2: [  
               { validator: checkMiddleNum2, trigger: 'blur' }
            ],
            middleReward3: [
               { validator: checkMiddleReward3, trigger: 'blur' }
            ],
            middleNum3: [  
               { validator: checkMiddleNum3, trigger: 'blur' }
            ],
            minReward: [
               { validator: checkMinReward, trigger: 'blur' }
            ],
            minNum: [
               { validator: checkMinNum, trigger: 'blur' }
            ],
         },
         form: {
            rangeType:1,
            brand:'',
            title: '',
            homeTopImgUrl:'',
            homeBigImgUrl:'',
            url:'',
            quesstion:'',
            rightAnswer:'',
            wrongAnswer:'',
            location:'全国',
            dateVal:'',
            totalNum: null,
            type: 0,
         },
         luckForm:{              //  好运表单的数据  提交是需要合并原form表单数据   Object.assign()
            maxReward: null,
            maxNum:null,
            middleReward1: null,
            middleNum1:null,
            middleReward2: null,
            middleNum2:null,
            middleReward3: null,
            middleNum3:null,
            minReward: null,
            minNum: null
         },
         checked: false,
         address:'',
         options: [],
         rangeOptions: [
            {
               value: 1,
               label: '全国'
            },
            {
               value: 2,
               label: '同城'
            },
            {
               value: 3,
               label: '附近'
            }
         ],
         recommendImgLoading: false,
         contentImgLoading: false,
         adObj: {},
         rangType: null,
         pickerOptions: {
            disabledDate(time) {
               return time.getTime() <= Date.now();
            }
         },
         hidden: false,
         configs:{}
      }
   },
   watch: {
      $route(val){
         this.initForm()
         this.adObj = JSON.parse(this.$getStorage('adObj'))
         this.form.type = this.adObj.value
         this.$refs.ruleForm.clearValidate()
         if(this.form.type == 9){
            this.form = Object.assign({},this.form,this.luckForm)
         }
      },
      adType(val){
         this.initForm()
         this.adObj = JSON.parse(this.$getStorage('adObj'))
         this.form.type = this.adObj.value;
         this.$parent.getPrice(this.form.type,1).then(res => {
            this.configs = res.data
         })
      }
   },
   computed: {
      rate(){
         console.log((0+
               ((Number(this.form.maxNum) + Number(this.form.middleNum1)
            +  Number(this.form.middleNum2) + Number(this.form.middleNum3)
            +  Number(this.form.minNum))/(Number(this.form.totalNum) || 1)*100)).toFixed(2))
         if(!this.form.totalNum){
            return 0
         }
         return (0+
               ((Number(this.form.maxNum) + Number(this.form.middleNum1)
            +  Number(this.form.middleNum2) + Number(this.form.middleNum3)
            +  Number(this.form.minNum))/(Number(this.form.totalNum) || 1)*100)).toFixed(2)
      }
   },
   created () {
      this.adObj = JSON.parse(this.$getStorage('adObj'))
      this.form.type = this.adObj.value
      this.options = JSON.parse(JSON.stringify(citys))
      if(this.form.type == 9){
         this.form = Object.assign({},this.form,this.luckForm)
      }
      this.form.type = this.adObj.value;
      this.$parent.getPrice(this.form.type,1).then(res => {
         this.configs = res.data
      })
      
   },
   methods: {
      initForm(){
         this.form = {
            rangeType:1,
            brand:'',
            title: '',
            homeTopImgUrl:'',
            homeBigImgUrl:'',
            url:'',
            quesstion:'',
            rightAnswer:'',
            wrongAnswer:'',
            location:'',
            dateVal:'',
            totalNum: null,
            type: 0,
         }
         this.luckForm = {  
            maxReward: null,
            maxNum:null,
            middleReward1: null,
            middleNum1:null,
            middleReward2: null,
            middleNum2:null,
            middleReward3: null,
            middleNum3:null,
            minReward: null,
            minNum: null
         }
         this.adObj = JSON.parse(this.$getStorage('adObj'))
         this.form.type = this.adObj.value
         if(this.form.type == 9){
            this.form = Object.assign({},this.form,this.luckForm)
         }
         this.submitLoading = false
         this.$refs.ruleForm.resetFields();
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
      rangeTypeShow(val){
         if(val){
            this.hidden = false
         }
         else{
            this.hidden = true
         }
      },
      rangeTypeChange(val){
         console.log(val)
         if(val == 1){
            this.form.address = '全国'
            this.$refs.location.clearValidate()
         }else if(val == 2){
            this.form.address = ''
            this.form.location = [ ]
         }else if(val == 3){
            this.form.address = ''
            this.form.location = [ ]
         }
         this.$parent.getPrice(this.form.type,val).then(res => {
            this.configs = res.data
         })
      },
      handleItemChange(val){
         if(this.form.rangeType == 2){
            let childData = []
            for (let i = 0; i < this.options.length; i++) {
               if(this.options[i].value == val){
                  childData = this.options[i].children
                  for (let o = 0; o < childData.length; o++) {
                     this.$set(childData[o], 'children', undefined)
                  }
               }
            }
         }else{
            this.options = JSON.parse(JSON.stringify(citys))
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
         console.log(val)
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
         this.$refs[formName].validate(valid => {
            if (valid) {
               this.submitLoading = true
               console.log('这里发送请求');
               this.submitRequest()
            } else {
               console.log('error submit!!');
               return false;
            }
         });
      },
      submitRequest(param){
         if(this.form.type == 8){
            this.questionRequest()
         }else
         if(this.form.type == 9){
            this.goodLuckRequest()
         }
      },
      goodLuckRequest(){
         let {
            address,cityCode,title,homeBigImgUrl,homeTopImgUrl,url,rangeType,dateVal,
            totalNum,maxReward,maxNum,middleReward1,middleNum1,middleReward2,
            middleNum2,middleReward3,middleNum3,minReward,minNum
         } = this.form
         if(rangeType == 2){
            cityCode=cityCode.slice(0,3)
         }
         let param = {
            address: address,
            cityCode: cityCode || 0,
            homeBigImgUrl: homeBigImgUrl || url,
            homeTopImgUrl,
            interest: 1,
            rangeType:rangeType=='全国'? 1 : rangeType,
            releaseTime: dateVal,
            releasesNumber: totalNum,
            title:title.trim(),
            releasesPrice: [
               maxReward*100,
               middleNum1>0?middleReward1*100:'',
               middleNum2>0?middleReward2*100:'',
               middleNum3>0?middleReward3*100:'',
               minReward*100
            ].toString(),
            releasesNums: [
               maxNum,
               middleReward1>0?middleNum1:'',
               middleReward2>0?middleNum2:'',
               middleReward3>0?middleNum3:'',
               minNum
            ].toString()
         }
         if(this.rate < (this.configs.minRate?this.configs.minRate:20)){
            this.$message({
               message: '当前中奖率小于系统最低中奖率!',
               type: 'error'
            })
            return
         }
         this.$post('/api/goodLuck',param).then(res => {
            if(res.code == 200){
               this.$message({
                  message: '发布成功!',
                  type: 'success'
               })
               this.initForm()
            }
         })
      },
      questionRequest(){
         let {
            address,cityCode,title,homeBigImgUrl,homeTopImgUrl,url,quesstion,
            rightAnswer,wrongAnswer,rangeType,dateVal,totalNum,type
         } = this.form
         if(rangeType == 2){
            cityCode=cityCode.slice(0,3)
         }
         let param = {
            address: address,
            cityCode: cityCode || 0,
            falseAnswer: wrongAnswer,
            homeBigImgUrl: homeBigImgUrl || url,
            homeTopImgUrl,
            interest: 1,
            problem: quesstion,
            rangeType:rangeType=='全国'? 1 : rangeType,
            releaseTime: dateVal,
            releasesNumber: totalNum,
            title:title.trim(),
            trueAnswer: rightAnswer
         }
         this.$post('/api/questions',param).then(res => {
            if(res.code == 200){
               this.$message({
                  message: '发布成功!',
                  type: 'success'
               })
               this.initForm()
            }
         })
      },
      preview(){
         // this.$parent.preview(this.form)
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
.questionWrap{
   /deep/ .el-form-item__content{
      line-height: 0
   }
   /deep/ .el-collapse-item__content{
      line-height: 0
   }
   .desc{
      margin-left: 10px;
      line-height: 16px;
      color: #999;
      .rate{
         font-size: 22px; 
         margin: 0 10px;
         text-decoration: underline;
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
         height: 100%;
         color: #409EFF
      }
   }
   .explain{
      color: #fff;
      font-size: 12px;
      line-height: 20px;
      margin: 20px 0 20px 130px;
      padding: 10px 20px;
      border-radius: 6px;
      background-color: rgba(8, 0, 0, 0.7)
   }
   /deep/ .el-date-editor{
      width: 100%;
   }
   .wrap{
      .label{
         margin-right: 10px;
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
.contentUploadItem{
   /deep/ .el-form-item__content{
      margin-left: 0!important;
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
   .gl-upload{
      /deep/ .el-upload{
         width: 294px;
         height: 98px;
      }
      .avatar {
         width: 294px;
         height: 98px;
         border-radius: 6px;
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
