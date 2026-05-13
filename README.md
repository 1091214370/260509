# Remotion 3D Video Skill

This repository is intentionally small. It contains a Codex skill and a clean Remotion project for producing polished, prompt-enhanced 3D videos with Three.js.

## What stays

- `SKILL.md`: the operating instructions for turning a user request into a better video brief, then into a rendered Remotion video.
- `scripts/update_remotion_skill.ps1`: helper for checking the upstream Remotion skill.
- `remotion-video-project/`: a working Remotion + Three.js template.

## Default Output

- Duration: about 20 seconds.
- Format: vertical 1080x1920 at 30 fps.
- Visual style: cinematic 3D built with Three.js via Remotion.
- Output file: `remotion-video-project/out/video.mp4`.
- Desktop copy: `~/Desktop/video.mp4` after `npm run build`.
- Audio: `npm run build` creates a local fallback WAV if no audio exists in `public/`.

## Commands

```powershell
cd remotion-video-project
npm install
npm run dev
npm run build
```

The template is configuration driven. Edit `remotion-video-project/src/VideoConfig.ts` to change the theme, copy, palette, motion profile, camera path, and scene beats.
