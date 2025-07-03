import React, { useState } from 'react';
import { Row, Col, Typography, Input, Select, Pagination, Spin } from 'antd';
import { useRequest } from 'ahooks';
import ToolCard from '@/components/ToolCard'; // 导入 ToolCard 组件

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

// 封装服务
async function fetchToolsService(params: { category?: string; keyword?: string; current: number; pageSize: number }) {
  const url = new URL('http://localhost:8080/api/public/tools');
  url.searchParams.append('page', String(params.current));
  url.searchParams.append('size', String(params.pageSize));
  if (params.category) url.searchParams.append('category', params.category);
  if (params.keyword) url.searchParams.append('keyword', params.keyword);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('网络错误');
  const data = await res.json();
  if (data.success) return { list: data.data, total: data.total };
  throw new Error(data.message || '获取工具失败');
}

async function fetchCategoriesService() {
  const res = await fetch('http://localhost:8080/api/public/categories');
  if (!res.ok) throw new Error('网络错误');
  const data = await res.json();
  if (data.success) return data.data;
  throw new Error(data.message || '获取分类失败');
}

const DisplayIndex: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data: categories = [] } = useRequest(fetchCategoriesService);
  const { data, loading, pagination } = useRequest(
    ({ current, pageSize }) => fetchToolsService({ current, pageSize, category: selectedCategory, keyword: searchKeyword }),
    {
      paginated: true,
      refreshDeps: [selectedCategory, searchKeyword],
    }
  );

  const getCategoryName = (key: string) => {
    const category = categories.find((cat: any) => cat.key === key);
    return category ? category.name : key;
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>inCODE 工具链平台</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>专业的开发工具链展示平台</Paragraph>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={12}>
            <Search placeholder="搜索工具..." onSearch={setSearchKeyword} size="large" />
          </Col>
          <Col xs={24} md={6}>
            <Select placeholder="选择分类" value={selectedCategory} onChange={setSelectedCategory} style={{ width: '100%' }} size="large" allowClear>
              {categories.map((cat: any) => <Option key={cat.key} value={cat.key}>{cat.name} ({cat.count})</Option>)}
            </Select>
          </Col>
        </Row>
      </div>

      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          {(data?.list || []).map((tool: Tool) => (
            <Col key={tool.id} xs={24} sm={12} lg={8}>
              <ToolCard tool={tool} getCategoryName={getCategoryName} />
            </Col>
          ))}
        </Row>

        {data?.list.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#999' }}>
            暂无工具
          </div>
        )}
      </Spin>

      {data?.total > 0 && (
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Pagination {...pagination} showSizeChanger showQuickJumper showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`} />
        </div>
      )}
    </div>
  );
};

export default DisplayIndex;
