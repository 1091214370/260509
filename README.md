# 🎬 视频制作技能 - 完整使用指南

> 快速让 AI 学会制作 Remotion 视频的手册

---

## 📚 目录

1. [技能概述](#技能概述)
2. [快速开始](#快速开始)
3. [视频配置详解](#视频配置详解)
4. [渲染视频](#渲染视频)
5. [常见问题](#常见问题)

---

## 技能概述

本技能让 AI 能够通过对话方式，快速为用户制作 Remotion 视频。

### 工作原理

```
用户说需求 → AI 分析 → 追问确认 → AI 生成代码 → 渲染视频 → 交付
```

### 技术栈

- **Remotion**: 用 React 代码生成视频的框架
- **React + TypeScript**: 组件使用现代 React + 类型安全
- **Node.js**: 运行环境

### 可制作的视频类型

| 类型 | 示例 |
|------|------|
| 抖音字幕视频 | 带逐字动画的短文案 |
| 标题展示视频 | 大字报风格的宣传语 |
| 品牌介绍 | 企业/产品介绍视频 |
| 数据可视化 | 排行榜、统计展示 |
| 模板化批量视频 | 批量生成带不同内容的同一模板 |

---

## 快速开始

### 方式一：开发预览（推荐先预览）

```bash
cd ./remotion-video-project
npm install --registry=https://registry.npmmirror.com
npm run dev
```

然后打开浏览器访问 `http://localhost:3000`

### 方式二：直接渲染视频

```bash
cd ./remotion-video-project
npm run build
```

视频会输出到 `out/` 目录

**导出到桌面：** 将 `out/` 文件夹中生成的视频复制到你的桌面

---

## 视频配置详解

所有视频配置都在 `src/VideoConfig.ts` 文件中：

```typescript
export const videoConfig = {
  // ====== 基本信息 ======
  title: '欢迎观看',           // 主标题
  subtitle: '今天分享一个...',  // 副标题（可选）
  duration: 5,                 // 时长（秒）

  // ====== 视觉效果 ======
  backgroundColor: '#000000',   // 背景色
  textColor: '#FFFFFF',        // 文字颜色
  accentColor: '#FF2D55',      // 强调色（标签背景）

  // ====== 内容标签 ======
  tags: ['必去', '推荐', '打卡'],  // 底部 #标签

  // ====== 显示控制 ======
  showSubtitle: true,    // 是否显示副标题
  showTags: false,       // 是否显示底部标签（默认关闭）

  // ====== 文字动画设置 ======
  // 可选: 'spring' | 'fade' | 'slide-up'
  enterAnimation: 'spring',

  // ====== 新增：背景装饰动画 ======
  // 可选: 'gradient' | 'shapes' | 'grid' | 'none'
  backgroundAnimation: 'shapes',

  // ====== 新增：粒子效果 ======
  particleCount: 8,           // 粒子数量（0表示关闭）
  particleStartFrame: 30,     // 粒子开始帧数

  // ====== 新增：装饰线条 ======
  showDecorationLine: true,        // 是否显示标题上方的装饰线条
  decorationLineStartFrame: 5,     // 装饰线条开始帧数

  // ====== 新增：光晕效果 ======
  showGlow: true,              // 是否显示发光效果
  glowIntensity: 0.6,         // 发光强度 (0-1)

  // ====== 新增：脉冲效果 ======
  showPulse: true,             // 是否显示向外扩散的脉冲
  pulseStartFrame: 20,         // 脉冲开始帧数

  // ====== 新增：旋转光环 ======
  showRotatingRing: true,      // 是否显示旋转光环
  rotatingRingSize: 280,       // 光环大小

  // ====== 新增：背景音乐 ======
  enableAudio: false,           // 是否启用背景音乐
  audioPath: './bg-music.mp3',  // 音乐文件路径
  audioVolume: 0.3,             // 音量（0-1，0.3表示30%）

  // ====== 尺寸（一般不改）======
  width: 1080,    // 宽度
  height: 1920,   // 高度（竖屏）
};
```

### 动画效果说明

| 效果 | 配置项 | 说明 |
|------|-------|------|
| **背景装饰** | `backgroundAnimation` | `gradient`(渐变) / `shapes`(旋转形状) / `grid`(网格) / `none`(无) |
| **粒子效果** | `particleCount` | 浮动粒子数量，0表示关闭 |
| **装饰线条** | `showDecorationLine` | 标题上方的伸缩线条动画 |
| **光晕效果** | `showGlow` | 中心发光效果 |
| **脉冲动画** | `showPulse` | 从中心向外扩散的圆形脉冲 |
| **旋转光环** | `showRotatingRing` | 围绕中心持续旋转的光环 |

### 配置修改示例

#### 1. 制作"宝藏公园"推荐视频（高能版）

```typescript
export const videoConfig = {
  title: '宝藏公园',
  subtitle: '家门口的遛娃圣地',
  duration: 8,
  backgroundColor: '#1a1a2e',
  textColor: '#FFFFFF',
  accentColor: '#4ade80',  // 绿色系
  tags: ['宝藏公园', '亲子必去', '周末遛娃'],
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'slide-up',
  
  // 新增动画配置
  backgroundAnimation: 'shapes',      // 旋转形状背景
  particleCount: 10,                  // 粒子效果
  showDecorationLine: true,           // 装饰线条
  showGlow: true,                     // 光晕效果
  glowIntensity: 0.8,
  showPulse: true,                    // 脉冲效果
  pulseStartFrame: 25,
  showRotatingRing: true,             // 旋转光环
  rotatingRingSize: 250,
};
```

#### 2. 制作美食推荐视频

```typescript
export const videoConfig = {
  title: '这家串串绝了！',
  subtitle: '成都必吃的地道味道',
  duration: 10,
  backgroundColor: '#1c1c1c',
  textColor: '#FF6B35',
  accentColor: '#FF6B35',
  tags: ['美食推荐', '串串香', '成都味道'],
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'spring',
  
  // 动画配置：活泼风格
  backgroundAnimation: 'gradient',    // 渐变背景
  particleCount: 12,                  // 更多粒子
  showDecorationLine: true,
  showGlow: true,
  glowIntensity: 1,                   // 更亮的光晕
  showPulse: true,
  pulseStartFrame: 15,
  showRotatingRing: true,
  rotatingRingSize: 300,
};
```

#### 3. 极简风格视频

```typescript
export const videoConfig = {
  title: 'Less is More',
  subtitle: '',
  duration: 5,
  backgroundColor: '#FAFAFA',
  textColor: '#1a1a1a',
  accentColor: '#1a1a1a',
  tags: [],
  showSubtitle: false,
  showTags: false,
  enterAnimation: 'fade',
  
  // 动画配置：简约风格
  backgroundAnimation: 'none',        // 无背景动画
  particleCount: 0,                   // 关闭粒子
  showDecorationLine: false,
  showGlow: false,
  showPulse: false,
  showRotatingRing: false,
};

---

## 渲染视频

### 方法一：命令行渲染

```bash
# 渲染 TikTokCaption 风格
npx remotion render TikTokCaption out/demo.mp4

# 渲染 VideoTemplate 风格
npx remotion render VideoTemplate out/video.mp4
```

### 方法二：使用 npm script

```bash
npm run build
```

### 输出位置

渲染完成的视频在 `out/` 目录：
```
out/
├── demo.mp4      # TikTokCaption 渲染结果
└── video.mp4     # VideoTemplate 渲染结果
```

### 渲染参数调整

编辑 `package.json` 中的 build 脚本：

```json
{
  "scripts": {
    "build": "remotion render VideoTemplate out/video.mp4 --quality=2"
  }
}
```

`--quality=2` 表示高质量渲染（0-3，数字越小质量越高）

---

## 常见问题

### Q: 视频尺寸可以改吗？

可以。修改 `src/VideoConfig.ts` 中的 `width` 和 `height`：

- **抖音竖屏**: 1080 x 1920
- **抖音横屏**: 1920 x 1080
- **小红书**: 1080 x 1350
- **朋友圈**: 1080 x 1920

### Q: 如何添加背景图片？

在 `src/VideoTemplate.tsx` 中添加 `img` 标签：

```tsx
<div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(./your-image.jpg)',
  backgroundSize: 'cover',
}} />
```

### Q: 如何调整动画速度？

修改 `src/VideoConfig.ts` 中的 `duration`，或者调整组件中的帧数计算逻辑。

### Q: 标签不显示？

检查配置：
```typescript
showTags: true,  // 必须是 true
tags: ['标签1', '标签2'],  // 标签数组不能为空
```

### Q: 怎样关闭所有背景动画，只保留文案？

设置以下配置：
```typescript
backgroundAnimation: 'none',    // 无背景动画
particleCount: 0,              // 关闭粒子
showDecorationLine: false,     // 关闭装饰线条
showGlow: false,               // 关闭光晕
showPulse: false,              // 关闭脉冲
showRotatingRing: false,       // 关闭旋转光环
```

### Q: 如何调整背景动画风格？

修改 `backgroundAnimation` 配置项：
```typescript
backgroundAnimation: 'shapes',   // 旋转形状（推荐）
backgroundAnimation: 'gradient', // 渐变背景
backgroundAnimation: 'grid',     // 网格效果
backgroundAnimation: 'none',     // 无动画
```

### Q: 粒子太多/太少了怎么调整？

修改 `particleCount` 值：
```typescript
particleCount: 5,   // 较少粒子
particleCount: 15,  // 较多粒子
particleCount: 0,   // 关闭粒子
```

### Q: 想要更强/更弱的光晕效果？

调整 `glowIntensity` 值（0-1）：
```typescript
glowIntensity: 0.3,  // 弱光晕
glowIntensity: 0.8,  // 强光晕
glowIntensity: 1.5,  // 超强光晕
```

### Q: 旋转光环的大小如何调整？

修改 `rotatingRingSize` 值：
```typescript
rotatingRingSize: 200,  // 较小
rotatingRingSize: 350,  // 较大
```

### Q: 如何添加背景音乐？

#### 第一步：准备音乐文件
1. 准备一个 `.mp3` 格式的音乐文件
2. 将文件放在 `remotion-video-project/src/` 目录下
3. 比如：`src/bg-music.mp3`

#### 第二步：配置音乐
在 `src/VideoConfig.ts` 中修改：
```typescript
enableAudio: true,            // 启用音乐
audioPath: './bg-music.mp3',  // 指向你的音乐文件
audioVolume: 0.3,             // 音量（0-1，0.3表示30%）
```

#### 第三步：渲染视频
```bash
npm run build
```

### Q: 音乐太大声/太小声了？

调整 `audioVolume` 值（0-1）：
```typescript
audioVolume: 0.1,   // 很小
audioVolume: 0.5,   // 中等
audioVolume: 1.0,   // 最大
```

### Q: 想关闭音乐？

设置 `enableAudio: false`：
```typescript
enableAudio: false,  // 关闭音乐
```

### Q: 如何使用其他格式的音乐？

Remotion 支持多种音频格式（mp3、aac、wav等）。只需将文件放在 `src/` 目录，然后更新 `audioPath` 即可：
```typescript
audioPath: './my-music.aac',
audioPath: './my-music.wav',
audioPath: './my-music.m4a',
```

### Q: 音乐长度和视频时长不一致？

Remotion 会自动根据视频时长处理音乐：
- 如果音乐**比视频短**：会停止播放
- 如果音乐**比视频长**：会被截断

建议：准备的音乐时长 = 视频时长

### Q: 想做更复杂的视频怎么办？

可以创建新的组件文件，比如：
- `src/PromoVideo.tsx` - 促销视频专用
- `src/IntroVideo.tsx` - 片头专用

然后在 `src/Root.tsx` 中注册新组件。

---

## 动画系统架构

项目内置了一套完整的动画效果系统 (`src/AnimationEffects.tsx`)，包括：

| 组件 | 用途 | 示例 |
|------|------|------|
| `BackgroundAnimation` | 背景装饰 | 渐变、旋转形状、网格 |
| `ParticleEffect` | 粒子浮动 | 上升的点状粒子 |
| `LineAnimation` | 装饰线条 | 标题两侧伸缩线条 |
| `GlowEffect` | 发光效果 | 中心脉冲光晕 |
| `PulseAnimation` | 脉冲波 | 向外扩散的圆圈 |
| `RotatingRing` | 旋转光环 | 持续旋转的圆形 |

这些效果都可以通过 `VideoConfig.ts` 配置直接开启/关闭，无需修改代码！

### 创建自定义动画效果

如果需要自定义动画，可以在 `AnimationEffects.tsx` 中添加新组件：

```tsx
export const MyCustomEffect: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 200 },
  });
  
  return (
    <div style={{ transform: `scale(${scale})` }}>
      {/* 你的动画内容 */}
    </div>
  );
};
```

然后在 `VideoTemplate.tsx` 中使用它，并在 `VideoConfig.ts` 中添加开关。

---

## 进阶：创建新组件

### 步骤 1: 创建组件文件

创建 `src/MyVideo.tsx`：

```tsx
import React from 'react';
import { AbsoluteFill } from 'remotion';

export const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{ backgroundColor: '#000' }}
    >
      <h1>我的自定义视频</h1>
    </AbsoluteFill>
  );
};
```

### 步骤 2: 在 Root.tsx 中注册

```tsx
import { Composition } from 'remotion';
import { MyVideo } from './MyVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 其他组件... */}

      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={150}  // 5秒 = 150帧
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
```

### 步骤 3: 渲染

```bash
npx remotion render MyVideo out/my-video.mp4
```

---

_文档版本: 1.0_
_更新日期: 2026-05-09_
_制作: 小哈米 🐹_