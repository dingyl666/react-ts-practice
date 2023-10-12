import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SwaggerMini from "../../pages/SwaggerMini";
import App from "../../App";
import {DecoratorDemo} from "../../pages/DecoratorDemo";
import NestCrud from "../../pages/NestCrud";
import SideBar from "../SideBar";
import CookieTest from "../../pages/CookieTest";


const RouterConfig:React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*重定向<Navigate to="/login" replace/>*/}
                    <Route path={'/'} element={<App />} />
                    <Route path={'/swagger'} element={<SwaggerMini />} >
                        {/*index 用来指定默认渲染哪个路由*/}
                        <Route index path={':id'} element={<SwaggerMini />} />
                    </Route>
                    {/*关于NotFound类路由，可以用*来代替*/}
                    <Route path="*" element={<h1>error..</h1>} />
                    {/*这里的*只能用在/后面，不能用在实际路径中间*/}
                    <Route path={'/decorator/*'} element={<DecoratorDemo />} />
                    <Route path={'/nest/crud'} element={<NestCrud />} />
                    <Route path={'/cookieTest'} element={<CookieTest />} />
                    <Route path={'/wrapper'} element={<SideBar />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default React.memo(RouterConfig) ;