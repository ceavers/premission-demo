import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { SET_ROUTERS } from '@/store/mutation--type'

//根据权限过滤路由
function filterAsyncRouter(routerMap ,roles){
    const accessedRouters = routerMap.filter(route => {
        if(hasPermission(roles.permissionList, route)){
            if(route.children&&route.children.length){
                route.children = filterAsyncRouter(route.children,roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
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
        [SET_ROUTERS]:(state,routers)=>{
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions:{
        GenerateRoutes({ commit },data){
            return new Promise(resolve => {
                const { roles } = data
                const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                commit(SET_ROUTERS,accessedRouters)
                resolve()
            })
        }
    }
}
export default permission