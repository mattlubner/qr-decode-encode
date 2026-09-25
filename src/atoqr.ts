import * as QRCode from 'qrcode';

/**
 * Encodes an ascii string into a data URL-embedded QR code.
 */
export const atoqr = async (
  ascii: string,
  output: 'dataUrl' | string = 'dataUrl',
): Promise<string | null> => {
  if (output === 'dataUrl') {
    return QRCode.toDataURL(ascii);
  }
  await QRCode.toFile(output, ascii);
  return null;
};
