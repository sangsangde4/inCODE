import React from 'react';
import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useRequest } from 'ahooks';

const { Title, Paragraph } = Typography;

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

// 1. 封装登录请求服务
// 这是一个独立的函数，负责调用 API
// useRequest 会将表单数据作为第一个参数传递给它
async function loginService(values: Pick<LoginForm, 'username' | 'password'>) {
  // 注意：这里我们假设有一个代理或直接可访问的后端服务
  // 在实际项目中，你可能需要配置 Umi 的代理来解决跨域问题
  const response = await fetch('http://localhost:8080/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    // 如果 HTTP 状态码不是 2xx，也认为是错误
    const errorData = await response.json().catch(() => ({})); // 尝试解析错误信息
    throw new Error(errorData.message || '网络请求失败');
  }

  const data = await response.json();

  if (data.success) {
    return data; // 成功时，返回整个数据对象
  } else {
    // 如果业务上失败，也抛出错误
    throw new Error(data.message || '登录失败');
  }
}

const AdminLogin: React.FC = () => {

  // 2. 使用 useRequest 管理登录逻辑
  const { loading, run: runLogin } = useRequest(loginService, {
    manual: true, // 设置为手动触发，不在组件加载时自动执行
    onSuccess: (result, params) => {
      // 登录成功后的回调
      localStorage.setItem('admin_token', result.token);
      localStorage.setItem('admin_user', JSON.stringify(result.user));
      message.success('登录成功！');
      history.push('/admin/dashboard');
    },
    onError: (error) => {
      // 登录失败后的回调
      message.error(error.message);
      history.push('/admin/dashboard'); // 即使失败也跳转，与原逻辑保持一致
    },
  });

  // 3. 表单提交时，调用 runLogin 来触发请求
  const onFinish = (values: LoginForm) => {
    runLogin({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ color: '#1890ff', marginBottom: '8px' }}>
            管理后台
          </Title>
          <Paragraph type="secondary">
            inCODE 工具链平台管理系统
          </Paragraph>
        </div>

        <Form
          name="admin_login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 3, message: '用户名至少3个字符!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少6个字符!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading} // loading 状态由 useRequest 自动管理
              style={{ width: '100%', height: '44px' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Paragraph type="secondary" style={{ fontSize: '12px' }}>
            默认账号：admin / 123456
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;