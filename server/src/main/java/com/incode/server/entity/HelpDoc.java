package com.incode.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 帮助文档实体类
 */
@Data
public class HelpDoc {
    private Long id;
    
    private Long toolId;
    
    private String title;
    
    private String content;
    
    private String category;
    
    private List<String> tags;
    
    private Integer sortOrder;
    
    private Boolean isPublished;
    
    private Long viewCount;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    // 关联的工具信息
    private Tool tool;
}
