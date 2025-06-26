import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined, FileTextOutlined, BookOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/reset.css';

// 页面组件
import Home from './pages/Home';
import Changelog from './pages/Changelog';
import HelpDocs from './pages/HelpDocs';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// 创建 React Query 客户端
const queryClient = new QueryClient();

// 公共布局组件
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Title level={3} style={{ margin: 0, marginRight: '48px', color: '#1890ff' }}>
          inCODE
        </Title>
        <Menu
          mode="horizontal"
          style={{ flex: 1, border: 'none' }}
          items={[
            {
              key: 'home',
              icon: <HomeOutlined />,
              label: '首页'
            },
            {
              key: 'changelog',
              icon: <FileTextOutlined />,
              label: '更新日志'
            },
            {
              key: 'help',
              icon: <BookOutlined />,
              label: '帮助文档'
            },
            {
              key: 'admin',
              icon: <SettingOutlined />,
              label: '管理后台'
            }
          ]}
          onClick={({ key }) => {
            switch (key) {
              case 'home':
                window.location.href = '/';
                break;
              case 'changelog':
                window.location.href = '/changelog';
                break;
              case 'help':
                window.location.href = '/help';
                break;
              case 'admin':
                window.location.href = '/admin';
                break;
            }
          }}
        />
      </Header>
      <Content style={{ background: '#f0f2f5' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        inCODE 工具链平台 ©2024 Created by inCODE Team
      </Footer>
    </Layout>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* 公共展示页面 */}
          <Route path="/" element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          } />
          <Route path="/changelog" element={
            <PublicLayout>
              <Changelog />
            </PublicLayout>
          } />
          <Route path="/help" element={
            <PublicLayout>
              <HelpDocs />
            </PublicLayout>
          } />

          {/* 管理后台 */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* 默认重定向 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
