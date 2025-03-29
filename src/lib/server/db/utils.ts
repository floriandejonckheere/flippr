import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

import { hash } from '@node-rs/argon2';

import sharp from 'sharp';

export const convert = async (buffer: Buffer, size = 200) => {
  return await sharp(buffer)
    .resize(size)
    .toFormat('webp')
    .toBuffer();
};

export const upload = async (id: string, file: File) => {
  const modulePath = dirname(fileURLToPath(import.meta.url));

  const buffer = Buffer.from(await file.arrayBuffer());

  // Convert and write image to disk
  writeFileSync(
    resolve(modulePath, '../../../../public/uploads', `${id}.webp`),
    await convert(buffer, 200)
  );

  // Convert and write thumbnail to disk
  writeFileSync(
    resolve(modulePath, '../../../../public/uploads', `${id}-thumb.webp`),
    await convert(buffer, 50)
  );
};

export const passwordHash = async (password: string) => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
};
