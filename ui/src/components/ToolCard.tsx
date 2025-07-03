import React from 'react';
import { Card, Tag, Button, Typography, Space } from 'antd';
import { GithubOutlined, DownloadOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

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

interface ToolCardProps {
  tool: Tool;
  getCategoryName: (key: string) => string;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, getCategoryName }) => {
  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        tool.logoUrl ? (
          <img alt={tool.title} src={tool.logoUrl} style={{ height: '200px', objectFit: 'cover' }} />
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
  );
};

export default ToolCard;
