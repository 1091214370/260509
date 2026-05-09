import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { videoConfig } from './VideoConfig';
import {
  BackgroundAnimation,
  ParticleEffect,
  LineAnimation,
  GlowEffect,
  PulseAnimation,
  RotatingRing,
} from './AnimationEffects';

// 动画文字组件
interface AnimatedTextProps {
  text: string;
  fontSize: number;
  fontWeight?: number;
  color: string;
  delay?: number;
  animation?: 'spring' | 'fade' | 'slide-up';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize,
  fontWeight = 700,
  color,
  delay = 0,
  animation = 'spring',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visible = frame >= delay;
  if (!visible) return <span style={{ opacity: 0 }}>{text}</span>;

  const progress = frame - delay;

  let transform = '';
  let opacity = 1;

  if (animation === 'spring') {
    const scale = spring({
      frame: progress,
      fps,
      config: { damping: 200, stiffness: 200 },
    });
    transform = `scale(${scale})`;
  } else if (animation === 'fade') {
    opacity = interpolate(progress, [0, 10], [0, 1]);
  } else if (animation === 'slide-up') {
    const y = interpolate(progress, [0, 15], [30, 0]);
    const scale = spring({
      frame: progress,
      fps,
      config: { damping: 200, stiffness: 200 },
    });
    transform = `translateY(${y}px) scale(${scale})`;
  }

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        display: 'inline-block',
        transform,
        opacity,
      }}
    >
      {text}
    </span>
  );
};

// 标签组件
interface TagProps {
  text: string;
  delay?: number;
  color?: string;
  textColor?: string;
}

const Tag: React.FC<TagProps> = ({
  text,
  delay = 0,
  color = '#FF2D55',
  textColor = '#FFFFFF',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visible = frame >= delay;
  if (!visible) return null;

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, stiffness: 200 },
  });

  return (
    <span
      style={{
        backgroundColor: color,
        color: textColor,
        padding: '8px 20px',
        borderRadius: 8,
        fontSize: 28,
        fontWeight: 600,
        display: 'inline-block',
        transform: `scale(${scale})`,
      }}
    >
      #{text}
    </span>
  );
};

// 主视频模板组件
export const VideoTemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const config = videoConfig;

  // 计算动画时间点
  const titleEndFrame = config.title.length * 2; // 每字2帧
  const subtitleStartFrame = titleEndFrame + 15;
  const tagsStartFrame =
    subtitleStartFrame +
    (config.showSubtitle && config.subtitle
      ? config.subtitle.length * 2
      : 0) +
    15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: config.backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* 背景音乐 */}
      {config.enableAudio && (
        <Audio
          src={config.audioPath}
          volume={config.audioVolume}
        />
      )}

      {/* 背景装饰动画 */}
      <BackgroundAnimation
        type={config.backgroundAnimation as any}
        accentColor={config.accentColor}
        backgroundColor={config.backgroundColor}
      />

      {/* 旋转光环 */}
      {config.showRotatingRing && (
        <RotatingRing
          color={config.accentColor}
          size={config.rotatingRingSize}
          duration={120}
          startFrame={0}
        />
      )}

      {/* 脉冲效果 */}
      {config.showPulse && (
        <PulseAnimation
          color={config.accentColor}
          startFrame={config.pulseStartFrame}
          interval={50}
        />
      )}

      {/* 光晕效果 */}
      {config.showGlow && (
        <GlowEffect
          color={config.accentColor}
          intensity={config.glowIntensity}
          startFrame={0}
        />
      )}

      {/* 装饰线条 */}
      {config.showDecorationLine && (
        <LineAnimation
          color={config.accentColor}
          startFrame={config.decorationLineStartFrame}
          duration={30}
        />
      )}

      {/* 粒子效果 */}
      {config.particleCount > 0 && (
        <ParticleEffect
          count={config.particleCount}
          color={config.accentColor}
          startFrame={config.particleStartFrame}
        />
      )}

      {/* 主标题 */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: config.showSubtitle && config.subtitle ? 30 : 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <AnimatedText
          text={config.title}
          fontSize={72}
          fontWeight={700}
          color={config.textColor}
          delay={10}
          animation={config.enterAnimation}
        />
      </div>

      {/* 副标题 */}
      {config.showSubtitle && config.subtitle && (
        <div
          style={{
            textAlign: 'center',
            marginBottom: config.showTags && config.tags.length > 0 ? 40 : 0,
            position: 'relative',
            zIndex: 10,
          }}
        >
          <AnimatedText
            text={config.subtitle}
            fontSize={36}
            fontWeight={400}
            color={config.textColor}
            delay={subtitleStartFrame}
            animation={config.enterAnimation}
          />
        </div>
      )}

      {/* 底部标签 */}
      {config.showTags && config.tags.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {config.tags.map((tag, index) => (
            <Tag
              key={tag}
              text={tag}
              delay={tagsStartFrame + index * 8}
              color={config.accentColor}
              textColor="#FFFFFF"
            />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

export default VideoTemplate;