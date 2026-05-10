# 长视频制作指南（20秒+）

> 使用 Remotion 制作超过 20 秒的高质量、多场景、复杂交互视频的完整指南

## 目录

1. [架构设计](#架构设计)
2. [性能优化](#性能优化)
3. [时间轴管理](#时间轴管理)
4. [交互设计](#交互设计)
5. [音乐同步](#音乐同步)
6. [调试与预览](#调试与预览)
7. [常见问题](#常见问题)

---

## AI 执行清单（简洁）

- 最小输入：`title`、`duration`（秒）、`style`（如 tech/ minimal/ tiktok）
- 期望输出：`src/VideoConfig.ts`、`src/config/timeline.ts`（若 duration>20s）、至少一个场景 `src/scenes/Scene1.tsx`
- 执行步骤：1) 生成 `visual_prompt` 并返回；2) 等待确认；3) 生成配置与场景骨架；4) 提供 `npm run build` 渲染命令
- 验证要点：duration 与帧率一致、`audioPath` 存在（若启用）、输出目录 `out/` 可写


## 架构设计

### 推荐的项目结构

```
src/
├── index.ts                      # 入口
├── Root.tsx                      # 主组件（场景路由）
├── config/
│   ├── timeline.ts               # ⭐ 全局时间轴管理
│   ├── scenes.ts                 # 场景配置
│   └── interactions.ts           # 交互配置
├── scenes/
│   ├── Scene1_Opening.tsx        # 场景1
│   ├── Scene2_Main.tsx           # 场景2
│   └── Scene3_Closing.tsx        # 场景3
├── components/
│   ├── shared/                   # 共享组件
│   │   ├── TextReveal.tsx
│   │   ├── AnimatedShape.tsx
│   │   └── ParticleEffect.tsx
│   ├── transitions/              # 过渡组件
│   │   ├── FadeTransition.tsx
│   │   └── SlideTransition.tsx
│   └── interactions/             # 交互组件
│       ├── Counter.tsx
│       └── ProgressBar.tsx
├── hooks/                        # 自定义hooks
│   ├── useTimeline.ts
│   ├── useInteraction.ts
│   └── usePerformance.ts
└── utils/
    ├── timing.ts                 # 时间计算工具
    ├── animation.ts              # 动画工具
    └── music-sync.ts             # 音乐同步工具
```

### 全局时间轴管理（timeline.ts）

```typescript
// config/timeline.ts
export const FRAME_RATE = 30;
export const VIDEO_DURATION = 30;  // 秒
export const TOTAL_FRAMES = VIDEO_DURATION * FRAME_RATE;  // 900帧

// 全局时间轴
export const TIMELINE = {
  // 场景1: 开场 (0-150帧 = 5秒)
  SCENE_1: {
    start: 0,
    end: 150,
    duration: 150,
    events: {
      textIn: 10,
      effectStart: 50,
      effectEnd: 140,
      transitionStart: 130,
      transitionEnd: 150,
    }
  },
  
  // 场景2: 主体 (150-600帧 = 15秒)
  SCENE_2: {
    start: 150,
    end: 600,
    duration: 450,
    events: {
      intro: 160,
      interaction1: 200,
      interaction2: 350,
      interaction3: 500,
      transitionStart: 570,
      transitionEnd: 600,
    }
  },
  
  // 场景3: 结尾 (600-900帧 = 10秒)
  SCENE_3: {
    start: 600,
    end: 900,
    duration: 300,
    events: {
      fadeIn: 610,
      textAppear: 650,
      cta: 800,
      fadeOut: 870,
    }
  }
};

// 辅助函数
export const getScene = (frame: number) => {
  if (frame < TIMELINE.SCENE_1.end) return 'SCENE_1';
  if (frame < TIMELINE.SCENE_2.end) return 'SCENE_2';
  return 'SCENE_3';
};

export const getSceneFrame = (frame: number) => {
  const scene = getScene(frame);
  return frame - TIMELINE[scene].start;
};

export const isInRange = (frame: number, start: number, end: number) => {
  return frame >= start && frame < end;
};
```

### 场景配置管理（scenes.ts）

```typescript
// config/scenes.ts
export interface SceneConfig {
  id: string;
  startFrame: number;
  endFrame: number;
  backgroundColor: string;
  enterAnimation: {
    type: 'fade' | 'slide-up' | 'spring';
    duration: number;
  };
  exitAnimation: {
    type: 'fade' | 'slide-down';
    duration: number;
    startFrame: number;  // 相对场景开始
  };
  audio?: {
    fadeIn: number;
    fadeOut: number;
    volume: number;
  };
}

export const SCENES: Record<string, SceneConfig> = {
  SCENE_1: {
    id: 'opening',
    startFrame: 0,
    endFrame: 150,
    backgroundColor: '#0a0e27',
    enterAnimation: { type: 'fade', duration: 20 },
    exitAnimation: { type: 'fade', duration: 20, startFrame: 130 },
    audio: { fadeIn: 10, fadeOut: 10, volume: 0.7 }
  },
  
  SCENE_2: {
    id: 'main',
    startFrame: 150,
    endFrame: 600,
    backgroundColor: '#1a1a2e',
    enterAnimation: { type: 'slide-up', duration: 30 },
    exitAnimation: { type: 'slide-down', duration: 30, startFrame: 420 },
    audio: { fadeIn: 5, fadeOut: 15, volume: 1.0 }
  },
  
  SCENE_3: {
    id: 'closing',
    startFrame: 600,
    endFrame: 900,
    backgroundColor: '#0f0f23',
    enterAnimation: { type: 'fade', duration: 20 },
    exitAnimation: { type: 'fade', duration: 30, startFrame: 270 },
    audio: { fadeIn: 0, fadeOut: 30, volume: 0.5 }
  }
};
```

---

## 性能优化

### 1. 条件渲染策略

```typescript
// Root.tsx - 只渲染当前场景
export const Root = ({ frame }: { frame: number }) => {
  const scene = getScene(frame);
  const sceneFrame = getSceneFrame(frame);
  
  return (
    <div>
      {/* 条件渲染：只在相应时间段渲染场景 */}
      {scene === 'SCENE_1' && <Scene1 frame={sceneFrame} />}
      {scene === 'SCENE_2' && <Scene2 frame={sceneFrame} />}
      {scene === 'SCENE_3' && <Scene3 frame={sceneFrame} />}
    </div>
  );
};
```

### 2. 计算缓存优化

```typescript
// utils/animation.ts
import { useMemo } from 'react';

export const useAnimationValue = (frame: number, config: AnimConfig) => {
  return useMemo(() => {
    // 复杂计算只在依赖变化时重新执行
    return calculateAnimation(frame, config);
  }, [frame, config]);
};

// 组件中使用
export const AnimatedElement = ({ frame }: { frame: number }) => {
  const opacity = useAnimationValue(frame, {
    startFrame: 10,
    endFrame: 50,
    easing: 'easeInOutQuad'
  });
  
  return <div style={{ opacity }}>动画元素</div>;
};
```

### 3. 懒加载与动态导入

```typescript
// components/scenes/index.ts
import { lazy, Suspense } from 'react';

export const Scene1 = lazy(() => import('./Scene1_Opening'));
export const Scene2 = lazy(() => import('./Scene2_Main'));
export const Scene3 = lazy(() => import('./Scene3_Closing'));

// Root.tsx
export const Root = ({ frame }: { frame: number }) => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      {scene === 'SCENE_1' && <Scene1 frame={sceneFrame} />}
      {scene === 'SCENE_2' && <Scene2 frame={sceneFrame} />}
      {scene === 'SCENE_3' && <Scene3 frame={sceneFrame} />}
    </Suspense>
  );
};
```

### 4. 资源预加载

```typescript
// hooks/usePerformance.ts
export const usePreloadScene = (scene: string, frame: number) => {
  useEffect(() => {
    // 在进入场景前100帧开始预加载
    const nextScene = getNextScene(scene);
    if (shouldPreload(frame, scene)) {
      preloadResources(nextScene);
    }
  }, [scene, frame]);
};
```

---

## 时间轴管理

### 使用自定义Hook管理时间轴

```typescript
// hooks/useTimeline.ts
export const useTimeline = () => {
  return {
    getScene: (frame: number) => getScene(frame),
    getSceneFrame: (frame: number) => getSceneFrame(frame),
    isInRange: (frame: number, start: number, end: number) => 
      isInRange(frame, start, end),
    interpolate: (frame: number, range: [number, number], values: [number, number]) =>
      interpolate(frame, range, values),
  };
};

// 使用示例
export const Scene2 = ({ frame }: { frame: number }) => {
  const { isInRange, interpolate } = useTimeline();
  
  // 第一个交互 (200-250帧)
  const interaction1Progress = isInRange(frame, 200, 250)
    ? interpolate(frame, [200, 250], [0, 1])
    : frame >= 250 ? 1 : 0;
  
  // 第二个交互 (350-400帧)
  const interaction2Progress = isInRange(frame, 350, 400)
    ? interpolate(frame, [350, 400], [0, 1])
    : frame >= 400 ? 1 : 0;
  
  return (
    <div>
      <Interaction1 progress={interaction1Progress} />
      <Interaction2 progress={interaction2Progress} />
    </div>
  );
};
```

### 场景间的过渡管理

```typescript
// components/transitions/SceneTransition.tsx
export const SceneTransition = ({ 
  from: string,
  to: string,
  frame: number,
  startFrame: number,
  endFrame: number,
  type: 'fade' | 'slide' | 'zoom'
}) => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const styles = {
    fade: {
      opacity: 1 - progress,
    },
    slide: {
      transform: `translateY(${progress * 100}px)`,
      opacity: 1 - progress,
    },
    zoom: {
      transform: `scale(${1 + progress * 0.1})`,
      opacity: 1 - progress,
    }
  };
  
  return (
    <div style={styles[type]}>
      {/* 从场景内容 */}
    </div>
  );
};
```

---

## 交互设计

### 多层动画同步

```typescript
// components/interactions/SyncedInteraction.tsx
export const SyncedInteraction = ({ frame }: { frame: number }) => {
  const timeline = TIMELINE.SCENE_2.events;
  
  return (
    <div>
      {/* 第一层：背景元素 */}
      <BackgroundLayer
        frame={frame}
        startFrame={timeline.interaction1}
        duration={50}
      />
      
      {/* 第二层：主体元素（延迟20帧） */}
      <MainLayer
        frame={frame}
        startFrame={timeline.interaction1 + 20}
        duration={50}
      />
      
      {/* 第三层：文字层（延迟40帧） */}
      <TextLayer
        frame={frame}
        startFrame={timeline.interaction1 + 40}
        duration={50}
      />
    </div>
  );
};
```

### 交互触发管理

```typescript
// config/interactions.ts
export interface InteractionTrigger {
  id: string;
  startFrame: number;
  endFrame: number;
  layers: InteractionLayer[];
}

export const INTERACTIONS: InteractionTrigger[] = [
  {
    id: 'interaction_1',
    startFrame: 200,
    endFrame: 250,
    layers: [
      { name: 'background', delay: 0, duration: 50 },
      { name: 'main', delay: 20, duration: 50 },
      { name: 'text', delay: 40, duration: 50 },
    ]
  },
  // ...
];

// hooks/useInteraction.ts
export const useInteraction = (frame: number, interactionId: string) => {
  const interaction = INTERACTIONS.find(i => i.id === interactionId);
  if (!interaction) return null;
  
  const isActive = frame >= interaction.startFrame && frame < interaction.endFrame;
  const progress = isActive 
    ? interpolate(frame, [interaction.startFrame, interaction.endFrame], [0, 1])
    : frame >= interaction.endFrame ? 1 : 0;
  
  return {
    isActive,
    progress,
    getLayers: () => interaction.layers,
    getLayerProgress: (layerName: string) => {
      const layer = interaction.layers.find(l => l.name === layerName);
      if (!layer) return 0;
      const layerStart = interaction.startFrame + layer.delay;
      const layerEnd = layerStart + layer.duration;
      return interpolate(frame, [layerStart, layerEnd], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  };
};
```

---

## 音乐同步

### 音乐节拍计算

```typescript
// utils/music-sync.ts
export class MusicSync {
  constructor(
    private bpm: number,
    private frameRate: number = 30
  ) {}
  
  // 每拍的帧数
  getFramesPerBeat() {
    return Math.round((60000 / this.bpm / 1000) * this.frameRate);
  }
  
  // 将帧号转换为拍号
  getBeatNumber(frame: number) {
    return Math.floor(frame / this.getFramesPerBeat());
  }
  
  // 获取拍上的帧号
  getFrameAtBeat(beat: number) {
    return beat * this.getFramesPerBeat();
  }
  
  // 获取当前拍的进度 (0-1)
  getBeatProgress(frame: number) {
    const framesPerBeat = this.getFramesPerBeat();
    return (frame % framesPerBeat) / framesPerBeat;
  }
  
  // 获取拍的类型
  getBeatType(beat: number) {
    if (beat % 4 === 0) return 'quarter';  // 强拍
    return 'beat';
  }
}

// 使用示例
const musicSync = new MusicSync(120, 30);  // 120 BPM, 30fps

export const Scene2 = ({ frame }: { frame: number }) => {
  const beatNumber = musicSync.getBeatNumber(frame);
  const beatProgress = musicSync.getBeatProgress(frame);
  const beatType = musicSync.getBeatType(beatNumber);
  
  return (
    <div>
      {/* 在每个强拍上触发动画 */}
      {beatType === 'quarter' && (
        <BeatIndicator progress={beatProgress} />
      )}
    </div>
  );
};
```

### 音乐与视觉对齐

```typescript
// components/MusicVisualizer.tsx
export const MusicVisualizer = ({ frame }: { frame: number }) => {
  const musicSync = new MusicSync(120, 30);
  const beatProgress = musicSync.getBeatProgress(frame);
  
  // 使用音乐进度驱动视觉动画
  const scale = 1 + beatProgress * 0.2;
  const rotation = beatProgress * 360;
  
  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transition: 'none',  // 关键：不使用transition，使用frame更新
      }}
    >
      🎵
    </div>
  );
};
```

---

## 调试与预览

### 分段预览配置

创建 `.env.local` 配置按段预览：

```bash
# 预览场景1 (0-150帧)
REACT_APP_PREVIEW_START=0
REACT_APP_PREVIEW_END=150

# 预览场景2 (150-600帧)
REACT_APP_PREVIEW_START=150
REACT_APP_PREVIEW_END=600

# 预览场景3 (600-900帧)
REACT_APP_PREVIEW_START=600
REACT_APP_PREVIEW_END=900
```

### 时间轴可视化工具

```typescript
// utils/timeline-visualizer.ts
export const createTimelineVisualizer = () => {
  console.table(
    Object.entries(TIMELINE).map(([scene, config]) => ({
      场景: scene,
      开始帧: config.start,
      结束帧: config.end,
      时长秒: (config.end - config.start) / 30,
    }))
  );
};

// 启用后打印时间轴表格
createTimelineVisualizer();
```

### 性能监控

```typescript
// hooks/usePerformanceMonitor.ts
export const usePerformanceMonitor = (frame: number) => {
  useEffect(() => {
    if (frame % 30 === 0) {  // 每秒打印一次
      const memoryUsage = performance.memory?.usedJSHeapSize || 0;
      console.log(`Frame: ${frame}, Memory: ${(memoryUsage / 1024 / 1024).toFixed(2)}MB`);
    }
  }, [frame]);
};
```

---

## 常见问题

### Q1: 如何处理长视频的渲染时间过长？

**A:** 应用以下优化：
1. 启用条件渲染（只渲染必要的场景）
2. 使用 `useMemo` 缓存复杂计算
3. 启用多线程渲染：`npm run build -- --concurrency 4`
4. 使用 H.265 编码替代 H.264

### Q2: 音乐与动画不同步怎么办？

**A:** 
1. 验证 BPM 是否正确
2. 使用 `MusicSync` 工具对齐关键帧
3. 检查音频淡入/淡出是否干扰了对齐
4. 在帧时间轴中手动调整触发点

### Q3: 如何快速调试时间轴问题？

**A:**
1. 使用 `TIMELINE` 配置集中管理所有关键帧
2. 在开发模式下启用 `usePerformanceMonitor`
3. 使用分段预览快速定位问题
4. 在浏览器开发者工具中实时调整帧号

### Q4: 多场景间的过渡效果卡顿？

**A:**
1. 检查过渡动画是否重叠了场景内容
2. 减少过渡动画的复杂度
3. 使用 GPU 加速：`will-change: transform`
4. 增加过渡时间以降低帧率压力

---

_基于 Remotion v4.0+ 的长视频最佳实践_  
_适用于 20 秒以上的复杂交互视频制作_
