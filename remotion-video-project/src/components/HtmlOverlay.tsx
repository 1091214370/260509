import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {videoConfig} from '../VideoConfig';
import {alpha} from '../lib/palette';

const activeBeat = (timeInSeconds: number) => {
  return (
    videoConfig.beats.find(
      (beat) => timeInSeconds >= beat.from && timeInSeconds < beat.from + beat.duration,
    ) ?? videoConfig.beats[videoConfig.beats.length - 1]
  );
};

export const HtmlOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const beat = activeBeat(seconds);
  const localFrame = frame - beat.from * fps;
  const enter = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(localFrame, [beat.duration * fps - 18, beat.duration * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(enter, exit);
  const y = interpolate(opacity, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'space-between',
        padding: '96px 76px 112px',
        color: videoConfig.palette.text,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 24,
          letterSpacing: 0,
          color: videoConfig.palette.muted,
        }}
      >
        <span>{videoConfig.title}</span>
        <span>{Math.ceil(videoConfig.durationSeconds - seconds)}s</span>
      </div>

      <div
        style={{
          maxWidth: 820,
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            width: 96,
            height: 5,
            marginBottom: 30,
            background: `linear-gradient(90deg, ${videoConfig.palette.primary}, ${videoConfig.palette.secondary}, ${videoConfig.palette.accent})`,
            boxShadow: `0 0 30px ${alpha(videoConfig.palette.primary, 0.48)}`,
          }}
        />
        <h1
          style={{
            margin: 0,
            fontSize: 88,
            lineHeight: 0.95,
            letterSpacing: 0,
            fontWeight: 800,
            textWrap: 'balance',
            textShadow: `0 12px 44px ${alpha('#000000', 0.45)}`,
          }}
        >
          {beat.headline}
        </h1>
        <p
          style={{
            margin: '28px 0 0',
            maxWidth: 690,
            fontSize: 34,
            lineHeight: 1.22,
            letterSpacing: 0,
            color: videoConfig.palette.muted,
            textShadow: `0 8px 32px ${alpha('#000000', 0.55)}`,
          }}
        >
          {beat.caption}
        </p>
      </div>
    </AbsoluteFill>
  );
};
