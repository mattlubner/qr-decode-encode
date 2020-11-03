import Jimp from 'jimp';
import jsQR from 'jsqr';

/**
 * Decodes a buffer containing a QR code into an ascii string.
 */
export const qrtoa = async (buffer: Buffer): Promise<string> => {
  const image = await Jimp.read(buffer);
  const result = jsQR(
    new Uint8ClampedArray(image.bitmap.data),
    image.bitmap.width,
    image.bitmap.height,
  );
  if (!result) {
    return Promise.reject(new Error('Failed to parse qr_code'));
  }
  return result.data;
};
