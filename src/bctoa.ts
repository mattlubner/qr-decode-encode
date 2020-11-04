import javascriptBarcodeReader from 'javascript-barcode-reader';
import Jimp from 'jimp';

export enum BARCODE_DECODERS {
  'code-128' = 'code-128',
  'code-2of5' = 'code-2of5',
  'code-39' = 'code-39',
  'code-93' = 'code-93',
  'ean-13' = 'ean-13',
  'ean-8' = 'ean-8',
  'codabar' = 'codabar',
}

export const barcodeFormats = Object.values(BARCODE_DECODERS);

/**
 * Decodes a buffer containing a QR code into an ascii string.
 */
export const bctoa = async (
  buffer: Buffer,
  format?: BARCODE_DECODERS,
  reportFormat = false,
): Promise<string> => {
  const image = await Jimp.read(buffer);
  let code;
  for (const barcode of format ? [format] : barcodeFormats) {
    code = await javascriptBarcodeReader({
      barcode,
      image: {
        data: new Uint8ClampedArray(image.bitmap.data),
        width: image.bitmap.width,
        height: image.bitmap.height,
      },
    });
    if (code) {
      if (reportFormat) {
        process.stdout.write(`barcode="${barcode}"\n`);
      }
      break;
    }
  }
  if (!code) {
    return Promise.reject(new Error(`Failed to parse barcode as "${format}"`));
  }
  return code;
};
