import { createRouter, createWebHashHistory } from 'vue-router'//使用了createWebHashHistory来设置哈希模式的路由历史，这样URL中会带#符号
//显式导入。动态导入（懒加载） 按需加载，优化性能  需要异步处理，配置稍复杂
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Order from '../components/order/Order.vue'
import Goods from '../components/goods/Goods.vue'
import AddGoods from '../components/goods/AddGoods.vue'
import GoodsCategory from '../components/goods/GoodsCategory.vue'
import ManagerList from '../components/manager/ManagerList.vue'
import ManagerOrder from '../components/manager/ManagerOrder.vue'
import ManagerReqList from '../components/manager/ManagerReqList.vue'
import TradeInfo from '../components/financial/TradeInfo.vue'
import TradeList from '../components/financial/TradeList.vue'
import DataCom from '../components/financial/DataCom.vue'
import Store from '../tools/Storage' 
// 创建路由实例
const Router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/login',
            component:Login,
            name:"login"
        },
        {
            path:'/home',
            component:Home,
            name:"home"
        },{
            path:'/home',
            component:Home,
            name:"home",
            children:[
                {
                    path:'order/:type',// 0是普通订单 1是秒杀订单,
                    component:Order,
                    name:"Order"
                },{
                    path:'goods/:type',// 0是普通商品 1是秒杀商品 2是今日推荐,
                    component:Goods,
                    name:"Goods"
                },
                {
                    path:'addGoods/:type',// 0是普通商品 1是秒杀商品 2是今日推荐,
                    component:AddGoods,
                    name:"AddGoods"
                },
                {
                    path:'category',
                    component:GoodsCategory,
                    name:"GoodsCategory"
                },{
                    path:'ownerlist',
                    component:ManagerList,
                    name:'ManagerList'
                },
                {
                    path:'ownerreq',
                    component:ManagerReqList,
                    name:'ManagerReqList'
                
                },
                {
                    path:'ownerorder',
                    component:ManagerOrder,
                    name:'ManagerOrder'
                },{
                    path:'tradeinfo',
                    component:TradeInfo,
                    name:'TradeInfo'
                },
                {
                    path:'tradelist',
                    component:TradeList,
                    name:'TradeList'
                },
                {
                    path:'data',
                    component:DataCom,
                    name:'DataCom'
                }
            ],
            redirect:'/home/order/0'
        }
    ]
}) 
// 路由守卫，当未登录时，非登录页面的任何页面都不允许跳转
// Router.beforeEach((from) => {
//     const store = Store()
//     let isLogin = store.isLogin;
//     if (isLogin || from.name == 'login') {
//         return true;
//     } else {
//         return {name: 'login'}
//     }
    
// })
Router.beforeEach((to, from, next) => {
    const store = Store()
    const isLogin = store.isLogin
    // 情况1：已登录时访问登录页 → 强制跳转到首页
    if (isLogin && to.name === 'login') {
        next({ name: 'home' })
        return
    }
    // 情况2：未登录且访问非登录页 → 跳转到登录页
    if (!isLogin && to.name !== 'login') {
        next({ name: 'login' })
        return
    }
    next()
})
export default Router;