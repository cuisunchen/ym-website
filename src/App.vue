<template>
  <div id="app">
    <my-header v-if="headerHide"></my-header>
    <!-- <div class="main" style="height: 100%"> -->
      <!-- <router-view/> -->
      <transition name="fade">
        <template class="flex1">
          <router-view/>
        </template>
      </transition>
      <!-- <p class="foot flex all-center">这是版权</p> -->
    <!-- </div> -->
    
    <p class="foot flex all-center" v-if="$route.path != '/'">Copyright © 2020 深圳市篱笆科技有限公司 粤ICP备20026264号-1备案号</p>
    <el-dialog :visible.sync="showLogin" width="400px" @close="cancel" top="30vh">
      <p slot="title" style="text-align:center">登录</p>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone" ref="phone">
            <el-input type="tel" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="smsCode">
            <el-col :span="15" style="padding-right: 10px">
              <el-input v-model="form.smsCode" maxlength="6" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="9" style="text-align: right">
              <el-button class="code" :loading="sendCodeLoading" @click="sendSmscode" v-if="sendCodeTime == 0">获取验证码</el-button>
              <el-button class="codeTime" v-else>{{sendCodeTime}}秒</el-button>
            </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myHeader from "./components/myHeader"
import { mapMutations } from 'vuex'
import { setStorage } from './tools/utils'
export default {
  name: 'App',
  data() {
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
        }, 100)
    }
    var checkCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else if(value.length < 6){
          callback(new Error('请输入6位数验证码'));
        }else {
          callback();
        }
    };
    return {
        headerHide: false,
        rules: {
          phone: [
                { validator: checkPhone, trigger: 'blur' }
          ],
          smsCode: [
                { validator: checkCode, trigger: 'blur' }
          ],
        },
        form: {
          phone: '13728760372',
          smsCode:''
        },
        sendCodeTime:0,
        isLoading:false,
        sendCodeLoading: false
    }
  },
  watch: {
    $route(val){
      console.log(val.path)
      if(val.path != '/'){
        this.headerHide = true
      }else{
        this.headerHide = false
      }
    }
  },
  // created () {
  //   this.$get('/api/releaseType').then(res => {
  //       console.log(res)
  //     })
  // },
  computed: {
    showLogin:{
      get(val){
        return this.$store.getters.showLogin
      },
      set(val){}
    }
  },
  methods: {
    ...mapMutations({
      setLogin: 'SET_LOGIN',
      setUserInfo: 'SET_USERINFO',
      setUserToken:'SET_USER_TOKEN',
    }),
    sendSmscode(){
      this.sendCodeLoading = true
      const reg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if(this.form.phone == ''){
        this.$message({
          message:'手机号不能为空',
          center: true
        })
      }
      if (!reg.test(this.form.phone)) {
        this.$message({
            message:'请输入正确的手机号',
            center:true
        })
      } else {
        this.$post('/api/sendSmsCode',{phone: this.form.phone}).then( res => {
          this.sendCodeLoading = false
          if(res.code == 200 && res.msg == "SUCCESS"){
            this.sendCodeTime = 180
            this.$message({
              message: '发送成功',
              type: 'success',
              center:true
            });
            let time = setInterval(() => {
              this.sendCodeTime -- 
              if(this.sendCodeTime == 0){
                clearInterval(time)
              }
            }, 1000)
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.login();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    login(){
      this.$post('/api/login',this.form).then( res => {
        if( res.code == 200 ){
          
          this.setUserToken(res.data);
          setStorage('token', res.data)
          this.isLoading = false
          this.setLogin(false)
          this.getUserInfo()
        }else{
          this.isLoading = false
        }
      })
    },
    getUserInfo(){
      this.$get('/api/userInfo').then( res => {
        console.log(res)
        if(res.code == 200){
          this.setUserInfo(res.data)
          setStorage('userInfo', JSON.stringify(res.data))
        }
      })
    },
    cancel(){
      this.form = {
        name: '',
        smsCode:''
      }
      this.isLoading = false
      this.$refs.ruleForm.clearValidate()
      this.setLogin(false)
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
.main{
  // height: calc(100% - 130px);
  // >div{
    // flex: 1;
    // margin-top: 80px;
  // }
  //  淡隐淡入
  .fade-enter-active, .fade-leave-active{
      transition: all .2s ease-in-out;
      position: absolute;
  }
  .fade-enter,.fade-leave-to{
      opacity: 0;
  }
}
.foot{
  height: 50px;
  color: #fff;
  flex-shrink: 0;
  text-align: center;
  background-color: #5e6664;
}
.code{
  width: 100%;
  padding: 12px 10px;
}
.codeTime{
  width: 100%;
  &:hover{
    width: 100%;
    background-color: transparent;
  }
}
</style>
