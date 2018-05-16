const QRCode = require('qrcode');

const inputString = process.argv[2] || 'Have you tried forcing an unexpected reboot?';

const main = async () => {
  const url = await QRCode.toDataURL(inputString);
  console.log(url);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
