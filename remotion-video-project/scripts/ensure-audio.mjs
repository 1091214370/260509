import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const publicDir = join(process.cwd(), 'public');
const fallbackPath = join(publicDir, 'generated-audio.wav');

mkdirSync(publicDir, {recursive: true});

if (existsSync(fallbackPath)) {
  console.log('Fallback audio already available.');
  process.exit(0);
}

const sampleRate = 44100;
const durationSeconds = 24;
const totalSamples = sampleRate * durationSeconds;
const channels = 1;
const bitsPerSample = 16;
const dataSize = totalSamples * channels * (bitsPerSample / 8);
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * (bitsPerSample / 8), 28);
buffer.writeUInt16LE(channels * (bitsPerSample / 8), 32);
buffer.writeUInt16LE(bitsPerSample, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

const notes = [146.83, 185.0, 220.0, 277.18];

for (let sample = 0; sample < totalSamples; sample++) {
  const t = sample / sampleRate;
  const fadeIn = Math.min(t / 1.8, 1);
  const fadeOut = Math.min((durationSeconds - t) / 2.2, 1);
  const envelope = Math.max(0, Math.min(fadeIn, fadeOut));
  const chord = notes.reduce((sum, frequency, index) => {
    const drift = Math.sin(t * 0.18 + index) * 0.7;
    return sum + Math.sin(2 * Math.PI * (frequency + drift) * t) * (0.14 / notes.length);
  }, 0);
  const shimmer = Math.sin(2 * Math.PI * 880 * t) * 0.018 * (0.5 + Math.sin(t * 1.7) * 0.5);
  const value = Math.max(-1, Math.min(1, (chord + shimmer) * envelope));
  buffer.writeInt16LE(Math.round(value * 32767), 44 + sample * 2);
}

writeFileSync(fallbackPath, buffer);
console.log(`Generated fallback audio: ${fallbackPath}`);
