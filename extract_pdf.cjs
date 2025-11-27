const fs = require('fs');
const pdfModule = require('pdf-parse');
const pdf = pdfModule.default || pdfModule;

const dataBuffer = fs.readFileSync('Vijay Akash M - Resume.pdf');

if (typeof pdf === 'function') {
    pdf(dataBuffer).then(function (data) {
        console.log(data.text);
    }).catch(err => console.error(err));
} else {
    console.log('Still not a function:', pdf);
}
