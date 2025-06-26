-- inCODE 工具链展示平台数据库设计

-- 1. 工具/平台信息表
CREATE TABLE tools (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '工具名称',
    title VARCHAR(200) NOT NULL COMMENT '工具标题',
    description TEXT COMMENT '工具描述',
    logo_url VARCHAR(500) COMMENT 'Logo图片URL',
    banner_url VARCHAR(500) COMMENT '横幅图片URL',
    version VARCHAR(50) COMMENT '当前版本',
    category VARCHAR(50) COMMENT '工具分类',
    tags JSON COMMENT '标签列表',
    website_url VARCHAR(500) COMMENT '官网地址',
    github_url VARCHAR(500) COMMENT 'GitHub地址',
    download_url VARCHAR(500) COMMENT '下载地址',
    documentation_url VARCHAR(500) COMMENT '文档地址',
    status ENUM('active', 'inactive', 'deprecated') DEFAULT 'active' COMMENT '状态',
    sort_order INT DEFAULT 0 COMMENT '排序权重',
    view_count BIGINT DEFAULT 0 COMMENT '浏览次数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_sort_order (sort_order)
) COMMENT '工具信息表';

-- 2. 更新日志表
CREATE TABLE changelogs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id BIGINT NOT NULL COMMENT '关联工具ID',
    version VARCHAR(50) NOT NULL COMMENT '版本号',
    title VARCHAR(200) NOT NULL COMMENT '更新标题',
    content TEXT NOT NULL COMMENT '更新内容',
    release_date DATE NOT NULL COMMENT '发布日期',
    type ENUM('major', 'minor', 'patch', 'hotfix') DEFAULT 'minor' COMMENT '更新类型',
    is_featured BOOLEAN DEFAULT FALSE COMMENT '是否为重要更新',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE,
    INDEX idx_tool_id (tool_id),
    INDEX idx_release_date (release_date),
    INDEX idx_is_featured (is_featured)
) COMMENT '更新日志表';

-- 3. 帮助文档表
CREATE TABLE help_docs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id BIGINT COMMENT '关联工具ID，NULL表示通用文档',
    title VARCHAR(200) NOT NULL COMMENT '文档标题',
    content LONGTEXT NOT NULL COMMENT '文档内容(Markdown格式)',
    category VARCHAR(50) COMMENT '文档分类',
    tags JSON COMMENT '文档标签',
    sort_order INT DEFAULT 0 COMMENT '排序权重',
    is_published BOOLEAN DEFAULT TRUE COMMENT '是否发布',
    view_count BIGINT DEFAULT 0 COMMENT '浏览次数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE SET NULL,
    INDEX idx_tool_id (tool_id),
    INDEX idx_category (category),
    INDEX idx_is_published (is_published),
    INDEX idx_sort_order (sort_order)
) COMMENT '帮助文档表';

-- 4. 管理员用户表
CREATE TABLE admin_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码(加密)',
    email VARCHAR(100) COMMENT '邮箱',
    real_name VARCHAR(50) COMMENT '真实姓名',
    role ENUM('super_admin', 'admin', 'editor') DEFAULT 'editor' COMMENT '角色',
    status ENUM('active', 'inactive') DEFAULT 'active' COMMENT '状态',
    last_login_at TIMESTAMP NULL COMMENT '最后登录时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_status (status)
) COMMENT '管理员用户表';

-- 5. 系统配置表
CREATE TABLE system_configs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(500) COMMENT '配置描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT '系统配置表';

-- 插入初始数据
INSERT INTO admin_users (username, password, email, real_name, role) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBaLyEm5vtkfOi', 'admin@incode.com', '系统管理员', 'super_admin');

INSERT INTO system_configs (config_key, config_value, description) VALUES
('site_title', 'inCODE 工具链平台', '网站标题'),
('site_description', '专业的开发工具链展示平台', '网站描述'),
('contact_email', 'contact@incode.com', '联系邮箱'),
('github_org', 'https://github.com/incode', 'GitHub组织地址');

-- 插入示例工具数据
INSERT INTO tools (name, title, description, category, tags, version, status, sort_order) VALUES
('code-analyzer', 'Code Analyzer', '智能代码分析工具，支持多种编程语言的静态分析', 'development', '["静态分析", "代码质量", "多语言"]', '2.1.0', 'active', 1),
('api-tester', 'API Tester', '强大的API测试工具，支持REST、GraphQL等多种协议', 'testing', '["API测试", "自动化", "协议支持"]', '1.5.2', 'active', 2),
('deploy-helper', 'Deploy Helper', '简化部署流程的自动化工具', 'deployment', '["自动化部署", "CI/CD", "多环境"]', '3.0.1', 'active', 3);
