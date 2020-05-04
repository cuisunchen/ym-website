const routes = [
   {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home'),
      hidden: false,
      meta: { title: '首页' }
   },
   {
      path: '/issue',
      name: 'issue',
      component: () => import('@/pages/issue'),
      hidden: false,
      meta: { title: '发布广告', requireAuth: true }// requireAuth为真代表需要登入后才能跳转
   },
   {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/about'),
      hidden: false,
      meta: { title: '关于我们' }
   },
   {
      path: '/message',
      name: 'message',
      component: () => import('@/pages/message'),
      hidden: true,
      meta: { title: '我的消息' }
   },
   {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/order'),
      hidden: true,
      meta: { title: '我的订单' }
   },
   {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/pages/feedback'),
      hidden: true,
      meta: { title: '问题反馈' }
   },
]

export default routes