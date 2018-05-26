const QRCode = require('qrcode');
const images = require('images');
const Jimp = require('jimp');

const LogoFileName = './assets/logo.png';
const QRCodeFileName = './qr.png';
const text = '1234567890';
const TextOutPutFileName = `./outputs/${text}.png`;
const OutputFileName = `./outputs/${text}-temp.png`;
const QRCodeWidth = 512;
const LogoHeight = 100;
const LogoLocation = (QRCodeWidth / 2) - (LogoHeight / 2);

QRCode.toFile(QRCodeFileName, text, {
    width: QRCodeWidth,
    errorCorrectionLevel: 'H',
}, (err) => {
    if (err) console.error(err.message, err);

    images(QRCodeFileName)
        .draw(images(LogoFileName), LogoLocation, LogoLocation)
        .save(OutputFileName, { quality: 100 });

    let loadedImage;
    Jimp.read(OutputFileName)
    .then((image) => {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    })
    .then(font => loadedImage.print(font, 10, QRCodeWidth - 42, text)
                   .write(TextOutPutFileName))
    .catch((err) => {
        console.error(err);
    });
});
