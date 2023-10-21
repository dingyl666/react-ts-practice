import {useEffect, useState} from "react";
import {addUser, delUser, getUserList, upDataUser} from "../../services/api";
import {Modal} from "antd";


export class DataModel {
    userId = 0 ;
    name = '' ;
    constructor(id=0,name = '') {
        this.userId = id ;
        this.name = name ;
    }
}
export const useGetList = () => {
    const [list,setList] = useState<DataModel[]>([]) ;

    const [loading,setLoading] = useState(false) ;

    const request = () => {
        setLoading(true)
        getUserList().then(res => {
            setList(res)
            setLoading(false)
        })
    }
    useEffect(() => {
        request()
    },[])

    const add = () => {
        addUser({
            userId:new Date().valueOf(),
            name:'测试数据'+new Date().valueOf()
        }).then(() => {
            request()
        })
    }

    const del = (userId:number) => {
        Modal.confirm({
            title:'确定删除吗？',
            onOk:() => {
                delUser(userId).then(() => {
                    request() ;
                })
            }
        })
    }

    const up = (id:number) => {
        upDataUser({
            name:'测试数据'+new Date().valueOf(),
            userId:id
        }).then(() => {
            request() ;
        })
    }

    return {loading,list,add,del,up}
}

export const User_Session = 'userInfo' ;
export const useCheckLogin = () => {
    const [login,setLogin] = useState(false) ;

    const check = () => {
        try {
            const {id}:any = JSON.parse(window.sessionStorage.getItem(User_Session)!) ;
            if(id) {
                setLogin(true) ;
            }
        }catch (e) {

        }

    }
    useEffect(() => {
        check()
    },[])

    return {
        login,check
    } ;
}