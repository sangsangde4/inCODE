package com.incode.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 工具信息实体类
 */
@Data
public class Tool {
    private Long id;
    
    private String name;
    
    private String title;
    
    private String description;
    
    private String logoUrl;
    
    private String bannerUrl;
    
    private String version;
    
    private String category;
    
    private List<String> tags;
    
    private String websiteUrl;
    
    private String githubUrl;
    
    private String downloadUrl;
    
    private String documentationUrl;
    
    private String status; // active, inactive, deprecated
    
    private Integer sortOrder;
    
    private Long viewCount;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
