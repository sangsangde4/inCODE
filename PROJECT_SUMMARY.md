# inCODE 工具链展示平台 - 项目总结

## 项目概述

这是一个完整的工具链展示和管理系统，包含公开展示页面和管理后台。系统采用前后端分离架构，前端使用React + TypeScript + Ant Design，后端使用Spring Boot + Java。

## 功能特性

### 公开展示页面（无需登录）
- **工具展示页面**：展示所有工具的卡片列表，支持分类筛选和搜索
- **更新日志页面**：时间线形式展示工具的版本更新历史
- **帮助文档页面**：分类展示帮助文档，支持Markdown渲染

### 管理后台（需要登录）
- **登录系统**：管理员身份验证
- **仪表板**：统计数据展示和快速操作
- **工具管理**：增删改查工具信息
- **更新日志管理**：管理版本更新记录
- **帮助文档管理**：管理帮助文档内容

## 技术架构

### 前端技术栈
- **React 18** + **TypeScript**：现代化前端框架
- **Ant Design 5**：企业级UI组件库
- **React Router 6**：路由管理
- **Axios**：HTTP客户端
- **React Query**：数据状态管理
- **Zustand**：轻量级状态管理
- **React Markdown**：Markdown渲染
- **Vite**：构建工具

### 后端技术栈
- **Spring Boot 3**：Java后端框架
- **Spring Security**：安全框架
- **Spring Data JPA**：数据访问层
- **MyBatis-Plus**：ORM框架
- **MySQL**：关系型数据库
- **Redis**：缓存数据库
- **JWT**：身份认证
- **Knife4j**：API文档

## 项目结构

```
inCODE/
├── ui/                          # 前端项目
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx         # 工具展示页面
│   │   │   ├── Changelog.tsx    # 更新日志页面
│   │   │   ├── HelpDocs.tsx     # 帮助文档页面
│   │   │   └── admin/
│   │   │       ├── Login.tsx    # 管理员登录
│   │   │       └── Dashboard.tsx # 管理后台仪表板
│   │   └── App.tsx              # 路由配置
│   └── package.json
├── server/                      # 后端项目
│   ├── src/main/java/com/incode/server/
│   │   ├── entity/              # 实体类
│   │   │   ├── Tool.java
│   │   │   ├── Changelog.java
│   │   │   ├── HelpDoc.java
│   │   │   └── AdminUser.java
│   │   └── controller/          # 控制器
│   │       ├── PublicController.java  # 公开API
│   │       └── AdminController.java   # 管理API
│   └── pom.xml
├── database/
│   └── schema.sql               # 数据库设计
└── README.md
```

## 数据库设计

### 核心表结构
1. **tools** - 工具信息表
2. **changelogs** - 更新日志表
3. **help_docs** - 帮助文档表
4. **admin_users** - 管理员用户表
5. **system_configs** - 系统配置表

## API设计

### 公开API（/api/public）
- `GET /tools` - 获取工具列表
- `GET /tools/{id}` - 获取工具详情
- `GET /changelogs` - 获取更新日志
- `GET /help-docs` - 获取帮助文档
- `GET /categories` - 获取分类列表

### 管理API（/api/admin）
- `POST /login` - 管理员登录
- `GET /user/info` - 获取用户信息
- `GET|POST|PUT|DELETE /tools` - 工具管理
- `GET|POST|PUT|DELETE /changelogs` - 更新日志管理
- `GET|POST|PUT|DELETE /help-docs` - 帮助文档管理

## 部署说明

### 前端部署
```bash
cd ui
npm install
npm run build
# 将dist目录部署到Web服务器
```

### 后端部署
```bash
cd server
./mvnw clean package
java -jar target/incode-server-*.jar
```

### 数据库初始化
```bash
mysql -u root -p < database/schema.sql
```

## 默认账号

- **管理员账号**：admin
- **默认密码**：123456

## 开发环境启动

### 启动后端
```bash
cd server
./mvnw spring-boot:run
```
后端服务运行在：http://localhost:8080/api

### 启动前端
```bash
cd ui
npm run dev
```
前端服务运行在：http://localhost:5173

## 特色功能

1. **响应式设计**：支持桌面端和移动端
2. **模块化架构**：前后端完全分离
3. **权限控制**：公开页面无需登录，管理页面需要认证
4. **数据展示**：丰富的数据可视化和交互
5. **内容管理**：完整的CRUD操作支持
6. **搜索筛选**：多维度数据筛选和搜索
7. **Markdown支持**：帮助文档支持Markdown格式

## 扩展建议

1. **文件上传**：支持图片和文档上传
2. **用户系统**：扩展用户注册和权限管理
3. **评论系统**：为工具和文档添加评论功能
4. **统计分析**：添加访问统计和数据分析
5. **国际化**：支持多语言切换
6. **主题切换**：支持深色/浅色主题
7. **通知系统**：添加消息通知功能

## 技术亮点

- 使用最新的React 18和Spring Boot 3
- 采用TypeScript提供类型安全
- 使用Ant Design提供一致的用户体验
- 支持Markdown渲染增强内容展示
- 模拟数据接口便于开发和演示
- 完整的前后端分离架构
- 响应式设计适配多种设备
