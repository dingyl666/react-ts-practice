import {useEffect} from "react";
import {handleCookie} from "./utils";
import {message, Modal} from "antd";
import {setCookie} from "../../services/api";
export const defaultMyCookieKey = 'myNameCookie'

export const useMyCookie = () => {
    /**
     * 首先进入页面去读取一下本地的cookie  暂定为myNameCookie
     * 如果有值 直接进入页面并弹窗欢迎
     * 没有值 则提示去登陆设置一个cookie
     */
    const init = async () => {
        const cookie = handleCookie() ;
        const findMyCookie = cookie.find(dd => dd.key === defaultMyCookieKey) ;

        if(findMyCookie){
            Modal.confirm({
                title:'读取cookie成功',
                content:`欢迎你${findMyCookie?.value}`,
            })
        }else {
            Modal.confirm({
                title:'读取cookie失败',
                content:'点击确定去设置一个登陆cookie',
                onOk:async () => {
                    await setCookie() ;
                    message.success('设置成功') ;
                    init().then() ;
                }
            })
        }
    }

    useEffect(() => {
        init().then() ;
    },[])

    return {
        init
    }
}