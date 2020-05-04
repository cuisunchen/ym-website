import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

// 处理vue-router新版本报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
////////////////////

Vue.use(Router)

export default new Router({
  routes
})
