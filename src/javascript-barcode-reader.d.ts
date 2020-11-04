declare module 'javascript-barcode-reader' {
  /// <reference path="../node_modules/javascript-barcode-reader/dist/types/src/index.d.ts" />
  export default function javascriptBarcodeReader({
    image,
    barcode,
    barcodeType,
    options,
  }: JavascriptBarcodeReader): Promise<string>;
}
