import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {useMemo} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Color} from 'three';
import {videoConfig} from '../VideoConfig';
import {beatPulse} from '../lib/animation';

const objectKinds = ['box', 'sphere', 'torus'] as const;

const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {camera} = useThree();
  const time = frame / fps;
  const cameraZ = interpolate(time, [0, 20], [videoConfig.three.cameraZ, 6.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraX = Math.sin(time * 0.42) * 1.1;
  const cameraY = interpolate(time, [0, 10, 20], [0.2, 1.35, 0.55]);

  camera.position.set(cameraX, cameraY, cameraZ);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  return null;
};

const HeroObject: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = beatPulse(frame, fps);
  const rotation = frame / 80;

  return (
    <group scale={pulse} rotation={[rotation * 0.5, rotation, rotation * 0.2]}>
      <mesh>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color={videoConfig.palette.primary}
          roughness={0.28}
          metalness={0.68}
          emissive={new Color(videoConfig.palette.primary)}
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh scale={1.38} rotation={[rotation * -0.8, rotation * 0.35, 0]}>
        <torusGeometry args={[1.18, 0.025, 18, 120]} />
        <meshStandardMaterial
          color={videoConfig.palette.secondary}
          roughness={0.2}
          metalness={0.9}
          emissive={new Color(videoConfig.palette.secondary)}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};

const OrbitingObjects: React.FC = () => {
  const frame = useCurrentFrame();
  const objects = useMemo(
    () =>
      Array.from({length: videoConfig.three.objectCount}, (_, index) => {
        const angle = (index / videoConfig.three.objectCount) * Math.PI * 2;
        return {
          angle,
          radius: videoConfig.three.orbitRadius + (index % 3) * 0.42,
          y: ((index % 5) - 2) * 0.46,
          kind: objectKinds[index % objectKinds.length],
        };
      }),
    [],
  );

  return (
    <group rotation={[0.2, frame / 140, 0]}>
      {objects.map((item, index) => {
        const orbit = item.angle + frame / (125 + index * 7);
        const x = Math.cos(orbit) * item.radius;
        const z = Math.sin(orbit) * item.radius;
        const scale = videoConfig.three.objectScale * (0.7 + (index % 4) * 0.12);
        const color =
          index % 3 === 0
            ? videoConfig.palette.accent
            : index % 3 === 1
              ? videoConfig.palette.secondary
              : videoConfig.palette.primary;

        return (
          <mesh
            key={`${item.kind}-${index}`}
            position={[x, item.y, z]}
            scale={scale}
            rotation={[frame / 70 + index, frame / 55, index * 0.4]}
          >
            {item.kind === 'box' ? <boxGeometry args={[1, 1, 1]} /> : null}
            {item.kind === 'sphere' ? <sphereGeometry args={[0.62, 32, 24]} /> : null}
            {item.kind === 'torus' ? <torusKnotGeometry args={[0.42, 0.16, 90, 12]} /> : null}
            <meshStandardMaterial
              color={color}
              roughness={0.34}
              metalness={0.56}
              emissive={new Color(color)}
              emissiveIntensity={0.08}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = useMemo(
    () =>
      Array.from({length: videoConfig.three.particleCount}, (_, index) => {
        const ring = index % 9;
        const angle = index * 2.399963;
        return {
          x: Math.cos(angle) * (2.5 + ring * 0.45),
          y: ((index % 17) - 8) * 0.24,
          z: Math.sin(angle) * (2.5 + ring * 0.45) - 1.5,
          size: 0.025 + (index % 4) * 0.012,
        };
      }),
    [],
  );

  return (
    <group rotation={[0, frame / 260, 0]}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[
            particle.x,
            particle.y + Math.sin(frame / 45 + index) * 0.08,
            particle.z,
          ]}
        >
          <sphereGeometry args={[particle.size, 10, 10]} />
          <meshBasicMaterial color={index % 2 === 0 ? videoConfig.palette.primary : videoConfig.palette.secondary} />
        </mesh>
      ))}
    </group>
  );
};

export const ThreeStage: React.FC = () => {
  return (
    <ThreeCanvas
      width={videoConfig.width}
      height={videoConfig.height}
      camera={{position: [0, 0.8, videoConfig.three.cameraZ], fov: 42}}
      gl={{antialias: true, alpha: true}}
    >
      <color attach="background" args={[videoConfig.palette.background]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 5]} intensity={1.9} color={videoConfig.palette.text} />
      <pointLight position={[-4, -1, 4]} intensity={2.2} color={videoConfig.palette.accent} />
      <pointLight position={[0, 3, -5]} intensity={1.4} color={videoConfig.palette.primary} />
      <CameraRig />
      <ParticleField />
      <HeroObject />
      <OrbitingObjects />
    </ThreeCanvas>
  );
};
