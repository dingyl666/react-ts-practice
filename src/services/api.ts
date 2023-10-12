import {request} from "./request";

const BaseUrl = 'http://localhost:8888/api/v1' ;


export const addUser = async (params:{ userId:number,name:string, }) => {
    return await request(BaseUrl + '/user/add', {
        method: "POST",
        params: params
    })
}

export const delUser = async (userId:number) => {
    return await request(BaseUrl + '/user/del', {
        method: "POST",
        params: {userId}
    })
}

export const upDataUser = async (params:{ userId:number,name:string, }) => {
    return await request(BaseUrl + '/user/up', {
        method: "POST",
        params: params
    })
}

export const getUserList = async () => {
    return await request(BaseUrl + '/user/getList', {
        method: "GET",
        params: {}
    })
}

export const getUserId = async (userId:number) => {
    return await request(BaseUrl + '/user/getInfo', {
        method: "GET",
        params: {
            userId
        }
    })
}
export const setCookie = async () => {
    return await request(BaseUrl + '/user/setCookie', {
        method: "GET",
        params: {}
    })
}