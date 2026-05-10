# 视频制作技能 (Video Maker Skill)

> 让 AI 能够基于 Remotion 快速制作高质量、长视频、复杂交互的完整技能包
> **支持 20 秒+ 长视频 | 多段落交互 | 高质量输出**

## 核心能力

## 目录

- [核心能力](#核心能力)
- [触发词](#触发词)
- [标准工作流（两步走）](#标准工作流两步走)
- [长视频与复杂交互支持（20秒+）](#长视频与复杂交互支持20秒)
- [画面增强提示词（Step 1）](#画面增强提示词step-1)
- [快速参考](#快速参考)


- **主动提示词补充** - AI 会自动学习优秀提示词模式，补充用户输入的内容
- **视觉细节优化** - 自动补充美学、配色、字体、动画等细节
- **技术规格完整化** - 补充分辨率、帧率、时间码、过渡效果等技术参数
- **最佳实践应用** - 遵循 Remotion 官方提示词库的最佳实践
- **画面优先** - 收到需求后先输出画面增强提示词，用户确认后再制作
- **长视频架构** - 场景分割、性能优化、时间轴管理，支持 20 秒+ 复杂交互视频
- **交互设计** - 多层动画同步、动态过渡、条件渲染优化
- **高质量输出** - 支持多分辨率、编码优化、色彩空间管理

## 简化执行要点（供 AI 直接执行）

1. 输入要求（最小集合）
  - `title`（字符串）
  - `duration`（秒，整数）
  - `style`（例如：抖音/极简/科技/美食）
  - 可选：`subtitle`、`tags[]`、`backgroundMusic`（文件名或 false）、`scenes[]`（简单场景描述）

2. 输出产物（执行完成后应产生）
  - `src/VideoConfig.ts`（包含基本配置）
  - `src/config/timeline.ts`（若为长视频）
  - `src/scenes/...`（最少一个场景组件）
  - `out/<name>.mp4`（渲染产物）

3. 最简执行工作流（AI 可按此顺序自动执行）
  - A. 生成“画面增强提示词”并返回给用户（字段：视觉基调、颜色、音乐、场景分割、关键动画点）
  - B. 等待并处理用户确认/修改（只在确认后继续）
  - C. 基于确认生成 `VideoConfig.ts` 与 `timeline`（如需要）
  - D. 生成场景组件骨架（最小可运行代码，避免外部资源依赖）
  - E. 提供渲染命令与预期输出说明（示例：`npm run build`，输出路径）
  - F. 验证：检查配置中 `duration`、`width/height`、`fps` 与实际渲染参数一致，确认音频文件路径存在（若启用）

4. 快速校验清单（AI 自动检查）
  - 所有必需字段存在：`title`、`duration`、`style`
  - 若 `enableAudio: true`，`audioPath` 必须存在于 `src/` 或列出为外部资源
  - `duration` 与 `timeline` 总帧数一致（frameRate 默认 30）
  - 输出目录 `out/` 是否可写

5. 简洁 Prompt 模板（用于生成画面增强提示词）
  - 模板字段：{title, subtitle, duration, style, tone, colors, target_platform, scenes_summary, key_effects, music_style}
  - 返回格式（必须）：JSON 包含 `visual_prompt`（文字说明）、`config_snippet`（可直接插入 `VideoConfig.ts` 的最小示例）

6. 失败处理（AI 行为规范）
  - 若缺少关键字段，提问并等待用户补全
  - 若外部资源缺失，列出替代占位符并继续生成可运行骨架

  ## 融合 Remotion 官方最佳实践（必须遵守）

  - 新项目脚手架建议使用：`npx create-video@latest --yes --blank --no-tailwind <name>` 来初始化空项目。
  - 资源放置：所有本地静态资源应放在项目根的 `public/` 目录，并通过 `staticFile()` 引用。
  - 媒体组件：使用 `Img`、`Video`（来自 `@remotion/media`）和 `Audio` 组件加载媒体，避免直接使用 DOM `<img>` 或 HTML5 `<video>` 引用本地 `public/` 文件。
  - 动画实现：使用 Remotion 的 `useCurrentFrame()` / `interpolate()` / `Easing` 等 API 进行帧驱动动画；禁止使用 CSS transitions/animations 或 Tailwind 的动画类（这些在渲染时不可用）。
  - 序列控制：使用 `<Sequence from={...} durationInFrames={...}>` 来延迟或限制元素时长，`layout="none"` 用于内联内容。
  - 组合与元数据：`Composition`（一般在 `src/Root.tsx`）定义 `width/height/fps/durationInFrames`，并可使用 `calculateMetadata` 动态计算。
  - 预览与单帧检查：推荐使用 `npx remotion studio` 进行预览；对关键帧可使用 `npx remotion still [composition-id] --scale=0.25 --frame=30` 进行一帧渲染检查。
  - 外部规则参考：若需要高级功能（如字幕、FFmpeg、Lottie、3D、音乐可视化等），参照相应规则文档（如 rules/ 下的各项说明）。

  ## 官方技能来源与自动更新

  为便于获取 Remotion 官方技能的最新实践与规则，已将官方 SKILL 文档地址记录如下：

  - 官方页面（人类可读）: https://github.com/remotion-dev/remotion/blob/main/packages/skills/skills/remotion/SKILL.md
  - 原始内容（可通过脚本下载）: https://raw.githubusercontent.com/remotion-dev/remotion/main/packages/skills/skills/remotion/SKILL.md

  已在仓库中添加一个简单的 PowerShell 脚本 `scripts/update_remotion_skill.ps1`，用于下载官方 RAW 文档到仓库根目录（文件名 `remotion_remote_SKILL.md`）。使用示例：

  ```powershell
  $uri = 'https://raw.githubusercontent.com/remotion-dev/remotion/main/packages/skills/skills/remotion/SKILL.md'
  $out = 'remotion_remote_SKILL.md'
  Invoke-WebRequest -Uri $uri -OutFile $out
  Write-Host "Downloaded to $out"
  ```

  说明：脚本只会将官方文档下载到本地，合并或替换到本仓库的 `SKILL.md` 需人工审阅后合并，以避免覆盖仓库中对本项目做的本地定制。




## 触发词

当用户通过以下方式发起视频制作请求时触发：
- 制作视频 / 做视频 / 生成视频
- 帮我做个视频 / 个视频 / 做一个 [主题] 视频
- 任何视频创作相关的请求

## 标准工作流（两步走）

> **核心原则**：收到需求后，**先不制作**，先输出【画面增强提示词】让用户确认！

```
用户: 制作视频 [主题]

Step 1 → AI 输出【画面增强提示词】（不制作）
           ↓
        用户确认 / 修改
           ↓
Step 2 → AI 开始制作 → 渲染 → 交付
```

---

## 长视频与复杂交互支持（20秒+）

### 智能场景分割

对于 **20 秒以上的视频**，AI 会自动建议分场景结构：

```
总时长 30 秒 → 建议分为 3 个场景
├─ 开场动画 (0-5s)  - 建立视觉基调
├─ 主体叙事 (5-20s) - 内容展示与互动
└─ 结尾收尾 (20-30s)- 品牌/CTA
```

### 多段落交互配置

**Step 1 画面增强提示词新增内容**：

```yaml
场景分割:
  场景 1: [名称、时间范围、视觉风格、关键动画]
  场景 2: [名称、时间范围、视觉风格、关键动画]
  场景 N: [名称、时间范围、视觉风格、关键动画]

交互时间轴:
  T1: [事件、触发器、动画群组]
  T2: [事件、触发器、动画群组]

性能优化建议:
  - 条件渲染范围: [帧数区间]
  - 懒加载层级: [加载优先级]
  - 缓存策略: [缓存点]
```

### 高质量参数组合

对于长视频，AI 会推荐：

| 质量等级 | 分辨率 | 帧率 | 编码 | 码率 | 场景数 |
|---------|--------|------|------|------|--------|
| 标准 | 1080x1920 | 30fps | H.264 | 5000k | 3-5 |
| 高质量 | 1440x2560 | 30fps | H.264 | 8000k | 5-8 |
| 专业 | 1920x1080+ | 60fps | H.265 | 12000k+ | 8+ |

### 性能优化最佳实践

```typescript
// ✅ 条件渲染 - 只在必要时渲染
{frame >= sceneStartFrame && frame < sceneEndFrame && (
  <Scene1 ... />
)}

// ✅ 懒加载 - 分层加载资源
const assets = useMemo(() => {
  if (frame < 100) return loadSceneOne();
  if (frame >= 100 && frame < 300) return loadSceneTwo();
  return null;
}, [frame]);

// ✅ 缓存重型计算
const memoValue = useMemo(() => 
  complexCalculation(), 
  [dependency]
);

// ✅ 延迟组件挂载
const Scene3 = lazy(() => import('./scenes/Scene3'));
```

---

## 画面增强提示词（Step 1）

**核心变化**：每次 AI 都会动态生成全新的画面增强提示词，**不使用固定模板代码**。

### 生成原则

根据用户需求，AI 会自动生成包含以下结构的提示词：

- **视频主题**: 主标题、副标题、时长建议、视频分类（短/中/长视频）
- **画面风格**: 风格名称、视觉基调、色彩心理学分析
- **色彩方案**: 背景色、主文字色、强调色、配色理由
- **视觉层次**: 背景→主体→配件→特效 的四层描述
- **动画时间轴**: 关键时段的动画方向
- **特效配置**: 旋转光环、粒子、光晕、脉冲、装饰线等组合
- **背景音乐**: 音乐启用、风格、BPM、描述
- **可调整方向**: 列出用户可修改的几个维度
- **[长视频] 场景结构**: 多个场景的组织方式、过渡效果、时间分配（仅长视频）
- **[长视频] 交互设计**: 多段落动画同步、层级关系、触发条件（仅长视频）
- **[长视频] 性能评估**: 推荐的分辨率、帧率、渲染优化点（仅长视频）

### 关键特点

✨ **每次都生成新方案** - 不复制固定示例，确保内容多样性  
🎵 **强调音乐重要性** - 音乐是视频灵魂，每次都推荐合适的音乐风格  
📺 **移除标签功能** - 聚焦主视觉，不显示底部 #话题标签  
⚡ **即时确认** - 用户确认方案后立即制作，不拖延  

### 工作流示例

```
用户: 制作一个励志主题的短视频

Step 1 → AI 输出全新【画面增强提示词】
         （包含颜色、特效、音乐等具体建议）
         
用户: 确认 / 或请求修改某个细节

Step 2 → AI 根据确认/修改更新配置并开始制作
```

---

## 背景音乐配置

> 🎵 **背景音乐是视频的灵魂！** 每次都必须根据视频主题推荐合适的音乐。

### 支持的音乐配置

- **enableAudio**: true/false（是否启用）
- **audioPath**: 音乐文件路径（相对于 src/ 目录）
- **audioVolume**: 0-1（音量调节，0.5 = 50%）
- **audioFadeIn**: 淡入帧数
- **audioFadeOut**: 淡出帧数

### 音乐风格推荐表

| 场景 | 风格 | BPM | 描述 |
|------|------|-----|------|
| 活力抖音风 | 电子/舞曲 | 120-130 | 节奏感强，适合快节奏内容 |
| 温馨亲子 | 轻快儿童 | 110-120 | 欢快阳光，有亲和力 |
| 科技感 | 电子/赛博 | 100-115 | 冷峻有节奏感 |
| 文艺清新 | 舒缓/民谣 | 80-95 | 温柔不抢戏 |
| 热血激励 | 摇滚/史诗 | 130-150 | 高燃有冲击力 |
| 美食探店 | 轻快/时尚 | 115-125 | 活泼有食欲感 |

---

## 制作流程（用户确认后执行）

当用户确认【画面增强提示词】后，按以下步骤执行：

### Step 1: 更新配置文件

修改 `src/VideoConfig.ts`，填入用户确认的配置。

### Step 2: 执行渲染

```bash
cd ./remotion-video-project
npm run build
```

### Step 3: 交付视频

```
✅ 视频制作完成！

📁 文件位置: ./remotion-video-project/out/video.mp4
⏱ 时长: [X] 秒
📐 分辨率: 1080x1920（竖屏）
🎬 帧率: 30fps
🎵 背景音乐: 已启用

将 out/ 目录中的视频文件复制到桌面即可使用。
```

### 修改流程

用户提出修改需求时（如调整颜色、改特效强弱、换音乐等）：
1. 理解具体的修改需求
2. 生成新的【画面增强提示词】方案
3. 用户确认
4. 更新 `src/VideoConfig.ts`
5. 重新渲染
6. 交付新版本

---

## 快速参考

### 项目结构

```
remotion-video-project/
├── src/
│   ├── index.ts           # 入口
│   ├── Root.tsx           # 组件注册
│   ├── VideoTemplate.tsx  # 通用模板组件
│   ├── VideoConfig.ts     # ⭐ 视频配置文件
│   ├── AnimationEffects.tsx # 动画库
│   └── TikTokCaption.tsx  # 字幕组件
├── out/                   # 输出目录
└── package.json
```

### 启动开发预览

```bash
cd ./remotion-video-project
npm run dev
# 访问 http://localhost:3000
```

### 渲染输出

```bash
cd ./remotion-video-project
npm run build
# 输出到 out/ 目录
```

### 可用特效（VideoConfig.ts）

| 配置项 | 类型 | 说明 |
|--------|------|------|
| backgroundAnimation | string | 背景装饰: gradient / shapes / grid / none |
| particleCount | number | 粒子数量，0表示关闭 |
| showGlow | boolean | 光晕效果 |
| showPulse | boolean | 脉冲扩散 |
| showRotatingRing | boolean | 旋转光环 |
| showDecorationLine | boolean | 装饰线条 |
| enterAnimation | string | 进场动画: spring / fade / slide-up |
| enableAudio | boolean | 是否启用背景音乐 |
| audioVolume | number | 音量 0-1 |
| audioFadeIn | number | 淡入帧数 |
| audioFadeOut | number | 淡出帧数 |

### 长视频与交互配置（20秒+）

| 配置项 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| scenes | SceneConfig[] | 场景数组 | [{id: 'intro', startFrame: 0, endFrame: 150, ...}] |
| transitions | TransitionConfig[] | 过渡效果配置 | [{from: 'scene1', to: 'scene2', type: 'fade', duration: 30}] |
| interactiveElements | InteractiveElement[] | 交互元素 | [{type: 'text-reveal', triggers: [...], animations: [...]}] |
| performanceMode | string | 性能模式: 'standard' / 'optimized' / 'ultra-quality' | 'optimized' |
| lazyLoadFrames | number[] | 条件渲染分割点 | [0, 150, 300, 450] |
| enableCaching | boolean | 启用计算缓存 | true |
| videoQuality | string | 输出质量 | 'hd' / 'fhd' / '4k' |
| frameRate | number | 帧率 | 30 / 60 |
| codec | string | 编码器 | 'h264' / 'h265' |
| colorSpace | string | 色彩空间 | 'rec709' / 'rec2020' |

### 场景配置示例（SceneConfig）

```typescript
{
  id: 'opening',           // 场景唯一标识
  startFrame: 0,           // 开始帧（相对总视频）
  endFrame: 150,           // 结束帧
  duration: 150,           // 时长（帧数）
  backgroundColor: '#000',
  enterAnimation: {
    type: 'fade-in',
    duration: 30
  },
  exitAnimation: {
    type: 'fade-out',
    duration: 30,
    startFrame: 120  // 提前开始退出动画
  },
  elements: [
    { type: 'text', content: '...', animation: {...} },
    { type: 'shape', shape: 'circle', animation: {...} }
  ],
  audio: {
    enabled: true,
    fadeIn: 10,
    fadeOut: 10
  }
}
```

### 交互元素配置示例

```typescript
{
  id: 'text-reveal-1',
  type: 'text-reveal',     // 类型: text-reveal / counter / progress-bar
  triggerFrame: 0,         // 触发帧数
  duration: 60,            // 动画时长
  content: '快速制作视频',
  animation: {
    style: 'character',    // character / word / line
    staggerDelay: 5        // 错开延迟
  }
}
```

---

## 长视频制作工作流（20秒+）

### 完整流程示例：制作 30 秒高互动视频

```
用户: 制作一个 30 秒的产品演示视频，要有3段不同的展示场景

Step 1 → AI 输出【画面增强提示词】
         ├─ 场景1 (0-8s): 产品展示进场
         ├─ 场景2 (8-20s): 功能演示交互
         ├─ 场景3 (20-30s): 品牌收尾CTA
         ├─ 交互设计: 场景切换动画、文字逐段显示、计数器等
         └─ 性能优化: 条件渲染、分帧加载、缓存计算
         
用户: 确认/修改（如：加强场景2的交互效果）

Step 2 → AI 更新配置并生成多场景代码结构
         ├─ 创建 Scene1.tsx / Scene2.tsx / Scene3.tsx
         ├─ 创建 sceneConfig.ts (包含所有时间码)
         ├─ 实现交互管理 (InteractionManager.tsx)
         └─ 应用性能优化 (条件渲染、缓存)
         
Step 3 → 渲染与测试
         ├─ npm run dev (预览完整流程)
         ├─ 验证时间轴对齐
         ├─ 测试音乐同步
         └─ 检查交互时序
         
Step 4 → 输出高质量视频
         └─ npm run build (按配置的质量等级输出)
```

### AI 自动化支持

对于长视频请求，AI 会主动提供：

✅ **场景分析**
- 自动建议最优场景分割数量
- 计算每个场景的最佳时长
- 规划场景间的过渡效果

✅ **交互设计**
- 识别需要交互的关键点
- 生成多层动画的同步方案
- 建议触发条件和时序

✅ **性能优化**
- 分析帧负载，识别瓶颈
- 建议条件渲染的分割点
- 推荐缓存和预加载策略

✅ **质量配置**
- 根据内容复杂度推荐分辨率
- 建议帧率（30fps vs 60fps）
- 选择最优编码器（H.264 vs H.265）

---

## 复杂动画时间轴管理

### 多层动画同步原则

```typescript
// ✅ 关键原则：所有时间参考帧号（相对总视频）
const TIMELINE = {
  SCENE_1_START: 0,
  SCENE_1_TEXT_IN: 10,
  SCENE_1_EFFECT_START: 50,
  SCENE_1_END: 150,
  
  TRANSITION_START: 140,      // 场景间过渡
  TRANSITION_END: 160,
  
  SCENE_2_START: 150,
  SCENE_2_INTERACTION_1: 180,
  SCENE_2_INTERACTION_2: 250,
  SCENE_2_END: 450,
  
  // ... 依此类推
};

// ✅ 动画同步示例
export const animate = (frame: number) => {
  // 场景1文字动画（10-50帧）
  if (frame >= TIMELINE.SCENE_1_TEXT_IN && frame < TIMELINE.SCENE_1_EFFECT_START) {
    return interpolate(
      frame,
      [TIMELINE.SCENE_1_TEXT_IN, TIMELINE.SCENE_1_EFFECT_START],
      [0, 1]
    );
  }
  
  // 场景2交互1（180-210帧）
  if (frame >= TIMELINE.SCENE_2_INTERACTION_1 && frame < TIMELINE.SCENE_2_INTERACTION_1 + 30) {
    return interpolate(
      frame,
      [TIMELINE.SCENE_2_INTERACTION_1, TIMELINE.SCENE_2_INTERACTION_1 + 30],
      [0, 1]
    );
  }
};
```

### 交互元素触发管理

```typescript
// 中央交互管理器
export const interactionManager = {
  // 检查是否在某个交互区间
  isInInteraction: (frame: number, interactionId: string) => {
    const interaction = interactions[interactionId];
    return frame >= interaction.startFrame && frame < interaction.endFrame;
  },
  
  // 获取当前交互的进度 (0-1)
  getProgress: (frame: number, interactionId: string) => {
    const interaction = interactions[interactionId];
    return interpolate(frame, [interaction.startFrame, interaction.endFrame], [0, 1]);
  },
  
  // 获取交互的属性值
  getValue: (frame: number, interactionId: string, property: string) => {
    const progress = getProgress(frame, interactionId);
    const interaction = interactions[interactionId];
    return interaction.properties[property].interpolate(progress);
  }
};
```

### 音乐与视觉同步

```typescript
// 关键帧与音乐BPM同步
const BPM = 120;  // 音乐节拍
const MS_PER_BEAT = 60000 / BPM;  // 每拍毫秒数
const FRAME_RATE = 30;
const FRAMES_PER_BEAT = Math.round((MS_PER_BEAT / 1000) * FRAME_RATE);

// 音乐节拍时间轴
export const musicTimeline = {
  BEAT_1: 0 * FRAMES_PER_BEAT,          // 第1拍
  BEAT_2: 1 * FRAMES_PER_BEAT,          // 第2拍
  BEAT_4: 3 * FRAMES_PER_BEAT,          // 第4拍
  BEAT_8: 7 * FRAMES_PER_BEAT,          // 第8拍
  // ...
};

// ✅ 与音乐同步的动画
export const animateWithMusic = (frame: number) => {
  // 在每个音乐节拍上触发动画
  const beatIndex = Math.floor(frame / FRAMES_PER_BEAT);
  return beatIndex * 0.5;  // 随节拍增加
};
```

---

## 预置模板与代码复用库

### 常用场景预制

AI 会根据视频类型推荐使用预制场景：

| 场景类型 | 代码模板 | 最佳时长 | 推荐搭配 |
|---------|---------|---------|---------|
| 文字逐段 | TextRevealScene | 8-12s | 粒子背景 |
| 产品演示 | ProductShowcase | 15-25s | 3D转场 |
| 数据可视化 | DataChart | 20-30s | 计数器 |
| 故事叙事 | NarrativeFlow | 30-60s | 多场景 |
| 品牌收尾 | BrandClosing | 5-8s | Logo动画 |

### 代码分割与导入策略

```typescript
// ✅ 动态导入 - 延迟加载
const Scene1 = lazy(() => import('./scenes/Scene1'));
const Scene2 = lazy(() => import('./scenes/Scene2'));
const Scene3 = lazy(() => import('./scenes/Scene3'));

// ✅ 条件渲染 - 只在必要时挂载
{frame >= 0 && frame < 150 && <Scene1 ... />}
{frame >= 150 && frame < 300 && <Scene2 ... />}
{frame >= 300 && frame < 450 && <Scene3 ... />}

// ✅ 共享组件库
import { 
  TextReveal,
  ParticleBackground,
  TransitionEffect,
  MusicSync
} from './components/shared';
```

---

## 测试与预览策略

### 分段预览

对于长视频，AI 建议分段预览：

```bash
# 只预览开场 (0-150帧)
npm run dev -- --start=0 --end=150

# 只预览中间部分 (150-300帧)
npm run dev -- --start=150 --end=300

# 完整预览
npm run dev
```

### 关键帧验证清单

```
□ 场景转换无抖动
□ 音乐淡入/淡出时序正确
□ 所有文字动画按时触发
□ 交互元素时序对齐
□ 特效强度均衡
□ 颜色过渡流畅
□ 最后帧收尾完整
□ 整体节奏顺畅
```

---

## 性能基准与优化目标

### 渲染性能目标

| 指标 | 目标值 | 优化方法 |
|------|--------|---------|
| 内存占用 | < 500MB | 分场景加载、资源回收 |
| 单帧渲染时间 | < 200ms | 条件渲染、计算缓存 |
| 总渲染时间 (30s@30fps) | < 15分钟 | 硬件加速、并行处理 |
| 输出文件大小 | < 50MB | H.265编码、比特率优化 |

### 优化建议触发条件

- 视频 > 60 秒：启用多线程渲染
- 特效 > 10 个同时：启用渲染缓存
- 文字 > 100 个：使用文字预渲染
- 场景 > 5 个：启用条件渲染

---

_小哈米出品 🐹_  
_基于 Remotion v4.0.459 + React + TypeScript_  
_支持 20秒+ 高质量长视频制作 | 复杂交互设计 | 性能优化
