import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import baseUrl from '@/config/baseURL.config'
import {ACCESS_TOKEN} from '@/store/mutation-type'


const {api:{devApiBaseUrl,proApiBaseUrl}} = baseUrl
const apiBaseUrl = process.env.NODE_ENV === 'production'?proApiBaseUrl:devApiBaseUrl

const service = axios.create({
    baseURL:apiBaseUrl,
    timeout:6000
})

const err = (error) => {
    if(error.response){
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
        if(error.response.status === 403){
            return Promise.reject(data.message)
        }
    }
    if(error.response.status === 401 && !(data.result&&data.result.isLogin)){
        return Promise.reject('授权失败')
    }
    if(token){
        
    }
}