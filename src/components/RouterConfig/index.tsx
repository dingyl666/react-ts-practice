import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SwaggerMini from "../../pages/SwaggerMini";
import App from "../../App";
import {DecoratorDemo} from "../DecoratorDemo";

const RouterConfig:React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<App />} />
                    <Route path={'/swagger'} element={<SwaggerMini />} />
                    <Route path={'/swagger/:id'} element={<SwaggerMini />} />
                    <Route path={'/decorator'} element={<DecoratorDemo />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default React.memo(RouterConfig) ;