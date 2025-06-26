package com.incode.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 更新日志实体类
 */
@Data
public class Changelog {
    private Long id;
    
    private Long toolId;
    
    private String version;
    
    private String title;
    
    private String content;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;
    
    private String type; // major, minor, patch, hotfix
    
    private Boolean isFeatured;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    // 关联的工具信息
    private Tool tool;
}
