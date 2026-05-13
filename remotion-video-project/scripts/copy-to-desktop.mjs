import {copyFileSync, existsSync, mkdirSync} from 'node:fs';
import {basename, join} from 'node:path';
import {homedir} from 'node:os';

const source = join(process.cwd(), 'out', 'video.mp4');
const desktop = join(homedir(), 'Desktop');
const target = join(desktop, basename(source));

if (!existsSync(source)) {
  throw new Error(`Rendered video not found: ${source}`);
}

mkdirSync(desktop, {recursive: true});
copyFileSync(source, target);
console.log(`Copied rendered video to Desktop: ${target}`);
