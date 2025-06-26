# inCODE 工具链展示平台 - 快速启动指南

## 🚀 项目已完成初始化！

恭喜！您的inCODE工具链展示平台已经成功初始化完成。以下是快速启动和使用指南。

## 📁 项目结构

```
inCODE/
├── ui/                    # 前端项目 (React + TypeScript + Ant Design)
├── server/               # 后端项目 (Spring Boot + Java)
├── database/            # 数据库设计文件
├── PROJECT_SUMMARY.md   # 项目详细说明
└── QUICK_START.md      # 本文件
```

## 🎯 当前状态

✅ **前端项目**：已初始化并成功启动
- 运行地址：http://localhost:5173
- 技术栈：React 18 + TypeScript + Ant Design 5 + Vite

✅ **后端项目**：已初始化并可以启动
- 运行地址：http://localhost:8080/api
- 技术栈：Spring Boot 3 + Java 17

✅ **数据库设计**：已完成
- 包含5个核心表的完整设计
- 提供了示例数据

## 🏃‍♂️ 立即体验

### 1. 查看前端页面
前端已经在运行，直接访问：
- **主页**：http://localhost:5173
- **更新日志**：http://localhost:5173/changelog  
- **帮助文档**：http://localhost:5173/help
- **管理后台**：http://localhost:5173/admin

### 2. 启动后端服务
```bash
cd server
./mvnw spring-boot:run
```

### 3. 测试API接口
后端启动后，可以测试以下接口：
```bash
# 获取工具列表
curl http://localhost:8080/api/public/tools

# 管理员登录
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

## 🎨 页面功能预览

### 公开展示页面
1. **工具展示页面**
   - 工具卡片展示
   - 分类筛选
   - 搜索功能
   - 分页浏览

2. **更新日志页面**
   - 时间线展示
   - 版本信息
   - 更新类型标识
   - 工具筛选

3. **帮助文档页面**
   - 文档分类
   - 搜索功能
   - Markdown渲染
   - 侧边栏导航

### 管理后台
1. **登录页面**
   - 用户认证
   - 默认账号：admin/123456

2. **仪表板**
   - 统计数据展示
   - 快速操作入口
   - 最新动态

## 🔧 开发环境配置

### 前端开发
```bash
cd ui
npm install          # 安装依赖
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
```

### 后端开发
```bash
cd server
./mvnw clean compile    # 编译项目
./mvnw spring-boot:run  # 启动开发服务器
./mvnw clean package   # 打包项目
```

## 📊 数据库配置

### 当前配置
- 数据库连接已暂时禁用（用于演示）
- 使用模拟数据提供API响应
- 完整的数据库设计在 `database/schema.sql`

### 启用数据库
1. 安装MySQL数据库
2. 创建数据库：`CREATE DATABASE incode;`
3. 导入表结构：`mysql -u root -p incode < database/schema.sql`
4. 修改 `server/src/main/resources/application.properties`
5. 取消数据库配置的注释
6. 重启后端服务

## 🎯 下一步开发建议

### 立即可以做的
1. **自定义样式**：修改前端页面的颜色和布局
2. **添加内容**：在模拟数据中添加更多工具和文档
3. **完善功能**：实现管理后台的具体CRUD操作

### 进阶功能
1. **连接真实数据库**：启用MySQL数据库
2. **文件上传**：添加图片和文档上传功能
3. **用户系统**：扩展用户注册和权限管理
4. **部署上线**：配置生产环境部署

## 🐛 常见问题

### 前端启动失败
- 确保Node.js版本 >= 16
- 删除 `node_modules` 重新安装依赖
- 检查端口5173是否被占用

### 后端启动失败
- 确保Java版本 >= 17
- 检查端口8080是否被占用
- 暂时禁用数据库连接（当前配置）

### API调用失败
- 确保后端服务已启动
- 检查CORS配置
- 查看浏览器控制台错误信息

## 📞 技术支持

如果遇到问题，可以：
1. 查看 `PROJECT_SUMMARY.md` 了解详细技术信息
2. 检查控制台错误日志
3. 确认所有依赖都已正确安装

## 🎉 恭喜！

您的inCODE工具链展示平台已经准备就绪！现在可以开始自定义和扩展功能了。

---

**祝您开发愉快！** 🚀
