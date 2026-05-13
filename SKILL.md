# Remotion Three.js Video Skill

Use this skill when the user asks to make, generate, improve, or render a video.

## Mission

Turn rough user intent into a polished 20-second Remotion video powered by Three.js. Prefer rebuilding the video cleanly over carrying old template assumptions forward. The result should feel designed: cinematic camera motion, coherent typography, thoughtful color, layered lighting, and a clear narrative arc.

## Hard Defaults

- Duration: 20 seconds unless the user gives a different length. If they ask vaguely for a short video, stay near 20 seconds.
- Rendering stack: Remotion + React + TypeScript + `@remotion/three` + `@react-three/fiber` + Three.js.
- Visual baseline: every delivered video should contain real 3D elements, camera movement, lights, depth, and animated objects. Do not fall back to flat 2D title cards.
- Resolution: 1080x1920 vertical by default. Use 1920x1080 only when the user explicitly asks for landscape.
- Frame rate: 30 fps by default.
- Assets: keep local static files in `public/` and reference them with `staticFile()` when needed.
- Delivery: after rendering, copy the finished `.mp4` to the user's Desktop. Do not make the user manually find it in `out/`.
- Audio: every final video should have audio. If the user does not provide music, voiceover, or sound effects, create or source a suitable royalty-safe local audio bed yourself and include it before rendering.
- Animation: drive all movement from Remotion frames using `useCurrentFrame()`, `interpolate()`, `spring()`, and `Easing`. Do not rely on CSS transitions or CSS keyframes for rendered motion.

## Official Remotion Practices To Preserve

- New blank projects can be created with `npx create-video@latest --yes --blank --no-tailwind <name>`.
- Register compositions in `src/Root.tsx`.
- Use `Composition` metadata for `durationInFrames`, `fps`, `width`, and `height`.
- Use `Sequence` for timeline gating when scenes need delayed mounting.
- Use `ThreeCanvas` from `@remotion/three` for Three.js scenes.
- For GPU rendering, prefer Remotion commands with `--gl=angle` when available.
- Use still renders for quick checks, for example `npx remotion still VideoTemplate out/frame.png --frame=300 --scale=0.25`.

## Workflow

1. Understand the request.
   - Extract subject, audience, platform, copy, desired style, brand constraints, aspect ratio, and required assets.
   - If details are missing, make tasteful assumptions instead of blocking unless the missing detail is essential.

2. Beautify the prompt before coding.
   - Produce a concise creative brief in Chinese when the user writes Chinese.
   - Include: concept, mood, palette, 3D objects, lighting, camera language, scene beats, typography, and music direction.
   - If the user is waiting for a video, continue after the brief unless they explicitly asked to approve first.

3. Build from configuration.
   - Put the creative decisions in `remotion-video-project/src/VideoConfig.ts`.
   - Keep rendering components reusable and data driven.
   - Put user-provided audio in `remotion-video-project/public/`. If no audio exists, generate a local fallback track with the project script instead of rendering silently.
   - Use scene beats around this rhythm:
     - 0-4s: hook and establishing 3D reveal.
     - 4-11s: main object transformation or feature sequence.
     - 11-17s: climax with denser motion, particles, or orbiting elements.
     - 17-20s: resolved end frame with readable title or callout.

4. Render and verify.
   - Run type checking before rendering.
   - Render at least one still frame near the middle to catch blank Three.js output.
   - Render the final video when feasible.
   - Confirm that `remotion-video-project/out/video.mp4` exists and that a copy was placed on the Desktop.

## Prompt Beautification Pattern

Return a brief shaped like this, then implement it:

```text
Creative brief
Subject: ...
Visual idea: ...
3D stage: ...
Camera: ...
Palette: ...
Timeline: 0-4s ..., 4-11s ..., 11-17s ..., 17-20s ...
Text: ...
Audio direction: ...
Implementation notes: Remotion + ThreeCanvas, frame-driven motion, 20s, 1080x1920, audio included, final MP4 copied to Desktop.
```

## Quality Bar

- Text must remain readable on mobile.
- Camera motion should be smooth and intentional, not random.
- The 3D scene should have foreground, midground, and background depth.
- Use at least two light sources and visible material contrast.
- Avoid one-note palettes and generic purple-blue gradients.
- Use deterministic math and seeded layouts where possible so renders are stable.
- Keep generated videos flexible: the next request should usually require config edits, not a new engine.

## Repository Map

```text
remotion-video-project/
  src/
    Root.tsx
    VideoTemplate.tsx
    VideoConfig.ts
    components/
      ThreeStage.tsx
      HtmlOverlay.tsx
    lib/
      animation.ts
      palette.ts
```
