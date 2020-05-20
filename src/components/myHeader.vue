<template>
   <div class="headerWrap" :class="{'noBg': whiteBg}">
      <div class="content flex flex-between align-center">
         <div class="logo"></div>
         <div class="nav flex align-center">
            <router-link class="item flex all-center" 
                     v-for="(item,index) in routes" :key="index" :to="{name: item.name}">
                     {{item.meta.title}}
            </router-link>
            <div v-if="getUserInfo || userInfo" class="userAount flex align-center">
            <el-dropdown trigger="click" @command="handleCommand">
               <div class="el-dropdown-link flex align-center">
                  <span>{{userInfo ? userInfo.nickName : getUserInfo.nickName}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
               </div>
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="message">我的消息</el-dropdown-item>
                  <el-dropdown-item command="order">我的订单</el-dropdown-item>
                  <el-dropdown-item command="feedback">问题反馈</el-dropdown-item>
                  <el-dropdown-item command="logOut">退出</el-dropdown-item>
               </el-dropdown-menu>
            </el-dropdown>
         </div>
         <div v-else class="login item flex all-center" @click="showLogin">登录</div>
         </div>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
import routes from '../router/routes'
import { mapMutations,mapGetters } from 'vuex'
import { getStorage,setStorage } from '../tools/utils'
export default {
   data() {
      return {
         // routes,
         whiteBg:true,
         noBg: false,
         userInfo:''
      }
   },
   computed: {
     ...mapGetters([
        'getUserInfo'
     ]),
     routes(){
        return routes.filter(item => !item.hidden)
     }
   },
   watch: {
     $route(val){
        console.log(val.path)
        if(val.path != '/'){
           this.noBg = false;
        }else{
           this.whiteBg = true;
           this.noBg = true
        }
     },
   //   userInfo(val){
   //      if(!val){
   //         this.$router.push('/')
   //      }
   //   }
   },
   created () {
      // console.log(getStorage('userInfo'))
      this.userInfo = JSON.parse(getStorage('userInfo'))
      
   },
   mounted () {
      
   },
   methods: {
      ...mapMutations({
         setLogin: 'SET_LOGIN',
         setUserInfo: 'SET_USERINFO',
      }),
      handleCommand(command) {
         switch (command) {
            case 'message':
               this.goPage('message')
               break;
            case 'order':
               this.goPage('order')
               break;
            case 'feedback':
               this.goPage('feedback')
               break;
            case 'logOut':
               this.logOut()
               break;
         }
      },
      logOut(){
         this.$get('/api/loginOut').then(res => {
            console.log(res)
            localStorage.clear()
            this.setLogin(false)
            this.setUserInfo('')
            this.userInfo = ''
            this.$router.push('/')
         })
      },
      goPage(url){
         this.$router.push(url)
      },
      showLogin(){
         this.setLogin(true)
      }
   },
   components: {

   }
}
</script>

<style lang="scss" scoped>
.headerWrap{
   position: relative;
   height: 80px;
   background-color: rgba(255, 255, 255, .5);
   // box-shadow: 0 3px 3px 0 rgba(0,0,0,0.05);
   box-shadow: 2px 2px 8px #efefef;
   &.fixed{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
   }
   &.noBg{
      background-color: transparent;
   }
   .content{
      height: 100%;
      width: 1300px;
      margin: 0 auto;
      .router-link-exact-active.router-link-active{
         color: #D4BA88!important
      }
      .logo{
         width: 200px;
         height: 85px;
         flex-shrink: 0;
         background: url('../assets/umi@2x.png') no-repeat;
         background-size: cover;
      }
      .nav{
         height: 100%;
         >.item{
            color: #000;
            height: 100%;
            padding: 0 40px;
            font-size: 18px;
            flex-shrink: 0;
            font-weight: 500;
            font-style: italic;
            transition: all .2s;
            &:hover{
               color: #C3913C;
               font-size: 20px;
            }
         }
      }
   }
   .el-dropdown-link{
      cursor: pointer;
      .avatar{
         display: inline-block;
         width:30px;
         height: 30px;
         border-radius: 4px;
         background: url('../assets/userImg.png') no-repeat;
         background-size: cover;
      }
      .el-icon-arrow-down{
         font-size: 20px;
      }
   }
   .login{
      cursor: pointer;
   }
}
</style>
