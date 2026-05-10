# 贡献指南

欢迎提交问题、建议或 PR。本指南包含快速开发与文档校验步骤。

## 本地快速检查

1. 安装 `markdownlint-cli` 和 `markdown-link-check`（全局或本地均可）

```
npm install -g markdownlint-cli markdown-link-check
```

2. 运行文档检查：

```
markdownlint "**/*.md"
npx markdown-link-check -v --config .github/markdown-link-check.json "**/*.md"
```

3. 如果你修改了示例代码或生成器，请确保保持 `SKILL_SUMMARY.md` 中的最小输入/输出格式一致。

## 提交规范

- 分支命名：`fix/xxx`、`feat/xxx` 或 `docs/xxx`
- 提交信息：简洁说明变更（如 `docs: add AI quickstart`）
- 发起 PR 后，CI 会运行 markdown lint 与链接检查，请确保修改通过这些检查

## 代码风格

- 文档遵循 Markdown 标准，行长在 `.markdownlint.json` 中设置为 120

## 协作流程

1. Fork 仓库并在新分支上实现更改
2. 本地运行 lint 与链接检查
3. 提交并发起 PR，描述变更目的与影响
4. 等待 CI 通过并合并
