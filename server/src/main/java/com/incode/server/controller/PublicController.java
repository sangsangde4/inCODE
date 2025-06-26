package com.incode.server.controller;

import com.incode.server.entity.Tool;
import com.incode.server.entity.Changelog;
import com.incode.server.entity.HelpDoc;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * 公开展示API控制器（无需登录）
 */
@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*")
public class PublicController {

    /**
     * 获取所有工具列表
     */
    @GetMapping("/tools")
    public Map<String, Object> getTools(
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        // 模拟数据
        List<Tool> tools = Arrays.asList(
            createSampleTool(1L, "code-analyzer", "Code Analyzer", "智能代码分析工具", "development"),
            createSampleTool(2L, "api-tester", "API Tester", "强大的API测试工具", "testing"),
            createSampleTool(3L, "deploy-helper", "Deploy Helper", "简化部署流程的自动化工具", "deployment")
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", tools);
        result.put("total", tools.size());
        result.put("page", page);
        result.put("size", size);
        result.put("success", true);
        
        return result;
    }

    /**
     * 获取工具详情
     */
    @GetMapping("/tools/{id}")
    public Map<String, Object> getToolDetail(@PathVariable Long id) {
        Tool tool = createSampleTool(id, "code-analyzer", "Code Analyzer", "智能代码分析工具", "development");
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", tool);
        result.put("success", true);
        
        return result;
    }

    /**
     * 获取更新日志
     */
    @GetMapping("/changelogs")
    public Map<String, Object> getChangelogs(
            @RequestParam(required = false) Long toolId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Changelog> changelogs = Arrays.asList(
            createSampleChangelog(1L, 1L, "2.1.0", "新增代码质量评分功能"),
            createSampleChangelog(2L, 1L, "2.0.5", "修复内存泄漏问题"),
            createSampleChangelog(3L, 2L, "1.5.2", "支持GraphQL协议测试")
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", changelogs);
        result.put("total", changelogs.size());
        result.put("page", page);
        result.put("size", size);
        result.put("success", true);
        
        return result;
    }

    /**
     * 获取帮助文档
     */
    @GetMapping("/help-docs")
    public Map<String, Object> getHelpDocs(
            @RequestParam(required = false) Long toolId,
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<HelpDoc> docs = Arrays.asList(
            createSampleHelpDoc(1L, 1L, "快速开始", "getting-started"),
            createSampleHelpDoc(2L, 1L, "配置指南", "configuration"),
            createSampleHelpDoc(3L, null, "常见问题", "faq")
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", docs);
        result.put("total", docs.size());
        result.put("page", page);
        result.put("size", size);
        result.put("success", true);
        
        return result;
    }

    /**
     * 获取帮助文档详情
     */
    @GetMapping("/help-docs/{id}")
    public Map<String, Object> getHelpDocDetail(@PathVariable Long id) {
        HelpDoc doc = createSampleHelpDoc(id, 1L, "快速开始", "getting-started");
        doc.setContent("# 快速开始\n\n这是一个详细的快速开始指南...\n\n## 安装\n\n```bash\nnpm install code-analyzer\n```");
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", doc);
        result.put("success", true);
        
        return result;
    }

    /**
     * 获取工具分类列表
     */
    @GetMapping("/categories")
    public Map<String, Object> getCategories() {
        List<Map<String, Object>> categories = Arrays.asList(
            Map.of("key", "development", "name", "开发工具", "count", 5),
            Map.of("key", "testing", "name", "测试工具", "count", 3),
            Map.of("key", "deployment", "name", "部署工具", "count", 2)
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("data", categories);
        result.put("success", true);
        
        return result;
    }

    // 辅助方法
    private Tool createSampleTool(Long id, String name, String title, String description, String category) {
        Tool tool = new Tool();
        tool.setId(id);
        tool.setName(name);
        tool.setTitle(title);
        tool.setDescription(description);
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
