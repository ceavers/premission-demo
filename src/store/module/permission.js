import { asyncRouterMap, constantRouterMap } from '@/config/router.config'


//根据权限过滤路由
function filterAsyncRouter(routerMap ,roles){
    const accessedRouters = routerMap.filter(route => {
        if(hasPermission(roles.permissionList, route)){

        }
    })
}


function hasPermission(permission, route){
    if(route.meta && route.meta.permission){
        let flag = false
        for(let i = 0,len = permission.length;i<len;i++){
            flag = route.meta.permission.includes(permission[i])
            if(flag){
                return true
            }
        }
        return false
    }
    //没有配置 默认有权限
    return true
}

const permission = {
    state:{
        routers: constantRouterMap,
        addRouters: []
    },
    mutations:{

    },
    actions:{
        GenerateRoutes({ commit },data){
            return new Promise(resolve => {
                const { roles } = data
                const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            })
        }
    }
}
export default permission