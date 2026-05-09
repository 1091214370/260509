# 🎬 Remotion 视频制作项目

> 快速开始视频制作的完整项目模板

## 🚀 快速开始

### 1. 安装依赖
```bash
cd remotion-video-project
npm install --registry=https://registry.npmmirror.com
```

### 2. 修改视频配置
编辑 `src/VideoConfig.ts` 文件，修改视频内容

### 3. 预览视频（开发模式）
```bash
npm run dev
```
然后打开 http://localhost:3000 查看效果

### 4. 渲染视频
```bash
npm run build
```
输出文件: `out/video.mp4`

---

## 📁 项目结构

```
remotion-video-project/
├── src/
│   ├── index.ts              # 入口文件（勿修改）
│   ├── Root.tsx              # 组件注册（勿修改）
│   ├── VideoConfig.ts        # ⭐ 视频配置（主要修改这里）
│   ├── VideoTemplate.tsx     # 通用模板组件
│   └── TikTokCaption.tsx     # TikTok字幕组件
├── out/                      # 渲染输出目录
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

---

## 🎨 快速配置

编辑 `src/VideoConfig.ts`，修改以下内容：

```typescript
export const videoConfig = {
  title: '你的标题',           // 主标题
  subtitle: '你的副标题',      // 副标题（可选）
  duration: 5,                 // 时长（秒）
  backgroundColor: '#000000',  // 背景色
  textColor: '#FFFFFF',        // 文字颜色
  accentColor: '#FF2D55',      // 强调色（标签）
  tags: ['标签1', '标签2'],    // 底部标签
  showSubtitle: true,          // 是否显示副标题
  showTags: true,              // 是否显示标签
  enterAnimation: 'spring',    // 动画类型
};
```

---

## 🎯 可用组件

| 组件 | 渲染命令 | 特点 |
|------|---------|------|
| VideoTemplate | `npm run build` | 通用模板，标题+副标题+标签 |
| TikTokCaption | `npm run build:tiktok` | 抖音字幕风格，逐字出现 |

---

## 📝 常见操作

### 更换字幕内容
编辑 `src/VideoConfig.ts` 的 `title` 和 `subtitle`

### 更换标签颜色
修改 `accentColor`（如 #FF2D55 红色, #4ade80 绿色）

### 更换背景色
修改 `backgroundColor`

### 添加更多标签
修改 `tags` 数组

### 调整时长
修改 `duration`（秒）

---

## 🔧 进阶操作

### 创建新组件
1. 在 `src/` 下创建新文件，如 `MyVideo.tsx`
2. 在 `Root.tsx` 中注册新 Composition
3. 运行 `npx remotion render MyVideo out/my-video.mp4`

### 更换背景图片
在 `VideoTemplate.tsx` 中添加背景图片支持

---

## ⚠️ 注意事项

1. 修改配置后运行 `npm run build` 重新渲染
2. 视频尺寸默认 1080x1920（抖音竖屏）
3. 如需横屏，修改 `VideoConfig.ts` 中的 `width` 和 `height`

---

_项目版本: 1.0_
_更新日期: 2026-05-09_
_小哈米 🐹_