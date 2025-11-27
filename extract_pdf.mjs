import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('Vijay Akash M - Resume.pdf');

try {
    const data = await pdf(dataBuffer);
    console.log(data.text);
} catch (error) {
    console.error('Error:', error);
    console.log('Exported:', pdf);
}
