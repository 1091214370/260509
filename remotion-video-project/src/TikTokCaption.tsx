import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// TikTok 风格的动态字幕组件
// 特点：文字逐字出现，底部有关键词高亮标签
export const TikTokCaption: React.FC<{
  text?: string;
  captionColor?: string;
  backgroundColor?: string;
  tags?: string[];
  accentColor?: string;
}> = ({
  text = '这个地方真的太棒了！强烈推荐大家来看看～',
  captionColor = '#FFFFFF',
  backgroundColor = '#000000',
  tags = ['必去', '推荐', '打卡'],
  accentColor = '#FF2D55',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 文字逐字出现动画
  const words = text.split('');

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 60,
      }}
    >
      {/* 底部字幕区域 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* 字幕文字 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'Arial, sans-serif',
            color: captionColor,
            lineHeight: 1.4,
          }}
        >
          {words.map((word, index) => {
            // 逐字淡入动画
            const wordVisible = frame >= index * 2; // 每2帧显示一个字
            const scale = wordVisible
              ? spring({
                  frame: frame - index * 2,
                  fps,
                  config: { damping: 200, stiffness: 200 },
                })
              : 0;
            const opacity = wordVisible
              ? interpolate(frame - index * 2, [0, 10], [0, 1])
              : 0;

            return (
              <span
                key={index}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  display: 'inline-block',
                }}
              >
                {word === ' ' ? '\u00A0' : word}
              </span>
            );
          })}
        </div>

        {/* 高亮关键词效果 */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {tags.map((tag, index) => {
            const tagVisible = frame >= words.length * 2 + index * 10;
            const tagScale = tagVisible
              ? spring({
                  frame: frame - words.length * 2 - index * 10,
                  fps,
                  config: { damping: 200, stiffness: 200 },
                })
              : 0;

            return (
              <span
                key={tag}
                style={{
                  transform: `scale(${tagScale})`,
                  opacity: tagScale,
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  padding: '8px 20px',
                  borderRadius: 8,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TikTokCaption;