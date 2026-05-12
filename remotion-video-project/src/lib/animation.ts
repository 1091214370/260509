import {Easing, interpolate} from 'remotion';

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const smoothProgress = (
  frame: number,
  startFrame: number,
  durationInFrames: number,
) => {
  return interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );
};

export const beatPulse = (frame: number, fps: number, bpm = 96) => {
  const framesPerBeat = Math.round((60 / bpm) * fps);
  const local = frame % framesPerBeat;
  return interpolate(local, [0, framesPerBeat * 0.28, framesPerBeat], [1, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
