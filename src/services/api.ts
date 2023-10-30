import serviceAxios, {request} from "./request";
import {BaseUrl} from "./config";

//get 请求需要传 params，post 请求需要传 data。

export const addUser = async (params:{ userId:number,name:string, }) => {
    return await request(BaseUrl + 'v1/user/add', {
        method: "POST",
        params: params
    })
}

export const delUser = async (userId:number) => {
    return await request(BaseUrl + 'v1/user/del', {
        method: "POST",
        params: {userId}
    })
}

export const upDataUser = async (params:{ userId:number,name:string, }) => {
    return await request(BaseUrl + 'v1/user/up', {
        method: "POST",
        params: params
    })
}

// export const getUserList = async () => {
//     return await request(BaseUrl + 'v1/user/getList', {
//         method: "GET",
//         params: {}
//     })
// }
export const getUserList = async () => {
    return serviceAxios({
        url:'v1/user/getList',
        method: "GET",
    })
}


export const getUserId = async (userId:number) => {
    return await request(BaseUrl + 'v1/user/getInfo', {
        method: "GET",
        params: {
            userId
        }
    })
}
export const setCookie = async () => {
    return await request(BaseUrl + 'v1/user/setCookie', {
        method: "GET",
        params: {}
    })
}


export const userLogin = async (params:{
    name:string,
    password:string,
}):Promise<any> => {
    return await request(BaseUrl + 'v1/user/login',{
        method:"POST",
        params,
    })
}