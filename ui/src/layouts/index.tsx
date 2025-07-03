import React from 'react';
import {Layout, Menu, Typography} from 'antd';
import {HomeOutlined, SettingOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {Link, Outlet, useLocation} from "@umijs/max";

const {Header, Content, Footer} = Layout;
const {Title} = Typography;

const PublicLayout: React.FC = () => {
    const location = useLocation();

    // 从路径中提取当前选中的菜单项
    const currentKey = location.pathname.split('/')[1] || 'home';

    // /admin 路径下的页面不使用此布局
    if (location.pathname.startsWith('/admin')) {
        return <Outlet/>;
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '0 24px'
            }}>
                <Title level={3} style={{margin: 0, marginRight: '48px', color: '#1890ff'}}>
                    <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>inCODE</Link>
                </Title>
                <Menu mode="horizontal"
                    selectedKeys={[currentKey]}
                    style={{flex: 1, border: 'none'}}
                    items={[
                        {
                            key: 'home',
                            icon: <HomeOutlined/>,
                            label: <Link to="/">首页</Link>
                        },
                        {
                            key: 'about',
                            icon: <InfoCircleOutlined/>,
                            label: <Link to="/display/about">关于</Link>
                        },
                        {
                            key: 'admin',
                            icon: <SettingOutlined/>,
                            label: <Link to="/admin/login">管理后台</Link>
                        }
                    ]}>
                </Menu>
            </Header>
            <Content style={{background: '#f0f2f5', padding: '24px'}}>
                {/* Umi 会在这里渲染子页面 */}
                <Outlet/>
            </Content>
            <Footer style={{textAlign: 'center', background: 'transparent'}}>
                inCODE 工具链平台 ©{new Date().getFullYear()} Created by inCODE Team
            </Footer>
        </Layout>
    );
};

export default PublicLayout;
