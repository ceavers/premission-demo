



/**
 * 
 * 异步路由
 */
export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: ()=>import('@/components/HelloWord'),
        meta: { title: '首页' },
        redirect: '',
        children: [

        ]
    }
]


/**
 * 基础路由
 */
export const constantRouterMap = [
    {
        path: '/404',
        component: () => import('@/views/404')
    }
]