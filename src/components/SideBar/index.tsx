import PageWrapper from "../PageWrapper";
import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import {NavLink, Route, Router, Routes, useNavigate, useParams} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),

    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),

        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];

const AppCom: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate() ;

    return (
        <div style={{ width: 256 }}>
            <Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                onClick={item => navigate(`/content/${item.key}`)}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export const MyRouterNode:React.FC = () => {
    const params = useParams() ;
    console.log(params,'pppp')
    return <h2>111</h2>
}
const SideBar:React.FC = () => {
    return (
        <PageWrapper>
            <AppCom />
            <NavLink to={'content/1'} >111</NavLink>
            <NavLink to={'content/2'} >222</NavLink>
            {/*<Router >*/}
                <Routes>
                    <Route path={'content/1'} element={<MyRouterNode />} />
                </Routes>
            {/*</Router>*/}

        </PageWrapper>
    )
}

export default React.memo(SideBar) ;