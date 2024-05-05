import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MyContent from '../MyContent.jsx';
const { Header, Sider, Content } = Layout;


const LayoutDesign = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("1");
    let loggedinUserLocal = JSON.parse(localStorage.getItem("loggedinuser"))
    const [taskPanel, setTaskPanel] = useState(loggedinUserLocal ? loggedinUserLocal : false);


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        onClick={(e) => {
                            setSelectedMenu(e.key)
                        }}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            taskPanel ? {
                                key: '3',
                                icon: <LoginOutlined />,
                                label: 'Out',
                            }
                                :
                                {
                                    key: '1',
                                    icon: <LoginOutlined />,
                                    label: 'Login',
                                },
                            ,
                            {
                                key: '2',
                                icon: <LoginOutlined />,
                                label: 'Register',
                            },

                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                    >

                        <MyContent taskPanel={taskPanel} setTaskPanel={setTaskPanel} id={selectedMenu} setSelectedMenu={setSelectedMenu}/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default LayoutDesign
