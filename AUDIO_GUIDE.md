# 🎵 背景音乐配置指南

> 为您的视频添加完美的背景音乐

---

## AI 执行清单（音乐）

- 最小输入：是否启用音乐（boolean）、希望风格（如 `EDM` / `轻快`）、目标时长
- 期望输出：`VideoConfig` 中的音频片段（`enableAudio`、`audioPath`、`audioVolume`、淡入淡出帧数）和推荐 BPM
- 执行步骤：1) 若启用，验证 `src/` 下是否存在音频文件；2) 生成音频配置片段；3) 提供 BPM 与节拍帧间隔建议


## 目录

- [快速开始（3步）](#快速开始3步)
- [音量调整](#音量调整)
- [支持的音频格式](#支持的音频格式)
- [音乐长度匹配](#音乐长度匹配)
- [使用场景示例](#使用场景示例)
- [常见问题](#常见问题)
- [音乐文件管理](#音乐文件管理)

## 快速开始（3步）

### 第一步：准备音乐文件

1. 找一个 `.mp3` 格式的音乐文件
2. 将文件放在 `remotion-video-project/src/` 目录下

```
remotion-video-project/src/
├── index.ts
├── VideoConfig.ts
├── bg-music.mp3     ← 放在这里
└── ...
```

### 第二步：配置文件路径

打开 `src/VideoConfig.ts`，修改这三行：

```typescript
enableAudio: true,            // 开启音乐
audioPath: './bg-music.mp3',  // 你的文件名
audioVolume: 0.3,             // 音量（0-1）
```

### 第三步：渲染视频

```bash
cd ./remotion-video-project
npm run build
```

**完成！** 你的视频现在有背景音乐了 🎉

---

## 音量调整

音量范围是 **0 到 1**，0.5 以下为推荐范围：

| 音量值 | 效果 | 适用场景 |
|-------|------|---------|
| 0.1 | 非常小 | 不想让音乐盖过话语 |
| 0.2 | 较小 | 有旁白/声音的视频 |
| **0.3** | **适中** | **推荐默认值** |
| 0.5 | 较大 | 纯动画视频（无旁白） |
| 0.7 | 很大 | 想突出音乐 |
| 1.0 | 最大 | 很少用（容易过响） |

### 示例

```typescript
// 音乐很小，主要听旁白
enableAudio: true,
audioPath: './bg-music.mp3',
audioVolume: 0.15,

// 音乐适中
enableAudio: true,
audioPath: './bg-music.mp3',
audioVolume: 0.3,

// 音乐较大，音乐是重点
enableAudio: true,
audioPath: './bg-music.mp3',
audioVolume: 0.6,
```

---

## 支持的音频格式

Remotion 支持以下格式（都可以直接使用）：

| 格式 | 推荐 | 说明 |
|------|------|------|
| **MP3** | ⭐⭐⭐ | 最通用，文件小，兼容性好 |
| **AAC** | ⭐⭐ | 高质量，文件中等 |
| **WAV** | ⭐⭐ | 无压缩，文件大，质量最好 |
| **M4A** | ⭐ | iTunes格式，可用但较少 |

**推荐使用 MP3 格式**（最稳定可靠）

---

## 音乐长度匹配

### 情况1：音乐比视频短

例如：视频10秒，音乐只有8秒

```
音乐:  ▓▓▓▓▓▓▓▓░░
视频:  ████████████
```

**结果**：音乐播完后，视频继续播放但没有声音（最后2秒无声）

**解决方案**：选择足够长的音乐，或者缩短视频时长

```typescript
// 方案1：增加视频时长
duration: 8,  // 改成8秒来匹配音乐

// 方案2：找更长的音乐
audioPath: './longer-music.mp3',
```

### 情况2：音乐比视频长

例如：视频8秒，音乐有10秒

```
音乐:  ██████████░░
视频:  ████████
```

**结果**：音乐会被自动截断（Remotion会自动处理）

**这是OK的**，Remotion会自动在视频结束时停止音乐

---

## 使用场景示例

### 场景1：产品发布视频

```typescript
title: '新产品上线',
duration: 10,
audioPath: './uplifting-music.mp3',
enableAudio: true,
audioVolume: 0.4,        // 音乐要够响
```

**音乐建议**：激励、向上、节奏快的背景音乐

### 场景2：教育/讲座视频

```typescript
title: '今日课程',
duration: 8,
audioPath: './light-background.mp3',
enableAudio: true,
audioVolume: 0.15,       // 很小，不要盖过讲话
```

**音乐建议**：轻松、不分心、节奏慢的背景音乐

### 场景3：美食/生活方式视频

```typescript
title: '美食推荐',
duration: 12,
audioPath: './cozy-music.mp3',
enableAudio: true,
audioVolume: 0.3,        // 中等音量
```

**音乐建议**：温暖、舒适、治愈系音乐

### 场景4：游戏/电竞视频

```typescript
title: '大赛精彩时刻',
duration: 15,
audioPath: './intense-music.mp3',
enableAudio: true,
audioVolume: 0.6,        // 较大，突出紧张感
```

**音乐建议**：紧张、激烈、高能的背景音乐

### 场景5：商业演示视频

```typescript
title: '商业计划',
duration: 20,
audioPath: './corporate-music.mp3',
enableAudio: true,
audioVolume: 0.25,       // 较小，专业感
```

**音乐建议**：专业、正式、不分心的背景音乐

---

## 常见问题

### Q: 音乐变音了/播放速度不对？

Remotion 会自动调整音乐速度以匹配视频帧率（30fps）。这通常不会导致问题，但如果你发现声音不对：

1. **确认音乐格式**：使用 MP3 格式
2. **重新检查配置**：`audioPath` 路径是否正确
3. **重新渲染**：清除缓存，重新运行 `npm run build`

### Q: 关闭音乐最快的方式？

只需改一行：

```typescript
enableAudio: false,  // 关闭音乐
```

### Q: 能否在视频中间改变音乐？

目前不支持。Remotion 视频配置中只能有一首背景音乐。

如果需要多首音乐或音乐变化，可以：
1. 在视频编辑软件中后期处理
2. 或者创建多个视频版本（不同的音乐）

### Q: 可以使用 YouTube 的音乐库吗？

**不推荐**。理由：
- 可能存在版权问题
- 在线音乐无法本地使用
- 渲染可能失败

**推荐来源**：
- 无版权音乐库（Freepik、Unsplash 等）
- Creative Commons 音乐
- 购买商业音乐许可

### Q: 如何找无版权背景音乐？

推荐网站：
- **Pixabay Music** - 完全免费，无版权
- **Unsplash Music** - 高质量无版权音乐
- **YouTube Audio Library** - YouTube官方音乐库（需要YouTube账号）
- **Freepik Music** - 多风格选择
- **Epidemic Sound** - 付费订阅制

### Q: 渲染时报错提示"找不到音乐文件"？

检查这几个步骤：

```
1. 音乐文件是否在 src/ 目录？
   ✓ 正确:  src/bg-music.mp3
   ✗ 错误:  remotion-video-project/bg-music.mp3

2. 路径是否写对？
   ✓ 正确:  audioPath: './bg-music.mp3'
   ✗ 错误:  audioPath: './src/bg-music.mp3'
   ✗ 错误:  audioPath: 'bg-music.mp3'

3. 文件名是否完全匹配（包括大小写）？
   ✓ 正确:  audioPath: './bg-music.mp3' (有 './') 
   ✓ 正确:  audioPath: './BG-Music.mp3' (如果实际文件名是这样)

4. 重新渲染：
   npm run build
```

### Q: 音乐和视频不同步？

Remotion 会自动保持同步。如果出现不同步：

1. 检查视频的 `duration` 配置是否正确
2. 清除缓存重新渲染：`npm run build`

---

## 音乐文件管理

### 文件组织建议

```
remotion-video-project/src/
├── VideoConfig.ts
├── VideoTemplate.tsx
├── index.ts
├── music/              ← 新建文件夹
│   ├── bg-music.mp3
│   ├── uplifting.mp3
│   └── calm.mp3
└── ...
```

然后在配置中改为：
```typescript
audioPath: './music/bg-music.mp3',
```

### 文件大小提示

- MP3 文件通常很小（1分钟约1MB）
- 视频渲染时会将音乐嵌入到视频文件中
- 不用担心文件大小问题

---

## 进阶：调整不同的视频使用不同音乐

```typescript
// VideoConfig.ts

export const videoConfig = {
  title: '我的视频',
  duration: 8,
  
  // 根据需要选择不同的音乐
  enableAudio: true,
  audioPath: './music/uplifting.mp3',  // 改这里切换音乐
  audioVolume: 0.3,
};
```

或者创建多个配置预设：

```typescript
// 产品发布版
export const productConfig = {
  // ... 其他配置
  audioPath: './music/energetic.mp3',
  audioVolume: 0.4,
};

// 教育版
export const educationConfig = {
  // ... 其他配置
  audioPath: './music/calm.mp3',
  audioVolume: 0.15,
};
```

---

## 总结检查清单

- [ ] 音乐文件已放在 `src/` 目录
- [ ] `enableAudio: true` 已设置
- [ ] `audioPath: './xxx.mp3'` 路径正确
- [ ] `audioVolume` 已调整到合适大小
- [ ] `duration` 足够长来容纳整首音乐
- [ ] 运行 `npm run build` 重新渲染
- [ ] 检查输出视频是否有声音

---

_背景音乐配置指南 v1.0_
_更新日期: 2026-05-09_
