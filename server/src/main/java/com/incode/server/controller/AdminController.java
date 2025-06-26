package com.incode.server.controller;

import com.incode.server.entity.Tool;
import com.incode.server.entity.Changelog;
import com.incode.server.entity.HelpDoc;
import com.incode.server.entity.AdminUser;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * 管理后台API控制器（需要登录）
 */
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    /**
     * 管理员登录
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        
        // 简单验证（实际应该查询数据库并验证密码）
        if ("admin".equals(username) && "123456".equals(password)) {
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("message", "登录成功");
            result.put("token", "mock-jwt-token-" + System.currentTimeMillis());
            
            AdminUser user = new AdminUser();
            user.setId(1L);
            user.setUsername("admin");
            user.setRealName("系统管理员");
            user.setRole("super_admin");
            user.setEmail("admin@incode.com");
            
            result.put("user", user);
            return result;
        } else {
            Map<String, Object> result = new HashMap<>();
            result.put("success", false);
            result.put("message", "用户名或密码错误");
            return result;
        }
    }

    /**
     * 获取当前用户信息
     */
    @GetMapping("/user/info")
    public Map<String, Object> getUserInfo(@RequestHeader("Authorization") String token) {
        AdminUser user = new AdminUser();
        user.setId(1L);
        user.setUsername("admin");
        user.setRealName("系统管理员");
        user.setRole("super_admin");
        user.setEmail("admin@incode.com");
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", user);
        return result;
    }

    // ========== 工具管理 ==========
    
    /**
     * 获取工具列表（管理后台）
     */
    @GetMapping("/tools")
    public Map<String, Object> getToolsForAdmin(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Tool> tools = Arrays.asList(
            createSampleTool(1L, "code-analyzer", "Code Analyzer", "development"),
            createSampleTool(2L, "api-tester", "API Tester", "testing"),
            createSampleTool(3L, "deploy-helper", "Deploy Helper", "deployment")
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", tools);
        result.put("total", tools.size());
        result.put("page", page);
        result.put("size", size);
        
        return result;
    }

    /**
     * 创建工具
     */
    @PostMapping("/tools")
    public Map<String, Object> createTool(@RequestBody Tool tool) {
        tool.setId(System.currentTimeMillis()); // 模拟生成ID
        tool.setCreatedAt(LocalDateTime.now());
        tool.setUpdatedAt(LocalDateTime.now());
        tool.setViewCount(0L);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "工具创建成功");
        result.put("data", tool);
        
        return result;
    }

    /**
     * 更新工具
     */
    @PutMapping("/tools/{id}")
    public Map<String, Object> updateTool(@PathVariable Long id, @RequestBody Tool tool) {
        tool.setId(id);
        tool.setUpdatedAt(LocalDateTime.now());
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "工具更新成功");
        result.put("data", tool);
        
        return result;
    }

    /**
     * 删除工具
     */
    @DeleteMapping("/tools/{id}")
    public Map<String, Object> deleteTool(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "工具删除成功");
        
        return result;
    }

    // ========== 更新日志管理 ==========
    
    /**
     * 获取更新日志列表（管理后台）
     */
    @GetMapping("/changelogs")
    public Map<String, Object> getChangelogsForAdmin(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Changelog> changelogs = Arrays.asList(
            createSampleChangelog(1L, 1L, "2.1.0", "新增代码质量评分功能"),
            createSampleChangelog(2L, 1L, "2.0.5", "修复内存泄漏问题"),
            createSampleChangelog(3L, 2L, "1.5.2", "支持GraphQL协议测试")
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", changelogs);
        result.put("total", changelogs.size());
        result.put("page", page);
        result.put("size", size);
        
        return result;
    }

    /**
     * 创建更新日志
     */
    @PostMapping("/changelogs")
    public Map<String, Object> createChangelog(@RequestBody Changelog changelog) {
        changelog.setId(System.currentTimeMillis());
        changelog.setCreatedAt(LocalDateTime.now());
        changelog.setUpdatedAt(LocalDateTime.now());
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "更新日志创建成功");
        result.put("data", changelog);
        
        return result;
    }

    /**
     * 更新更新日志
     */
    @PutMapping("/changelogs/{id}")
    public Map<String, Object> updateChangelog(@PathVariable Long id, @RequestBody Changelog changelog) {
        changelog.setId(id);
        changelog.setUpdatedAt(LocalDateTime.now());
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "更新日志更新成功");
        result.put("data", changelog);
        
        return result;
    }

    /**
     * 删除更新日志
     */
    @DeleteMapping("/changelogs/{id}")
    public Map<String, Object> deleteChangelog(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "更新日志删除成功");
        
        return result;
    }

    // ========== 帮助文档管理 ==========
    
    /**
     * 获取帮助文档列表（管理后台）
     */
    @GetMapping("/help-docs")
    public Map<String, Object> getHelpDocsForAdmin(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<HelpDoc> docs = Arrays.asList(
            createSampleHelpDoc(1L, 1L, "快速开始", "getting-started"),
            createSampleHelpDoc(2L, 1L, "配置指南", "configuration"),
            createSampleHelpDoc(3L, null, "常见问题", "faq")
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", docs);
        result.put("total", docs.size());
        result.put("page", page);
        result.put("size", size);
        
        return result;
    }

    /**
     * 创建帮助文档
     */
    @PostMapping("/help-docs")
    public Map<String, Object> createHelpDoc(@RequestBody HelpDoc helpDoc) {
        helpDoc.setId(System.currentTimeMillis());
        helpDoc.setCreatedAt(LocalDateTime.now());
        helpDoc.setUpdatedAt(LocalDateTime.now());
        helpDoc.setViewCount(0L);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "帮助文档创建成功");
        result.put("data", helpDoc);
        
        return result;
    }

    /**
     * 更新帮助文档
     */
    @PutMapping("/help-docs/{id}")
    public Map<String, Object> updateHelpDoc(@PathVariable Long id, @RequestBody HelpDoc helpDoc) {
        helpDoc.setId(id);
        helpDoc.setUpdatedAt(LocalDateTime.now());
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "帮助文档更新成功");
        result.put("data", helpDoc);
        
        return result;
    }

    /**
     * 删除帮助文档
     */
    @DeleteMapping("/help-docs/{id}")
    public Map<String, Object> deleteHelpDoc(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "帮助文档删除成功");
        
        return result;
    }

    // 辅助方法
    private Tool createSampleTool(Long id, String name, String title, String category) {
        Tool tool = new Tool();
        tool.setId(id);
        tool.setName(name);
        tool.setTitle(title);
        tool.setDescription("这是" + title + "的描述");
        tool.setCategory(category);
        tool.setVersion("2.1.0");
        tool.setStatus("active");
        tool.setTags(Arrays.asList("开发工具", "代码分析"));
        tool.setViewCount(1250L);
        tool.setCreatedAt(LocalDateTime.now().minusDays(30));
        tool.setUpdatedAt(LocalDateTime.now().minusDays(1));
        return tool;
    }

    private Changelog createSampleChangelog(Long id, Long toolId, String version, String title) {
        Changelog changelog = new Changelog();
        changelog.setId(id);
        changelog.setToolId(toolId);
        changelog.setVersion(version);
        changelog.setTitle(title);
        changelog.setContent("详细的更新内容描述...");
        changelog.setReleaseDate(LocalDate.now().minusDays(7));
        changelog.setType("minor");
        changelog.setIsFeatured(false);
        changelog.setCreatedAt(LocalDateTime.now().minusDays(7));
        changelog.setUpdatedAt(LocalDateTime.now().minusDays(7));
        return changelog;
    }

    private HelpDoc createSampleHelpDoc(Long id, Long toolId, String title, String category) {
        HelpDoc doc = new HelpDoc();
        doc.setId(id);
        doc.setToolId(toolId);
        doc.setTitle(title);
        doc.setCategory(category);
        doc.setContent("# " + title + "\n\n这是帮助文档的内容...");
        doc.setIsPublished(true);
        doc.setViewCount(500L);
        doc.setCreatedAt(LocalDateTime.now().minusDays(15));
        doc.setUpdatedAt(LocalDateTime.now().minusDays(2));
        return doc;
    }
}
