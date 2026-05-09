import { Composition } from 'remotion';
import { TikTokCaption } from './TikTokCaption';
import { VideoTemplate } from './VideoTemplate';
import { videoConfig } from './VideoConfig';

// 计算帧数：duration(秒) * 30fps
const calculateFrames = (seconds: number) => seconds * 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* TikTok 字幕动画风格 */}
      <Composition
        id="TikTokCaption"
        component={TikTokCaption}
        durationInFrames={calculateFrames(5)}
        fps={30}
        width={videoConfig.width}
        height={videoConfig.height}
      />

      {/* 通用视频模板 */}
      <Composition
        id="VideoTemplate"
        component={VideoTemplate}
        durationInFrames={calculateFrames(videoConfig.duration)}
        fps={30}
        width={videoConfig.width}
        height={videoConfig.height}
      />
    </>
  );
};