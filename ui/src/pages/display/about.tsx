import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2}>关于 inCODE 工具链平台</Title>
        <Paragraph>
          inCODE 工具链平台致力于为开发者提供一站式的工具发现、管理和使用体验。
          我们汇集了各类开发工具，包括代码分析、测试、部署、文档生成等，旨在提升开发效率和项目质量。
        </Paragraph>
        <Paragraph>
          我们的愿景是构建一个开放、共享的开发者社区，让优秀的工具能够被更多人发现和利用。
        </Paragraph>
        <Title level={3}>联系我们</Title>
        <Paragraph>
          如果您有任何疑问、建议或合作意向，请随时通过以下方式联系我们：
        </Paragraph>
        <ul>
          <li>邮箱：<a href="mailto:support@incode.com">support@incode.com</a></li>
          <li>GitHub：<a href="https://github.com/inCODE" target="_blank" rel="noopener noreferrer">github.com/inCODE</a></li>
        </ul>
      </Card>
    </div>
  );
};

export default AboutPage;
