import Login      from './views/Login.vue'
import NotFound   from './views/404.vue'
import Home       from './views/Home.vue'
import Main       from './views/Main.vue'
import Table      from './views/nav1/Table.vue'
import Admin      from './views/nav1/admin.vue'
import Form       from './views/nav1/Form.vue'
import Product    from './views/nav1/product.vue'
import BuyProduct from './views/nav1/buyproduct.vue'
import Order      from './views/nav1/order.vue'
import Member     from './views/nav1/member.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: 'User',
        iconCls: 'fa fa-address-card',//图标样式class
        leaf: true,
        children: [
            { path: '/', component: Table, name: 'Wechat Users' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Member',
        iconCls: 'fa fa-user',
        leaf: true,
        children: [
            { path: '/member', component: Member, name: 'Member' }
        ]
    },{
        path: '/',
        component: Home,
        name: 'Admin',
        iconCls: 'fa fa-unlock-alt',//图标样式class
        leaf: true,
        children: [
            { path: '/admin', component: Admin, name: 'Admin' }
        ]
    },{
        path      : '/',
        component : Home,
        name      : '产品注册',
        iconCls   : 'fa fa-legal',
        leaf      : true,
        children: [
            { path: '/buyproduct', component: BuyProduct, name: '产品注册' },
        ]
    },{
        path      : '/',
        component : Home,
        name      : 'Product',
        iconCls   : 'fa fa-fighter-jet',
        leaf      : true,
        children: [
            { path: '/product', component: Product, name: 'Products' },
        ]
    },{
        path      : '/',
        component : Home,
        name      : 'Store Orders',
        iconCls   : 'fa fa-bars',
        leaf      : true,
        children: [
            { path: '/order', component: Order, name: 'Store Orders' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;