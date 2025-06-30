-- 创建数据库（注意使用反引号防止关键字冲突）
CREATE DATABASE IF NOT EXISTS `public` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE `public`;
-- 工具信息表
CREATE TABLE tools
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(100),
    title        VARCHAR(200),
    description  TEXT,
    logo_url     VARCHAR(500),
    banner_url   VARCHAR(500),
    version      VARCHAR(50),
    category     VARCHAR(50),
    download_url VARCHAR(500), -- 工具下载地址
    access_url   VARCHAR(500), -- 工具访问地址（在线工具等）
    status       VARCHAR(20) DEFAULT 'active',
    created_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 工具版本表
CREATE TABLE tool_versions
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id      BIGINT,
    version      VARCHAR(50),
    release_date DATE,
    changelog    TEXT,
    download_url VARCHAR(500),
    is_latest    BOOLEAN   DEFAULT FALSE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools (id)
);

-- 工具文档表
CREATE TABLE tool_docs
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id    BIGINT,
    title      VARCHAR(200),
    content    LONGTEXT,
    category   VARCHAR(50),
    tags       JSON,
    doc_type   VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools (id)
);

-- 工具评论表
CREATE TABLE tool_comments
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id    BIGINT,
    user_id    BIGINT,
    content    TEXT,
    rating     INT,
    parent_id  BIGINT    DEFAULT NULL,
    is_deleted BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- 用户表（管理员+普通用户）
CREATE TABLE users
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(50) UNIQUE,
    password   VARCHAR(255),
    email      VARCHAR(100) UNIQUE,
    role       ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 标签表
CREATE TABLE tags
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 工具标签映射表
CREATE TABLE tool_tag_map
(
    tool_id BIGINT,
    tag_id  BIGINT,
    PRIMARY KEY (tool_id, tag_id),
    FOREIGN KEY (tool_id) REFERENCES tools (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id)
);

-- 工具收藏表
CREATE TABLE tool_favorites
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id    BIGINT,
    user_id    BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tool_id) REFERENCES tools (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- 工具访问日志表
CREATE TABLE tool_views
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    tool_id    BIGINT,
    user_id    BIGINT NULL,
    viewed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (tool_id) REFERENCES tools (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
