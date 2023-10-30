import {User_Session} from "../pages/NestCrud/utils";

import axios from 'axios'
import {serverConfig} from "./config";
import qs from "qs";

interface IRequestOption {
    method:"POST"|"GET" ,
    params:{[x:string]:any},
}

type IRequestType = (url:string,option:IRequestOption) => Promise<any> ;

export const request:IRequestType = async (url,option) => {
    const newOption:{[x:string]:any} = {} ;
    const paramsMapArray = Object.keys(option.params)
    if(option.method === 'GET') {
        if(paramsMapArray.length) {
            url += ('?'+paramsMapArray.map(mm => `${mm}=${option.params[mm]}`).join('&'))
        }
    }else if(option.method === 'POST') {
        newOption['body'] = JSON.stringify(option.params) ;
    }

    newOption['url'] = url ;
    newOption['mode'] = 'cors' ;
    newOption['method'] = option.method ;
    newOption['headers'] = {
        'credentials': "include",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    try {
        const user = JSON.parse(window.sessionStorage.getItem(User_Session)!) ;
        if(user) {
            newOption['headers']['user'] = JSON.stringify(user) ;
        }
    }catch (e) {

    }

    const res = await fetch(url,newOption) ;
    return res.json() ;
}



const serviceAxios = axios.create({
    baseURL:serverConfig.baseURL,
    timeout:10000,
    withCredentials: false, // 跨域请求是否需要携带 cookie
})

//创建请求拦截
serviceAxios.interceptors.request.use((config) => {
    if(serverConfig.useTokenAuthorization) {
        //如果开启token认证 ;
        // @ts-ignore
        config["Authorization"] = localStorage.getItem('token') ;
    }
    //设置请求头
    if(!config.headers["content-type"]) {
        if(config.method === 'post') {
            config.headers["content-type"] = "application/x-www-form-urlencoded" ;
            config.data = qs.stringify(config.data) ;//序列化
        }else {
            config.headers["content-type"] = "application/json; charset=utf-8" ;//默认类型
        }
    }
    return config ;
},error =>{
    Promise.reject(error).then() ;
})


//创建响应拦截
serviceAxios.interceptors.response.use(
    res => {
        const data = res.data ;
        // 处理自己的业务逻辑，比如判断 token 是否过期等等
        // 代码块
        return data;
    },
    error => {
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    message = "接口重定向了！";
                    break;
                case 400:
                    message = "参数不正确！";
                    break;
                case 401:
                    message = "您未登录，或者登录已经超时，请先登录！";
                    break;
                case 403:
                    message = "您没有权限操作！";
                    break;
                case 404:
                    message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    message = "请求超时！";
                    break;
                case 409:
                    message = "系统已存在相同数据！";
                    break;
                case 500:
                    message = "服务器内部错误！";
                    break;
                case 501:
                    message = "服务未实现！";
                    break;
                case 502:
                    message = "网关错误！";
                    break;
                case 503:
                    message = "服务不可用！";
                    break;
                case 504:
                    message = "服务暂时无法访问，请稍后再试！";
                    break;
                case 505:
                    message = "HTTP 版本不受支持！";
                    break;
                default:
                    message = "异常问题，请联系管理员！";
                    break;
            }
        }
        return Promise.reject(message);
    }
)

export default serviceAxios ;

