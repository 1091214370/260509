# 🎬 视频制作技能 (Video Maker Skill)

> 让 AI 能够基于 Remotion 快速制作视频的完整技能包

## 触发词

当用户通过以下方式发起视频制作请求时触发：
- "制作视频"
- "做视频"
- "生成视频"
- "帮我做个视频"
- "做个视频"
- "做一个 [主题] 视频"

## 前置要求

在开始制作视频前，AI 需要：

### 1. 确认 Remotion 项目位置
项目根目录：`./remotion-video-project`

相对路径示例：
- Windows: `remotion-video-project\`
- Mac/Linux: `remotion-video-project/`

### 2. 了解可用的视频组件

| 组件名称 | 用途 | 特点 |
|---------|------|------|
| `TikTokCaption` | 抖音字幕风格 | 逐字淡入 + 底部标签动画 |
| `VideoTemplate` | 通用视频模板 | 支持多种动画效果、可配置标题/副标题/标签/风格 |

### 3. 确认视频配置

在开始制作前，必须向用户确认以下信息：

| 信息项 | 说明 | 追问示例 |
|-------|------|---------|
| **主题/标题** | 视频要表达什么？ | "视频主题是什么？" |
| **时长** | 需要多长？（秒） | "需要几秒？10秒还是30秒？" |
| **字幕内容** | 屏幕上显示什么文字？ | "字幕/文字内容是什么？" |
| **画面风格** | 动态效果还是静态？ | "要什么风格？文字动画？" |
| **背景** | 纯色/图片/视频？ | "背景用纯色还是图片？" |
| **尺寸** | 竖屏/横屏？ | "竖屏抖音还是横屏？" |
| **动画效果** | 是否需要炫彩动画？ | "要加背景动画吗？粒子效果、光晕等" |
| **背景音乐** | 需要添加背景音乐吗？ | "要加背景音乐吗？我可以帮你配上" |

## 制作流程

### 第一阶段：需求分析

```
用户: "制作视频 [描述]"

AI 行为:
1. 提取描述中的关键信息
2. 列出已理解和未理解的部分
3. 向用户确认未明确的信息
4. 等待用户回复后再继续
```

### 第二阶段：代码生成

根据确认的配置，更新 `src/VideoConfig.ts` 中的配置：

```typescript
export const videoConfig = {
  title: '确认后的标题',
  subtitle: '确认后的副标题',
  duration: 确认的时长,
  backgroundColor: '背景色',
  textColor: '文字色',
  accentColor: '强调色',
  // ...
};
```

### 第三阶段：渲染输出

```bash
cd ./remotion-video-project
npm run build
```

### 第四阶段：交付

```
✅ 视频制作完成！

📁 文件位置: ./remotion-video-project/out/[视频文件].mp4
⏱️ 时长: [X]秒
📐 分辨率: 1080x1920 (竖屏)
🎬 帧率: 30fps

💡 如需导出到桌面，请将 ./remotion-video-project/out/ 文件夹中的视频复制到桌面。

如需调整，请告诉我具体要改什么。
```

## 修改流程

用户说"修改"、"调整"、"换个风格"时：
1. 理解修改需求
2. 更新对应的配置值
3. 重新渲染
4. 重新交付

## 注意事项

1. **必须确认清楚再制作** - 不确定的必须问清楚，不能凭空编造
2. **复杂视频分步做** - 太复杂的先做基础版，再叠加功能
3. **保持配置与代码同步** - 修改后检查 VideoConfig.ts

## 快速参考

### 项目结构
```
remotion-video-project/
├── src/
│   ├── index.ts           # 入口
│   ├── Root.tsx           # 组件注册
│   ├── TikTokCaption.tsx  # 抖音字幕组件
│   ├── VideoTemplate.tsx  # 通用模板组件
│   └── VideoConfig.ts     # ⭐ 视频配置（主要修改这里）
├── out/                   # 渲染输出目录
├── package.json
└── tsconfig.json
```

### 启动开发预览
```bash
cd ./remotion-video-project
npm run dev
# 访问 http://localhost:3000
```

### 渲染视频
```bash
cd ./remotion-video-project
npm run build
# 输出到 out/ 目录
```

### 修改视频内容的步骤

1. 打开 `src/VideoConfig.ts`
2. 修改配置值（标题、颜色等）
3. 运行 `npm run build` 重新渲染
4. 在 `out/` 目录找到新视频

### 添加背景音乐的步骤

1. 将音乐文件放在 `src/` 目录（如 `src/bg-music.mp3`）
2. 打开 `src/VideoConfig.ts`，修改：
   ```typescript
   enableAudio: true,            // 启用音乐
   audioPath: './bg-music.mp3',  // 指向你的文件
   audioVolume: 0.3,             // 调整音量
   ```
3. 运行 `npm run build` 重新渲染
4. 新视频将包含背景音乐

## 扩展组件

如果内置组件不满足需求，可以：

1. 在 `src/` 下创建新组件（如 `PromoVideo.tsx`）
2. 在 `Root.tsx` 中注册新 Composition
3. 在 `VideoConfig.ts` 中添加配置
4. 在渲染命令中指定组件名：
   ```bash
   npx remotion render PromoVideo out/promo.mp4
   ```

---

## 技能文件清单

- `SKILL.md` - 本文件，技能定义
- `README.md` - 详细使用文档和示例
- `remotion-video-project/` - 完整的 Remotion 项目模板
- `EXAMPLES.md` - 各种场景的使用示例

---

_小哈米出品 🐹_
_基于 Remotion v4.0.459 + React + TypeScript_