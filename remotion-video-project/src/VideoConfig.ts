export type SceneBeat = {
  readonly id: string;
  readonly from: number;
  readonly duration: number;
  readonly headline: string;
  readonly caption: string;
  readonly camera: 'push' | 'orbit' | 'rise' | 'settle';
};

export type VideoConfig = {
  readonly title: string;
  readonly subtitle: string;
  readonly durationSeconds: number;
  readonly fps: number;
  readonly width: number;
  readonly height: number;
  readonly palette: {
    readonly background: string;
    readonly surface: string;
    readonly primary: string;
    readonly secondary: string;
    readonly accent: string;
    readonly text: string;
    readonly muted: string;
  };
  readonly three: {
    readonly objectCount: number;
    readonly orbitRadius: number;
    readonly objectScale: number;
    readonly particleCount: number;
    readonly cameraZ: number;
  };
  readonly beats: readonly SceneBeat[];
};

export const videoConfig: VideoConfig = {
  title: 'AI 3D Video',
  subtitle: 'A polished cinematic Remotion template',
  durationSeconds: 20,
  fps: 30,
  width: 1080,
  height: 1920,
  palette: {
    background: '#071013',
    surface: '#102A2C',
    primary: '#48E5C2',
    secondary: '#F8D66D',
    accent: '#FF6B6B',
    text: '#F7FBF8',
    muted: '#A7B8B2',
  },
  three: {
    objectCount: 9,
    orbitRadius: 3.2,
    objectScale: 0.72,
    particleCount: 90,
    cameraZ: 8.5,
  },
  beats: [
    {
      id: 'hook',
      from: 0,
      duration: 4,
      headline: 'Shape the idea',
      caption: 'Turn a rough request into a cinematic 3D concept.',
      camera: 'push',
    },
    {
      id: 'transform',
      from: 4,
      duration: 7,
      headline: 'Build the world',
      caption: 'Layer geometry, light, depth, and readable motion.',
      camera: 'orbit',
    },
    {
      id: 'climax',
      from: 11,
      duration: 6,
      headline: 'Make it memorable',
      caption: 'Use frame-driven timing for precise Remotion renders.',
      camera: 'rise',
    },
    {
      id: 'resolve',
      from: 17,
      duration: 3,
      headline: 'Render with polish',
      caption: 'A flexible 20-second template ready for user briefs.',
      camera: 'settle',
    },
  ],
};

export const durationInFrames = videoConfig.durationSeconds * videoConfig.fps;
