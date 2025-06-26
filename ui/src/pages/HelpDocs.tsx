import React, { useState, useEffect } from 'react';
import { Row, Col, Card, List, Typography, Input, Select, Tag, Button, Drawer } from 'antd';
import { FileTextOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface HelpDoc {
  id: number;
  toolId?: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  tool?: {
    name: string;
    title: string;
  };
}

const HelpDocsPage: React.FC = () => {
  const [docs, setDocs] = useState<HelpDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<HelpDoc | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // 获取帮助文档列表
  const fetchDocs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/public/help-docs', {
        params: {
          toolId: selectedTool,
          category: selectedCategory
        }
      });
      
      if (response.data.success) {
        setDocs(response.data.data);
        // 提取分类
        const cats = [...new Set(response.data.data.map((doc: HelpDoc) => doc.category))];
        setCategories(cats);
      }
    } catch (error) {
      console.error('获取帮助文档失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取工具列表
  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/public/tools');
      if (response.data.success) {
        setTools(response.data.data);
      }
    } catch (error) {
      console.error('获取工具列表失败:', error);
    }
  };

  // 获取文档详情
  const fetchDocDetail = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/public/help-docs/${id}`);
      if (response.data.success) {
        setSelectedDoc(response.data.data);
        setDrawerVisible(true);
      }
    } catch (error) {
      console.error('获取文档详情失败:', error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [selectedTool, selectedCategory]);

  useEffect(() => {
    fetchTools();
  }, []);

  const handleToolChange = (value: number) => {
    setSelectedTool(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleDocClick = (doc: HelpDoc) => {
    fetchDocDetail(doc.id);
  };

  const getCategoryName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      'getting-started': '快速开始',
      'configuration': '配置指南',
      'faq': '常见问题',
      'api': 'API文档',
      'tutorial': '教程指南'
    };
    return categoryNames[category] || category;
  };

  const filteredDocs = docs.filter(doc => 
    !searchKeyword || 
    doc.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 页面头部 */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>帮助文档</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          查找使用指南、配置说明和常见问题解答
        </Paragraph>
      </div>

      <Row gutter={24}>
        {/* 左侧筛选和搜索 */}
        <Col span={6}>
          <Card title="筛选和搜索" style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>搜索文档</Text>
              <Search
                placeholder="搜索标题或内容..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{ marginTop: '8px' }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong>选择工具</Text>
              <Select
                placeholder="所有工具"
                value={selectedTool}
                onChange={handleToolChange}
                style={{ width: '100%', marginTop: '8px' }}
                allowClear
              >
                {tools.map(tool => (
                  <Option key={tool.id} value={tool.id}>
                    {tool.title}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Text strong>文档分类</Text>
              <Select
                placeholder="所有分类"
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ width: '100%', marginTop: '8px' }}
                allowClear
              >
                {categories.map(category => (
                  <Option key={category} value={category}>
                    {getCategoryName(category)}
                  </Option>
                ))}
              </Select>
            </div>
          </Card>

          {/* 分类快速导航 */}
          <Card title="快速导航">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map(category => (
                <Button
                  key={category}
                  type={selectedCategory === category ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setSelectedCategory(category)}
                  style={{ textAlign: 'left' }}
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          </Card>
        </Col>

        {/* 右侧文档列表 */}
        <Col span={18}>
          <List
            loading={loading}
            dataSource={filteredDocs}
            renderItem={doc => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  onClick={() => handleDocClick(doc)}
                >
                  <Card.Meta
                    avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{doc.title}</span>
                        <div>
                          <Tag color="blue">{getCategoryName(doc.category)}</Tag>
                          {doc.tool && <Tag color="geekblue">{doc.tool.title}</Tag>}
                        </div>
                      </div>
                    }
                    description={
                      <div>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '12px' }}>
                          {doc.content.replace(/[#*`]/g, '').substring(0, 150)}...
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            {doc.tags.slice(0, 3).map(tag => (
                              <Tag key={tag} size="small">{tag}</Tag>
                            ))}
                          </div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            <EyeOutlined /> {doc.viewCount} 次浏览
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            }}
          />

          {filteredDocs.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '48px', color: '#999' }}>
              未找到相关文档
            </div>
          )}
        </Col>
      </Row>

      {/* 文档详情抽屉 */}
      <Drawer
        title={selectedDoc?.title}
        placement="right"
        width={800}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        extra={
          selectedDoc && (
            <div>
              <Tag color="blue">{getCategoryName(selectedDoc.category)}</Tag>
              {selectedDoc.tool && <Tag color="geekblue">{selectedDoc.tool.title}</Tag>}
            </div>
          )
        }
      >
        {selectedDoc && (
          <div>
            <div style={{ marginBottom: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '6px' }}>
              <Text type="secondary">
                <EyeOutlined /> {selectedDoc.viewCount} 次浏览 | 
                创建于 {new Date(selectedDoc.createdAt).toLocaleDateString()}
              </Text>
            </div>
            <div style={{ lineHeight: '1.8' }}>
              <ReactMarkdown>{selectedDoc.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default HelpDocsPage;
