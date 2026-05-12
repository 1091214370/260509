import {Composition} from 'remotion';
import {durationInFrames, videoConfig} from './VideoConfig';
import {VideoTemplate} from './VideoTemplate';

export const Root: React.FC = () => {
  return (
    <Composition
      id="VideoTemplate"
      component={VideoTemplate}
      durationInFrames={durationInFrames}
      fps={videoConfig.fps}
      width={videoConfig.width}
      height={videoConfig.height}
    />
  );
};
