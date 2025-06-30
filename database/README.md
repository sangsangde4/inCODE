# 工具平台数据库设计

## 1. 工具信息表 (tools)
| 字段名       | 类型           | 描述             |
|--------------|----------------|------------------|
| id           | bigint         | 主键, 自增       |
| name         | varchar(100)   | 工具名称         |
| title        | varchar(200)   | 工具标题         |
| description  | text           | 工具描述         |
| logo_url     | varchar(500)   | 工具Logo的URL    |
| banner_url   | varchar(500)   | 工具横幅图片的URL|
| version      | varchar(50)    | 当前版本         |
| category     | varchar(50)    | 工具分类         |
| download_url | varchar(500)   | 工具下载地址     |
| access_url   | varchar(500)   | 工具访问地址     |
| status       | varchar(20)    | 工具状态（active, inactive, pending）|
| created_at   | timestamp      | 创建时间         |
| updated_at   | timestamp      | 更新时间         |

## 2. 工具版本表 (tool_versions)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| tool_id      | bigint       | 工具ID           |
| version      | varchar(50)  | 版本号           |
| release_date | date         | 发布日期         |
| changelog    | text         | 更新日志         |
| download_url | varchar(500) | 下载地址         |
| is_latest    | boolean      | 是否为当前主版本 |
| created_at   | timestamp    | 创建时间         |
| updated_at   | timestamp    | 更新时间         |

## 3. 工具文档表 (tool_docs)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| tool_id      | bigint       | 工具ID           |
| title        | varchar(200) | 文档标题         |
| content      | longtext     | 文档内容         |
| category     | varchar(50)  | 文档分类         |
| tags         | json         | 文档标签         |
| doc_type     | varchar(20)  | 文档类型（markdown/html/pdf）|
| created_at   | timestamp    | 创建时间         |
| updated_at   | timestamp    | 更新时间         |

## 4. 工具评论表 (tool_comments)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| tool_id      | bigint       | 工具ID           |
| user_id      | bigint       | 用户ID           |
| content      | text         | 评论内容         |
| rating       | int          | 评分（1~5）       |
| parent_id    | bigint       | 回复评论ID（可选）|
| is_deleted   | boolean      | 是否删除         |
| created_at   | timestamp    | 创建时间         |
| updated_at   | timestamp    | 更新时间         |

## 5. 用户表 (users)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| username     | varchar(50)  | 用户名           |
| password     | varchar(255) | 密码(加密)       |
| email        | varchar(100) | 邮箱             |
| role         | enum         | 用户角色(admin/user) |
| created_at   | timestamp    | 创建时间         |
| updated_at   | timestamp    | 更新时间         |

## 6. 工具标签表 (tags)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| name         | varchar(50)  | 标签名           |
| created_at   | timestamp    | 创建时间         |

## 7. 工具-标签关系表 (tool_tag_map)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| tool_id      | bigint       | 工具ID           |
| tag_id       | bigint       | 标签ID           |

## 8. 工具收藏表 (tool_favorites)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| tool_id      | bigint       | 工具ID           |
| user_id      | bigint       | 用户ID           |
| created_at   | timestamp    | 创建时间         |

## 9. 工具访问日志表 (tool_views)
| 字段名       | 类型         | 描述             |
|--------------|--------------|------------------|
| id           | bigint       | 主键, 自增       |
| tool_id      | bigint       | 工具ID           |
| user_id      | bigint NULL  | 用户ID（可空）   |
| viewed_at    | timestamp    | 访问时间         |
| ip_address   | varchar(45)  | IP地址           |
