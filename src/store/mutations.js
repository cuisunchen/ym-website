export default{
   SET_LOGIN(state, param) {
      state.showLogin = param;
   },
   SET_USERINFO(state, param) {
      state.userInfo = param;
   },
   SET_USER_TOKEN(state, param) {
      state.user_token = param;
   },
   // SET_USERNAME(state, param) {    // 赋值用户名
   //    state.userName = param;
   // },
   // SET_TOKEN(state, param) {    //  赋值token 
   //    state.token = param;
   // },
}