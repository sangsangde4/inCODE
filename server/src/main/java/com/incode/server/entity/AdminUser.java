package com.incode.server.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 管理员用户实体类
 */
@Data
public class AdminUser {
    private Long id;
    
    private String username;
    
    @JsonIgnore
    private String password;
    
    private String email;
    
    private String realName;
    
    private String role; // super_admin, admin, editor
    
    private String status; // active, inactive
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastLoginAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
