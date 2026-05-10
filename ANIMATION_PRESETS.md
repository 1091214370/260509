# 🎨 动画效果配置示例

> 各种场景下的动画组合配置参考

---

## AI 执行清单（动画预设）

- 最小输入：目标风格（如 `活力` / `简约` / `节奏`）、时长、目标平台
- 期望输出：`videoConfig` 最小示例（可直接拷贝到 `src/VideoConfig.ts`）和推荐参数（particleCount、glowIntensity 等）
- 执行步骤：1) 根据风格选择预设；2) 输出配置片段与注释；3) 若缺资源，使用占位值


## 目录

- [示例 1: 炫彩活力版（推荐用于产品/品牌视频）](#示例-1-炫彩活力版推荐用于产品品牌视频)
- [示例 2: 高级简约版（推荐用于企业/高端品牌）](#示例-2-高级简约版推荐用于企业高端品牌)
- [示例 3: 音乐节奏版（推荐用于音乐/内容创作）](#示例-3-音乐节奏版推荐用于音乐内容创作)
- [示例 4: 极简静态版（推荐用于文案/教育内容）](#示例-4-极简静态版推荐用于文案教育内容)
- [示例 5: 游戏电竞版（推荐用于游戏/电竞视频）](#示例-5-游戏电竞版推荐用于游戏电竞视频)
- [示例 6: 美食餐饮版（推荐用于美食/生活方式）](#示例-6-美食餐饮版推荐用于美食生活方式)
- [示例 7: 自定义组合模板](#示例-7-自定义组合模板)
- [示例 8: 完整配置模板（包含音乐）](#示例-8-完整配置模板包含音乐)
- [配置调整建议](#配置调整建议)
- [AI 辅助配置建议](#ai-辅助配置建议)

## 示例 1: 炫彩活力版（推荐用于产品/品牌视频）

```typescript
export const videoConfig = {
  title: '新产品发布',
  subtitle: '革新你的生活方式',
  duration: 10,
  
  backgroundColor: '#0f0f23',
  textColor: '#FFFFFF',
  accentColor: '#00D9FF',
  tags: ['创新', '科技', '未来'],
  
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'spring',
  
  // 💥 动画配置：全开启，打造炫彩视觉
  backgroundAnimation: 'shapes',      // 旋转形状背景
  particleCount: 15,                  // 众多粒子
  showDecorationLine: true,           // 装饰线条
  decorationLineStartFrame: 5,
  showGlow: true,                     // 中心发光
  glowIntensity: 0.9,
  showPulse: true,                    // 脉冲波
  pulseStartFrame: 20,
  showRotatingRing: true,             // 旋转光环
  rotatingRingSize: 280,
};
```

**效果**: 动感十足，适合产品发布、新功能宣传

---

## 示例 2: 高级简约版（推荐用于企业/高端品牌）

```typescript
export const videoConfig = {
  title: '优雅的选择',
  subtitle: '品质生活的开始',
  duration: 8,
  
  backgroundColor: '#F5F5F5',
  textColor: '#1a1a1a',
  accentColor: '#333333',
  tags: ['精选', '品质', '专业'],
  
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'fade',
  
  // 🎯 动画配置：克制优雅
  backgroundAnimation: 'gradient',    // 渐变背景
  particleCount: 0,                   // 无粒子
  showDecorationLine: true,           // 单调装饰线
  decorationLineStartFrame: 10,
  showGlow: false,                    // 无光晕
  showPulse: false,                   // 无脉冲
  showRotatingRing: false,            // 无光环
};
```

**效果**: 克制优雅，适合高端品牌、企业宣传

---

## 示例 3: 音乐节奏版（推荐用于音乐/内容创作）

```typescript
export const videoConfig = {
  title: '新歌发布',
  subtitle: '听听这个节奏',
  duration: 12,
  
  backgroundColor: '#1a1a2e',
  textColor: '#FF00FF',
  accentColor: '#FF00FF',
  tags: ['新歌', '热血', '节奏'],
  
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'spring',
  
  // 🎵 动画配置：节奏动感
  backgroundAnimation: 'shapes',
  particleCount: 20,                  // 很多粒子，增加节奏感
  showDecorationLine: true,
  decorationLineStartFrame: 3,        // 快速出现
  showGlow: true,
  glowIntensity: 1.2,                 // 更强光晕
  showPulse: true,
  pulseStartFrame: 10,
  showRotatingRing: true,
  rotatingRingSize: 320,              // 大光环
};
```

**效果**: 快节奏、充满活力，适合音乐、舞蹈视频

---

## 示例 4: 极简静态版（推荐用于文案/教育内容）

```typescript
export const videoConfig = {
  title: '今日智慧',
  subtitle: '一句话改变思维',
  duration: 6,
  
  backgroundColor: '#FFFFFF',
  textColor: '#2D3748',
  accentColor: '#4299E1',
  tags: [],
  
  showSubtitle: true,
  showTags: false,
  enterAnimation: 'fade',
  
  // 📚 动画配置：静态无扰
  backgroundAnimation: 'none',       // 无背景
  particleCount: 0,                  // 无粒子
  showDecorationLine: false,         // 无装饰线
  showGlow: false,                   // 无光晕
  showPulse: false,                  // 无脉冲
  showRotatingRing: false,           // 无光环
};
```

**效果**: 完全静态，适合文案、教育、讲座内容

---

## 示例 5: 游戏电竞版（推荐用于游戏/电竞视频）

```typescript
export const videoConfig = {
  title: '大赛即将开启',
  subtitle: '准备好了吗？战士！',
  duration: 8,
  
  backgroundColor: '#0a0e27',
  textColor: '#00FF00',
  accentColor: '#FF0080',
  tags: ['电竞', '战斗', '火热'],
  
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'spring',
  
  // 🎮 动画配置：炸裂感
  backgroundAnimation: 'grid',        // 网格背景（科幻感）
  particleCount: 25,                  // 超多粒子
  showDecorationLine: true,
  decorationLineStartFrame: 1,        // 超快速
  showGlow: true,
  glowIntensity: 1.5,                 // 超强光晕
  showPulse: true,
  pulseStartFrame: 5,
  showRotatingRing: true,
  rotatingRingSize: 350,              // 超大光环
};
```

**效果**: 炸裂感、科幻感，适合游戏、电竞、动作视频

---

## 示例 6: 美食餐饮版（推荐用于美食/生活方式）

```typescript
export const videoConfig = {
  title: '食欲之旅',
  subtitle: '舌尖上的享受',
  duration: 10,
  
  backgroundColor: '#2D1810',         // 咖啡色
  textColor: '#FFD700',              // 金色
  accentColor: '#FF6B35',            // 橙色
  tags: ['美食', '享受', '推荐'],
  
  showSubtitle: true,
  showTags: true,
  enterAnimation: 'slide-up',
  
  // 🍜 动画配置：温暖舒适
  backgroundAnimation: 'gradient',
  particleCount: 8,                  // 适量粒子
  showDecorationLine: true,
  decorationLineStartFrame: 8,
  showGlow: true,
  glowIntensity: 0.7,                // 温暖光晕
  showPulse: true,
  pulseStartFrame: 25,
  showRotatingRing: true,
  rotatingRingSize: 250,
};
```

**效果**: 温暖舒适，适合美食、生活方式视频

---

## 示例 7: 自定义组合模板

用户可以根据需求自由组合：

```typescript
export const videoConfig = {
  // ... 基础配置
  
  // 只想要背景动画
  backgroundAnimation: 'shapes',
  particleCount: 0,
  showDecorationLine: false,
  showGlow: false,
  showPulse: false,
  showRotatingRing: false,
  
  // 或者，只想要粒子效果
  // backgroundAnimation: 'none',
  // particleCount: 12,
  // showDecorationLine: false,
  // showGlow: false,
  // showPulse: false,
  // showRotatingRing: false,
};
```

---

## 配置调整建议

### 根据视频主题选择

| 主题 | 推荐风格 | 关键配置 |
|------|---------|---------|
| 产品/创新 | 炫彩活力版 | 全开启，高强度 |
| 高端/企业 | 简约版 | 部分开启，低强度 |
| 音乐/娱乐 | 节奏动感版 | 快速、多粒子 |
| 教育/文案 | 极简版 | 全关闭 |
| 游戏/电竞 | 炸裂版 | 超强度全开 |
| 美食/生活 | 温暖舒适版 | 中等强度 |

### 根据视频时长调整

- **< 5秒**: 减少粒子数量，加快动画速度
- **5-10秒**: 标准配置
- **> 10秒**: 可增加粒子数量，注意不要太满

### 根据渲染质量调整

- **高质量（--quality=0）**: 可以使用更多粒子、更强光晕
- **标准质量（--quality=1-2）**: 适中配置
- **快速预览（--quality=3）**: 建议减少粒子，简化效果

---

## AI 辅助配置建议

当用户说"想要更炫彩"时，建议：
```typescript
backgroundAnimation: 'shapes',
particleCount: 12,
showDecorationLine: true,
showGlow: true,
glowIntensity: 0.9,
showPulse: true,
showRotatingRing: true,
```

当用户说"太花哨了，简化一点"时，建议：
```typescript
backgroundAnimation: 'gradient',  // 改成渐变
particleCount: 4,                 // 减少粒子
showGlow: true,
showPulse: false,                 // 关闭脉冲
showRotatingRing: false,          // 关闭光环
```

---

## 示例 8: 完整配置模板（包含音乐）

```typescript
export const videoConfig = {
  // ====== 基本信息 ======
  title: '我的精美视频',
  subtitle: '加上了背景音乐的版本',
  duration: 10,

  // ====== 视觉效果 ======
  backgroundColor: '#0a0e27',
  textColor: '#FFFFFF',
  accentColor: '#00D9FF',
  tags: [],

  // ====== 显示控制 ======
  showSubtitle: true,
  showTags: false,  // 已关闭底部标签
  enterAnimation: 'spring',

  // ====== 背景装饰动画 ======
  backgroundAnimation: 'shapes',
  particleCount: 10,
  particleStartFrame: 30,

  showDecorationLine: true,
  decorationLineStartFrame: 5,

  showGlow: true,
  glowIntensity: 0.8,

  showPulse: true,
  pulseStartFrame: 20,

  showRotatingRing: true,
  rotatingRingSize: 280,

  // ====== 🎵 背景音乐（新增）======
  enableAudio: true,            // 开启音乐
  audioPath: './bg-music.mp3',  // 音乐文件路径
  audioVolume: 0.3,             // 音量30%

  // ====== 尺寸 ======
  width: 1080,
  height: 1920,
};
```

**配置说明**：
- ✅ 关闭了底部标签
- ✅ 开启了所有动画效果（背景、粒子、线条、光晕、脉冲、光环）
- ✅ 添加了背景音乐，音量适中

---

_动画配置快速参考 v1.0_
_更新日期: 2026-05-09_
