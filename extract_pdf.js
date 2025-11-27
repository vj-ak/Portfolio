import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('Vijay Akash M - Resume.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
});
