// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './styles/iconfont/iconfont.css'
import { get, post, imgUpload } from './tools/http-server'
import { setStorage, getStorage } from './tools/utils'
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$imgUpload = imgUpload

import {
  Button, Select, Option, Form, FormItem, Input, Col, Dialog, Tag, Table, TableColumn, Message,
  Collapse, CollapseItem, Upload, DatePicker, Radio, Cascader, Dropdown, Pagination, Loading,
  DropdownMenu,DropdownItem,} from 'element-ui';
import "./styles/index.scss"

Vue.prototype.$message = Message;

Vue.use(Option);
Vue.use(Loading);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Collapse);
Vue.use(Upload);
Vue.use(Radio);
Vue.use(Cascader);
Vue.use(DatePicker);
Vue.use(CollapseItem);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    if (to.meta.requireAuth){
      if (store.state.userInfo || localStorage.getItem('userInfo')){
        next()
      }else{
        Vue.prototype.$message({
          message: '您未登录,请先登录!',
          type: 'error'
        })
      }
    }else{
      next()
    }
  }, 100);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
