import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views//home/Home')
const Category = () => import('../views/category/Category')
const News = () => import('../views/cart/News')
const Profile = () => import('../views/profile/Profile')
const NewsDetail = () => import('../views/home/NewsDetail')
const ArticleDetail = () => import('../views/home/ArticleDetail')
const Recommend = () => import('../views/home/recommend/Index')
const Talk = () => import('../views/home/talk/Index')
const Active = () => import('../views/home/dynamic/Dynamic')
// 1.安装vue-router
Vue.use(VueRouter)
// 2.定义变量
const routes = [
  // {
  //   path:'/',
  //   redirect: '/home',
  //   meta:{
  //     keepAlive:true,
  //     scrollTop: 0
  //   }
  // },
  {
    path:'/home',
    component: Home,
    name:"首页",
    meta:{
      keepAlive:true
    },
    children:[
      {
        path: '/home/recommend',
        component: Recommend,
        name:"推荐",
        meta:{
          keepAlive:true
        },
      },
      {
        path: '/home/talk',
        component: Talk,
        name:'咖谈',
        meta:{
          keepAlive:true
        },
      },
      {
        path: '/home/active',
        component: Active,
        name:"动态标签",
        meta:{
          keepAlive:true
        }
      }
    ]
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/news',
    component: News
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path:'/toNewsDetail',
    component: NewsDetail
  },
  {
    path:'/toArticleDetail',
    component: ArticleDetail
  },
  
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
// 3导出
export default router
