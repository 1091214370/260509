import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * 背景装饰动画组件
 * 提供背景视觉效果
 */
export const BackgroundAnimation: React.FC<{
  type: 'gradient' | 'shapes' | 'grid' | 'none';
  accentColor: string;
  backgroundColor: string;
}> = ({ type, accentColor, backgroundColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (type === 'none') return null;

  if (type === 'gradient') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${accentColor}20 100%)`,
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (type === 'shapes') {
    const rotation1 = (frame * 0.5) % 360;
    const rotation2 = (frame * -0.3) % 360;

    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* 旋转圆形 */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: `2px solid ${accentColor}`,
            opacity: 0.1,
            transform: `rotate(${rotation1}deg)`,
            pointerEvents: 'none',
          }}
        />
        {/* 旋转正方形 */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '300px',
            height: '300px',
            border: `2px solid ${accentColor}`,
            opacity: 0.1,
            transform: `rotate(${rotation2}deg)`,
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(0deg, ${accentColor}10 1px, transparent 1px), 
                           linear-gradient(90deg, ${accentColor}10 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />
    );
  }

  return null;
};

/**
 * 粒子效果组件
 * 创建浮动粒子动画
 */
export const ParticleEffect: React.FC<{
  count: number;
  color: string;
  startFrame?: number;
}> = ({ count, color, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const particles = Array.from({ length: count }, (_, i) => {
    const delay = (i * 3) % 30;
    const particleFrame = (frame - startFrame - delay + 300) % 120;
    const opacity = interpolate(particleFrame, [0, 30, 90, 120], [0, 1, 1, 0]);
    const y = interpolate(particleFrame, [0, 120], [100, -100]);
    const x = Math.sin((i * Math.PI * 2) / count) * 50;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color,
          top: '50%',
          left: '50%',
          transform: `translate(${x}px, ${y}px)`,
          opacity,
          pointerEvents: 'none',
        }}
      />
    );
  });

  return <div style={{ position: 'absolute', width: '100%', height: '100%' }}>{particles}</div>;
};

/**
 * 彩色线条动画
 * 从两侧向中心收缩
 */
export const LineAnimation: React.FC<{
  color: string;
  startFrame?: number;
  duration?: number;
}> = ({ color, startFrame = 0, duration = 30 }) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const progress = Math.min((frame - startFrame) / duration, 1);
  const leftWidth = interpolate(progress, [0, 1], [0, 200]);
  const rightWidth = interpolate(progress, [0, 1], [0, 200]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: `${leftWidth}px`,
          height: '3px',
          backgroundColor: color,
          borderRadius: '2px',
        }}
      />
      <div
        style={{
          width: `${rightWidth}px`,
          height: '3px',
          backgroundColor: color,
          borderRadius: '2px',
        }}
      />
    </div>
  );
};

/**
 * 光晕效果
 * 文字周围的发光效果
 */
export const GlowEffect: React.FC<{
  color: string;
  intensity: number;
  startFrame?: number;
}> = ({ color, intensity = 1, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const glow = (frame - startFrame) % 60;
  const opacity = interpolate(glow, [0, 30, 60], [0.3, 1, 0.3]) * intensity;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, '0')}, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />
  );
};

/**
 * 脉冲动画
 * 中心向外扩散的圆形脉冲
 */
export const PulseAnimation: React.FC<{
  color: string;
  startFrame?: number;
  interval?: number;
}> = ({ color, startFrame = 0, interval = 40 }) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const pulseFrame = (frame - startFrame) % interval;
  const scale = pulseFrame / interval;
  const opacity = 1 - scale;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: `2px solid ${color}`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

/**
 * 旋转光环
 * 围绕中心旋转的光环
 */
export const RotatingRing: React.FC<{
  color: string;
  size?: number;
  duration?: number;
  startFrame?: number;
}> = ({ color, size = 300, duration = 120, startFrame = 0 }) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  const rotation = ((frame - startFrame) / duration) * 360;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    />
  );
};
