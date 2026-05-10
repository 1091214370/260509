# 交互设计模式库

> Remotion 长视频中常用的交互效果模式与实现示例

## 模式索引

1. [文字逐段显示](#文字逐段显示)
2. [计数器动画](#计数器动画)
3. [进度条效果](#进度条效果)
4. [分层同步动画](#分层同步动画)
5. [音乐节拍同步](#音乐节拍同步)
6. [场景过渡效果](#场景过渡效果)

---

## AI 执行清单（交互模式）

- 最小输入：所需交互类型（如 `counter`、`typewriter`）、场景起止帧、目标数值或文本
- 期望输出：对应组件骨架（`components/interactions/*.tsx`）、示例调用片段
- 执行步骤：1) 确认帧范围与值；2) 生成最小组件代码；3) 返回示例 props 与使用说明


## 文字逐段显示

### 模式 1: 单字逐出现

```typescript
// components/interactions/CharacterReveal.tsx
import React, { useMemo } from 'react';
import { interpolate } from 'remotion';

interface CharacterRevealProps {
  text: string;
  frame: number;
  startFrame: number;
  staggerDelay?: number;  // 每个字的延迟帧数
  fontSize?: number;
  color?: string;
}

export const CharacterReveal: React.FC<CharacterRevealProps> = ({
  text,
  frame,
  startFrame,
  staggerDelay = 5,
  fontSize = 48,
  color = '#FFFFFF'
}) => {
  const relativeFrame = frame - startFrame;
  
  return (
    <div>
      {text.split('').map((char, index) => {
        const charStartFrame = index * staggerDelay;
        const charEndFrame = charStartFrame + staggerDelay;
        
        // 计算该字符的透明度
        const opacity = interpolate(
          relativeFrame,
          [charStartFrame, charEndFrame],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        // 计算该字符的垂直位置 (从下往上出现)
        const yPos = interpolate(
          relativeFrame,
          [charStartFrame, charEndFrame],
          [20, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              fontSize,
              color,
              opacity,
              transform: `translateY(${yPos}px)`,
              marginRight: '0.1em',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
```

### 模式 2: 词逐出现

```typescript
// components/interactions/WordReveal.tsx
export const WordReveal: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  staggerDelay?: number;
}> = ({ text, frame, startFrame, staggerDelay = 15 }) => {
  const words = text.split(' ');
  const relativeFrame = frame - startFrame;
  
  return (
    <div>
      {words.map((word, index) => {
        const wordStartFrame = index * staggerDelay;
        const wordEndFrame = wordStartFrame + staggerDelay;
        
        const opacity = interpolate(
          relativeFrame,
          [wordStartFrame, wordEndFrame],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        const scale = interpolate(
          relativeFrame,
          [wordStartFrame, wordEndFrame],
          [0.8, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              marginRight: '0.3em',
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
```

### 模式 3: 打字机效果

```typescript
// components/interactions/TypewriterEffect.tsx
export const TypewriterEffect: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  charsPerFrame?: number;
}> = ({ text, frame, startFrame, charsPerFrame = 0.5 }) => {
  const relativeFrame = Math.max(0, frame - startFrame);
  const visibleChars = Math.floor(relativeFrame * charsPerFrame);
  const displayText = text.substring(0, visibleChars);
  
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 32 }}>
      {displayText}
      {visibleChars < text.length && <span style={{ opacity: 0.5 }}>|</span>}
    </div>
  );
};
```

---

## 计数器动画

### 模式 1: 数字上升计数

```typescript
// components/interactions/Counter.tsx
interface CounterProps {
  from: number;
  to: number;
  frame: number;
  startFrame: number;
  endFrame: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const Counter: React.FC<CounterProps> = ({
  from,
  to,
  frame,
  startFrame,
  endFrame,
  decimals = 0,
  prefix = '',
  suffix = ''
}) => {
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const current = from + (to - from) * progress;
  
  return (
    <div style={{ fontSize: 48, fontWeight: 'bold', color: '#00D9FF' }}>
      {prefix}{current.toFixed(decimals)}{suffix}
    </div>
  );
};
```

### 模式 2: 百分比进度

```typescript
// components/interactions/PercentageCounter.tsx
export const PercentageCounter: React.FC<{
  from: number;
  to: number;
  frame: number;
  startFrame: number;
  endFrame: number;
}> = ({ from, to, frame, startFrame, endFrame }) => {
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const current = Math.floor(from + (to - from) * progress);
  
  return (
    <div>
      <div style={{ fontSize: 64, fontWeight: 'bold' }}>{current}%</div>
      <div style={{
        width: 300,
        height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10
      }}>
        <div style={{
          width: `${current}%`,
          height: '100%',
          backgroundColor: '#00D9FF',
          transition: 'width 0.1s'
        }} />
      </div>
    </div>
  );
};
```

### 模式 3: 动画滚动数字

```typescript
// components/interactions/ScrollingNumber.tsx
export const ScrollingNumber: React.FC<{
  value: number;
  frame: number;
  startFrame: number;
  endFrame: number;
  height?: number;
}> = ({ value, frame, startFrame, endFrame, height = 50 }) => {
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const yOffset = -progress * height;
  
  return (
    <div style={{
      height,
      overflow: 'hidden',
      fontWeight: 'bold',
      fontSize: 48
    }}>
      <div style={{ transform: `translateY(${yOffset}px)` }}>
        <div>0</div>
        <div>{value}</div>
      </div>
    </div>
  );
};
```

---

## 进度条效果

### 模式 1: 线性进度条

```typescript
// components/interactions/ProgressBar.tsx
export const ProgressBar: React.FC<{
  frame: number;
  startFrame: number;
  endFrame: number;
  height?: number;
  color?: string;
}> = ({ frame, startFrame, endFrame, height = 6, color = '#00D9FF' }) => {
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <div style={{
      width: '100%',
      height,
      backgroundColor: '#333',
      borderRadius: height / 2,
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${progress * 100}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: height / 2
      }} />
    </div>
  );
};
```

### 模式 2: 圆形进度条

```typescript
// components/interactions/CircularProgress.tsx
export const CircularProgress: React.FC<{
  frame: number;
  startFrame: number;
  endFrame: number;
  radius?: number;
  strokeWidth?: number;
  color?: string;
}> = ({
  frame,
  startFrame,
  endFrame,
  radius = 50,
  strokeWidth = 4,
  color = '#00D9FF'
}) => {
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  
  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        fill="none"
        stroke="#333"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
    </svg>
  );
};
```

---

## 分层同步动画

### 模式 1: 多层叠加显示

```typescript
// components/interactions/LayeredReveal.tsx
interface LayerConfig {
  name: string;
  delay: number;
  duration: number;
  content: React.ReactNode;
  style?: React.CSSProperties;
}

export const LayeredReveal: React.FC<{
  frame: number;
  startFrame: number;
  layers: LayerConfig[];
}> = ({ frame, startFrame, layers }) => {
  return (
    <div>
      {layers.map((layer) => {
        const layerStartFrame = startFrame + layer.delay;
        const layerEndFrame = layerStartFrame + layer.duration;
        
        const opacity = interpolate(
          frame,
          [layerStartFrame, layerEndFrame],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        const scale = interpolate(
          frame,
          [layerStartFrame, layerEndFrame],
          [0.9, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        
        return (
          <div
            key={layer.name}
            style={{
              opacity,
              transform: `scale(${scale})`,
              ...layer.style
            }}
          >
            {layer.content}
          </div>
        );
      })}
    </div>
  );
};

// 使用示例
<LayeredReveal
  frame={frame}
  startFrame={100}
  layers={[
    {
      name: 'background',
      delay: 0,
      duration: 30,
      content: <div style={{ background: '#ccc', width: 300, height: 300 }} />,
    },
    {
      name: 'main',
      delay: 20,
      duration: 30,
      content: <div style={{ background: '#00D9FF', width: 200, height: 200 }} />,
    },
    {
      name: 'text',
      delay: 40,
      duration: 30,
      content: <div>Hello World</div>,
    },
  ]}
/>
```

---

## 音乐节拍同步

### 模式 1: 节拍闪光

```typescript
// components/interactions/BeatFlash.tsx
export const BeatFlash: React.FC<{
  frame: number;
  bpm: number;
  intensity?: number;
}> = ({ frame, bpm, intensity = 1 }) => {
  const frameRate = 30;
  const framesPerBeat = Math.round((60000 / bpm / 1000) * frameRate);
  const beatProgress = (frame % framesPerBeat) / framesPerBeat;
  
  // 节拍开始时闪白
  const brightness = beatProgress < 0.1
    ? interpolate(beatProgress, [0, 0.1], [1, 0]) * intensity
    : 0;
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: `rgba(255, 255, 255, ${brightness})`,
      pointerEvents: 'none'
    }} />
  );
};
```

### 模式 2: 节拍缩放

```typescript
// components/interactions/BeatScale.tsx
export const BeatScale: React.FC<{
  frame: number;
  bpm: number;
  children: React.ReactNode;
  maxScale?: number;
}> = ({ frame, bpm, children, maxScale = 1.1 }) => {
  const frameRate = 30;
  const framesPerBeat = Math.round((60000 / bpm / 1000) * frameRate);
  const beatProgress = (frame % framesPerBeat) / framesPerBeat;
  
  // 节拍开始时放大
  const scale = 1 + (1 - beatProgress) * (maxScale - 1) * 0.3;
  
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {children}
    </div>
  );
};
```

---

## 场景过渡效果

### 模式 1: 淡入淡出

```typescript
// components/transitions/FadeTransition.tsx
export const FadeTransition: React.FC<{
  frame: number;
  transitionStart: number;
  transitionEnd: number;
  children: React.ReactNode;
}> = ({ frame, transitionStart, transitionEnd, children }) => {
  const opacity = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <div style={{ opacity }}>
      {children}
    </div>
  );
};
```

### 模式 2: 滑动过渡

```typescript
// components/transitions/SlideTransition.tsx
export const SlideTransition: React.FC<{
  frame: number;
  transitionStart: number;
  transitionEnd: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
}> = ({
  frame,
  transitionStart,
  transitionEnd,
  direction = 'up',
  children
}) => {
  const progress = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const directionMap = {
    up: { x: 0, y: -progress * 100 },
    down: { x: 0, y: progress * 100 },
    left: { x: -progress * 100, y: 0 },
    right: { x: progress * 100, y: 0 },
  };
  
  const { x, y } = directionMap[direction];
  
  return (
    <div style={{ transform: `translate(${x}px, ${y}px)`, opacity: 1 - progress }}>
      {children}
    </div>
  );
};
```

### 模式 3: 旋转过渡

```typescript
// components/transitions/RotateTransition.tsx
export const RotateTransition: React.FC<{
  frame: number;
  transitionStart: number;
  transitionEnd: number;
  children: React.ReactNode;
}> = ({ frame, transitionStart, transitionEnd, children }) => {
  const progress = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const rotation = progress * 360;
  const opacity = 1 - progress;
  const scale = 1 - progress * 0.2;
  
  return (
    <div style={{
      transform: `rotate(${rotation}deg) scale(${scale})`,
      opacity,
      transformOrigin: 'center'
    }}>
      {children}
    </div>
  );
};
```

---

## 完整示例：30秒营销视频

```typescript
// 结合多个模式制作30秒视频
export const MarketingVideo = ({ frame }: { frame: number }) => {
  const timeline = {
    scene1: { start: 0, end: 150 },
    scene2: { start: 150, end: 600 },
    scene3: { start: 600, end: 900 },
  };
  
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* 场景1: 文字逐段显示 */}
      {frame < timeline.scene1.end && (
        <div style={{ padding: 50 }}>
          <CharacterReveal
            text="创意视频制作"
            frame={frame}
            startFrame={0}
            staggerDelay={5}
            fontSize={64}
          />
          <WordReveal
            text="使用 Remotion 快速制作"
            frame={frame}
            startFrame={80}
            staggerDelay={15}
          />
        </div>
      )}
      
      {/* 场景2: 计数器和进度条 */}
      {frame >= timeline.scene2.start && frame < timeline.scene2.end && (
        <div style={{ padding: 50 }}>
          <Counter
            from={0}
            to={10000}
            frame={frame}
            startFrame={timeline.scene2.start + 50}
            endFrame={timeline.scene2.start + 200}
            suffix=" 个视频"
          />
          <ProgressBar
            frame={frame}
            startFrame={timeline.scene2.start + 250}
            endFrame={timeline.scene2.start + 400}
            height={10}
          />
        </div>
      )}
      
      {/* 场景3: 收尾 */}
      {frame >= timeline.scene3.start && (
        <div style={{ padding: 50 }}>
          <div style={{ fontSize: 48, fontWeight: 'bold' }}>
            立即开始
          </div>
        </div>
      )}
    </div>
  );
};
```

---

_基于 Remotion 的交互设计模式库_  
_支持 20+ 秒复杂交互视频_
