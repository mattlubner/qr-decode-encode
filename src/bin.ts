#!/usr/bin/env node
import yargs from 'yargs';
import { readFileSync } from 'fs';
import { normalize } from 'path';
import { atoqr, bctoa, qrtoa, barcodeFormats, BARCODE_DECODERS } from './';

const argv = yargs(process.argv.slice(2))
  .scriptName(require('../package.json').name) // eslint-disable-line @typescript-eslint/no-var-requires
  .usage('Usage: $0 <command> [options]')
  .command(
    'decode <qr_code> [options]',
    'Decode qr_code back into an ascii string',
    (_yargs) => {
      _yargs
        .positional('qr_code', {
          describe: 'A data url or a path to an image file',
          type: 'string',
        })
        .option('format', {
          describe: 'The format of the qrcode / barcode',
          choices: ['qrcode', 'barcode', ...barcodeFormats],
          default: 'qrcode',
        });
    },
  )
  .alias('qrtoa', 'decode')
  .command(
    'encode <ascii> [options]',
    'Encode an ascii string into a qr code',
    (_yargs) => {
      _yargs
        .positional('ascii', {
          describe: 'An ascii string',
        })
        .option('file', {
          describe: 'Path to save output to (as *.{png,svg,txt})',
          normalize: true,
          type: 'string',
        });
    },
  )
  .alias('atoqr', 'encode')
  .demandCommand(1, 'You must specify a command')
  .option('clean', {
    alias: 'c',
    describe: 'Omit the trailing newline',
    type: 'boolean',
  })
  .help('h')
  .alias('h', 'help').argv;

const [command] = argv._;

const main = async () => {
  switch (command) {
    case 'decode': {
      const dataUrlOrFile = argv.qr_code as string;
      const format = argv.format as 'qrcode' | 'barcode' | BARCODE_DECODERS;
      const [, content] =
        dataUrlOrFile.match(
          /^data:image\/(?:jpeg|png|bmp|tiff|gif);base64,(.+)$/,
        ) || [];
      const isDataUrl = !!content;
      const buffer = isDataUrl
        ? Buffer.from(content, 'base64')
        : readFileSync(normalize(dataUrlOrFile));
      if (format === 'qrcode') {
        const ascii = await qrtoa(buffer);
        process.stdout.write(ascii);
      } else {
        const reportFormat = !argv.clean && format === 'barcode';
        const ascii = await bctoa(
          buffer,
          format === 'barcode' ? undefined : format,
          reportFormat,
        );
        process.stdout.write(ascii);
      }
      break;
    }
    case 'encode': {
      const ascii = argv.ascii as string;
      const file = argv.file as string | undefined;
      const qrCode = await atoqr(ascii, file);
      process.stdout.write(qrCode);
      break;
    }
  }
  if (!argv.clean) {
    process.stdout.write('\n');
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
