import sharp from 'sharp';

// Resize and convert image to appropriate format
export const convert = async (buffer: Buffer) => {
  return await sharp(buffer).resize(200).toFormat('webp').toBuffer();
};
