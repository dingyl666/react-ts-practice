import React from "react";
import {useMyCookie} from "./hooks";
import {Button} from "antd";

const CookieTest:React.FC = () => {
    const {init} = useMyCookie() ;
    return (
        <>
            <h2>现在设置不上cookie是因为没在同一个域名下，浏览器做了限制</h2>
            <Button danger={true} type={'primary'} onClick={() => {
                document.cookie = '' ;
                init().then() ;
            }}>退出登录</Button>
        </>
    )
}

export default React.memo(CookieTest)