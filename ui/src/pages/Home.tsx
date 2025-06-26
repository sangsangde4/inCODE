import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Button, Typography, Space, Input, Select, Pagination } from 'antd';
import { GithubOutlined, DownloadOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Tool {
  id: number;
  name: string;
  title: string;
  description: string;
  logoUrl?: string;
  version: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  downloadUrl?: string;
  documentationUrl?: string;
  viewCount: number;
  updatedAt: string;
}

const Home: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  });

  // 获取工具列表
  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/public/tools', {
        params: {
          category: selectedCategory,
          page: pagination.current,
          size: pagination.pageSize
        }
      });
      
      if (response.data.success) {
        setTools(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.total
        }));
      }
    } catch (error) {
      console.error('获取工具列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/public/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('获取分类列表失败:', error);
    }
  };

  useEffect(() => {
    fetchTools();
  }, [selectedCategory, pagination.current]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize
    }));
  };

  const getCategoryName = (key: string) => {
    const category = categories.find(cat => cat.key === key);
    return category ? category.name : key;
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 页面头部 */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>inCODE 工具链平台</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          专业的开发工具链展示平台，为开发者提供优质的工具和服务
        </Paragraph>
      </div>

      {/* 搜索和筛选 */}
      <div style={{ marginBottom: '32px' }}>
        <Row gutter={16} align="middle">
          <Col span={12}>
            <Search
              placeholder="搜索工具..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onSearch={fetchTools}
              size="large"
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="选择分类"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ width: '100%' }}
              size="large"
              allowClear
            >
              {categories.map(category => (
                <Option key={category.key} value={category.key}>
                  {category.name} ({category.count})
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {/* 工具卡片列表 */}
      <Row gutter={[24, 24]}>
        {tools.map(tool => (
          <Col key={tool.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                tool.logoUrl ? (
                  <img
                    alt={tool.title}
                    src={tool.logoUrl}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      height: '200px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    {tool.title}
                  </div>
                )
              }
              actions={[
                tool.githubUrl && (
                  <Button
                    type="link"
                    icon={<GithubOutlined />}
                    href={tool.githubUrl}
                    target="_blank"
                  >
                    GitHub
                  </Button>
                ),
                tool.downloadUrl && (
                  <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    href={tool.downloadUrl}
                    target="_blank"
                  >
                    下载
                  </Button>
                ),
                tool.documentationUrl && (
                  <Button
                    type="link"
                    icon={<FileTextOutlined />}
                    href={tool.documentationUrl}
                    target="_blank"
                  >
                    文档
                  </Button>
                )
              ].filter(Boolean)}
            >
              <Card.Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{tool.title}</span>
                    <Tag color="blue">{tool.version}</Tag>
                  </div>
                }
                description={
                  <div>
                    <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '12px' }}>
                      {tool.description}
                    </Paragraph>
                    <div style={{ marginBottom: '12px' }}>
                      <Tag color="geekblue">{getCategoryName(tool.category)}</Tag>
                      {tool.tags.slice(0, 2).map(tag => (
                        <Tag key={tag} color="default">{tag}</Tag>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '12px' }}>
                      <span>
                        <EyeOutlined /> {tool.viewCount} 次浏览
                      </span>
                      <span>
                        更新于 {new Date(tool.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 分页 */}
      {pagination.total > 0 && (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
