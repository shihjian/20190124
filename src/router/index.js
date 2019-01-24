import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/pages/Login'
// import Home from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrder from '@/components/pages/CustomerOrders'
import HomePage from '@/components/homepage'
Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'login',
        },
        {
            name:'Login',
            path:'/login',
            component:Login,
        },

        {
            name:'HomePage',
            path:'/homepage',
            component:HomePage,
        },

        // {
        //     name:'Home',
        //     path:'/',
        //     component:Home,
        //     meta: { requiresAuth: true },
        // },
        
        {
            name:'Dashboard',
            path:'/',
            component:Dashboard,
            children:[
                {
                    path:'customer_order',
                    name:'CustomerOrder',
                    component:CustomerOrder,
                },
            ],
        },

        {
            name:'Dashboard',
            path:'/admin',
            component:Dashboard,
            children:[
                {
                    path:'Products',
                    name:'Products',
                    component:Products,
                    meta: { requiresAuth: true },
                },
            ],
        },
    ],
});