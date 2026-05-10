# SKILL 简化摘要（机器可读/快速参考）

概要: 为 AI 提供最小、可执行的技能规范，便于自动化生成与验证。

触发词:
- 制作视频 / 生成视频 / 帮我做个视频

最小输入字段:
- title: 字符串
- duration: 整数（秒）
- style: 枚举（tiktok|minimal|tech|food|corporate）
- optional: subtitle, tags, music (file or false), scenes (数组)

输出产物:
- src/VideoConfig.ts
- src/config/timeline.ts (若 duration > 20s)
- src/scenes/Scene1.tsx (至少一个)
- out/<name>.mp4 (渲染产物)

执行步骤(简洁):
1. 生成 `visual_prompt`（画面增强提示词，包含颜色/音乐/场景分割/关键帧）
2. 等待用户确认
3. 根据确认生成 `VideoConfig.ts` 与最小场景骨架
4. 输出渲染命令和校验步骤
5. 验证预期输出（时长、分辨率、音频存在）

返回格式要求:
- JSON: { visual_prompt: string, config_snippet: string, files: ["path1","path2"], render_cmd: string }

简短 Prompt 示例:
```
用户: 制作一个 15 秒 抖音风格 美食推荐 视频，标题: "这家串串绝了"，副标题: "成都必吃"

AI 应返回(最简):
{
  "visual_prompt": "深色背景，暖色强调，粒子少，文字逐词出现，快速节奏",
  "config_snippet": "{ title: '这家串串绝了', subtitle: '成都必吃', duration: 15, width:1080, height:1920, fps:30 }",
  "files": ["src/VideoConfig.ts","src/scenes/Scene1.tsx"],
  "render_cmd": "npm run build"
}
```

校验规则（自动）:
- duration > 0
- fps ∈ {24,30,60}
- width/height ∈ 常见分辨率
- 若 enableAudio 为 true，audioPath 必须存在或由用户提供替代链接

Remotion 强制规则（必须检查）:
- 禁止使用 CSS transitions/animations 或 Tailwind 动画类（这些不会在渲染时生效）
- 本地资源必须放入 `public/` 并通过 `staticFile()` 使用
- 使用 Remotion 的媒体组件：`Img`、`Video`、`Audio`（来自 `remotion` / `@remotion/media`）
- 推荐预览：`npx remotion studio`；单帧检查：`npx remotion still [composition-id] --frame=<n>`

官方技能来源：
- 人类可读页面: https://github.com/remotion-dev/remotion/blob/main/packages/skills/skills/remotion/SKILL.md
- RAW 文件（可下载用于比对）: https://raw.githubusercontent.com/remotion-dev/remotion/main/packages/skills/skills/remotion/SKILL.md

下载脚本：仓库已包含 `scripts/update_remotion_skill.ps1`，可在 Windows/PowerShell 中运行以获取官方 RAW 文档（结果文件 `remotion_remote_SKILL.md`）。



错误回复策略:
- 明确指出缺失字段并提问
- 提供默认占位配置并提示会使用占位资源
