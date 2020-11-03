import * as QRCode from 'qrcode';

/**
 * Encodes an ascii string into a data URL-embedded QR code.
 */
export const atoqr = async (ascii: string, output: 'dataUrl' | string = 'dataUrl'): Promise<string> => {
  if (output === 'dataUrl') {
    return QRCode.toDataURL(ascii);
  }
  return QRCode.toFile(output, ascii);
};
