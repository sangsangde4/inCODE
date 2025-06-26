import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Button, Avatar, Dropdown, Space } from 'antd';
import {
  DashboardOutlined,
  ToolOutlined,
  FileTextOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    toolCount: 0,
    changelogCount: 0,
    docCount: 0,
    viewCount: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 获取用户信息
    const userInfo = localStorage.getItem('admin_user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      navigate('/admin/login');
    }

    // 获取统计数据
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // 这里应该调用实际的统计API
      setStats({
        toolCount: 12,
        changelogCount: 45,
        docCount: 28,
        viewCount: 15420
      });
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  const sidebarMenu = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表板'
    },
    {
      key: 'tools',
      icon: <ToolOutlined />,
      label: '工具管理'
    },
    {
      key: 'changelogs',
      icon: <FileTextOutlined />,
      label: '更新日志'
    },
    {
      key: 'help-docs',
      icon: <BookOutlined />,
      label: '帮助文档'
    }
  ];

  const renderDashboardContent = () => (
    <div>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="工具总数"
              value={stats.toolCount}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="更新日志"
              value={stats.changelogCount}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="帮助文档"
              value={stats.docCount}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总浏览量"
              value={stats.viewCount}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 最近活动 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="最新工具" extra={<Button type="link">查看全部</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Code Analyzer', version: '2.1.0', status: 'active' },
                { name: 'API Tester', version: '1.5.2', status: 'active' },
                { name: 'Deploy Helper', version: '3.0.1', status: 'active' }
              ].map((tool, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{tool.name}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>版本 {tool.version}</div>
                  </div>
                  <Tag color="green">活跃</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最新更新日志" extra={<Button type="link">查看全部</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: '新增代码质量评分功能', version: '2.1.0', date: '2024-01-15' },
                { title: '修复内存泄漏问题', version: '2.0.5', date: '2024-01-10' },
                { title: '支持GraphQL协议测试', version: '1.5.2', date: '2024-01-08' }
              ].map((log, index) => (
                <div key={index}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{log.title}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    版本 {log.version} • {log.date}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderContent = () => {
    switch (currentMenu) {
      case 'dashboard':
        return renderDashboardContent();
      case 'tools':
        return <div>工具管理页面（待实现）</div>;
      case 'changelogs':
        return <div>更新日志管理页面（待实现）</div>;
      case 'help-docs':
        return <div>帮助文档管理页面（待实现）</div>;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'iC' : 'inCODE'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentMenu]}
          items={sidebarMenu}
          onClick={({ key }) => setCurrentMenu(key)}
        />
      </Sider>
      
      <Layout>
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <Space>
            <span>欢迎回来，{user?.realName || user?.username}</span>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{
          margin: '24px',
          padding: '24px',
          background: '#fff',
          borderRadius: '6px'
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
