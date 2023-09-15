import {request} from "./request";

const baseUrl = 'http://localhost:8888' ;


export const addUser = async (params:{ userId:number,name:string, }) => {
    return await request(baseUrl + '/user/add', {
        method: "POST",
        params: params
    })
}

export const delUser = async (userId:number) => {
    return await request(baseUrl + '/user/del', {
        method: "POST",
        params: {userId}
    })
}

export const upDataUser = async (params:{ userId:number,name:string, }) => {
    return await request(baseUrl + '/user/up', {
        method: "POST",
        params: params
    })
}

export const getUserList = async () => {
    return await request(baseUrl + '/user/getList', {
        method: "GET",
        params: {}
    })
}

export const getUserId = async (userId:number) => {
    return await request(baseUrl + '/user/getInfo', {
        method: "GET",
        params: {
            userId
        }
    })
}