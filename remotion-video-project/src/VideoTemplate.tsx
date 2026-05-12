import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {HtmlOverlay} from './components/HtmlOverlay';
import {ThreeStage} from './components/ThreeStage';
import {videoConfig} from './VideoConfig';
import {alpha} from './lib/palette';

export const VideoTemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const vignette = interpolate(frame, [0, 80, 520, 600], [0.55, 0.2, 0.18, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: videoConfig.palette.background}}>
      <ThreeStage />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, transparent 0%, ${alpha(
            videoConfig.palette.background,
            vignette,
          )} 72%, ${videoConfig.palette.background} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${alpha('#000000', 0.24)} 0%, transparent 38%, ${alpha(
            '#000000',
            0.44,
          )} 100%)`,
        }}
      />
      <HtmlOverlay />
    </AbsoluteFill>
  );
};
