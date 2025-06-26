import React, { useState, useEffect } from 'react';
import { Timeline, Card, Tag, Typography, Select, Pagination, Space, Button } from 'antd';
import { CalendarOutlined, TagOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

interface Changelog {
  id: number;
  toolId: number;
  version: string;
  title: string;
  content: string;
  releaseDate: string;
  type: string;
  isFeatured: boolean;
  tool?: {
    name: string;
    title: string;
  };
}

const ChangelogPage: React.FC = () => {
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState<any[]>([]);
  const [selectedTool, setSelectedTool] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // 获取更新日志列表
  const fetchChangelogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/public/changelogs', {
        params: {
          toolId: selectedTool,
          page: pagination.current,
          size: pagination.pageSize
        }
      });
      
      if (response.data.success) {
        setChangelogs(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.total
        }));
      }
    } catch (error) {
      console.error('获取更新日志失败:', error);
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

  useEffect(() => {
    fetchChangelogs();
  }, [selectedTool, pagination.current]);

  useEffect(() => {
    fetchTools();
  }, []);

  const handleToolChange = (value: number) => {
    setSelectedTool(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize
    }));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      major: 'red',
      minor: 'blue',
      patch: 'green',
      hotfix: 'orange'
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  const getTypeText = (type: string) => {
    const texts = {
      major: '重大更新',
      minor: '功能更新',
      patch: '修复更新',
      hotfix: '紧急修复'
    };
    return texts[type as keyof typeof texts] || type;
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* 页面头部 */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>更新日志</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          查看工具链平台的最新更新和改进
        </Paragraph>
      </div>

      {/* 筛选器 */}
      <div style={{ marginBottom: '32px' }}>
        <Space>
          <Text>筛选工具：</Text>
          <Select
            placeholder="选择工具"
            value={selectedTool}
            onChange={handleToolChange}
            style={{ width: '200px' }}
            allowClear
          >
            {tools.map(tool => (
              <Option key={tool.id} value={tool.id}>
                {tool.title}
              </Option>
            ))}
          </Select>
        </Space>
      </div>

      {/* 更新日志时间线 */}
      <Timeline mode="left">
        {changelogs.map(changelog => (
          <Timeline.Item
            key={changelog.id}
            dot={changelog.isFeatured ? <StarOutlined style={{ color: '#faad14' }} /> : undefined}
            color={changelog.isFeatured ? 'gold' : 'blue'}
          >
            <Card
              style={{ marginBottom: '16px' }}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <Text strong>{changelog.title}</Text>
                    {changelog.isFeatured && <StarOutlined style={{ color: '#faad14' }} />}
                  </Space>
                  <Tag color="blue">{changelog.version}</Tag>
                </div>
              }
              extra={
                <Space>
                  <Tag color={getTypeColor(changelog.type)}>
                    <TagOutlined /> {getTypeText(changelog.type)}
                  </Tag>
                  <Text type="secondary">
                    <CalendarOutlined /> {changelog.releaseDate}
                  </Text>
                </Space>
              }
            >
              {changelog.tool && (
                <div style={{ marginBottom: '12px' }}>
                  <Tag color="geekblue">{changelog.tool.title}</Tag>
                </div>
              )}
              <Paragraph>
                {changelog.content}
              </Paragraph>
            </Card>
          </Timeline.Item>
        ))}
      </Timeline>

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

      {changelogs.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#999' }}>
          暂无更新日志
        </div>
      )}
    </div>
  );
};

export default ChangelogPage;
