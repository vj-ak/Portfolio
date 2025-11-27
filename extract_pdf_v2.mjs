import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'Vijay Akash M - Resume.pdf';
const dataBuffer = new Uint8Array(fs.readFileSync(pdfPath));

async function extractText() {
    try {
        const loadingTask = pdfjsLib.getDocument(dataBuffer);
        const doc = await loadingTask.promise;

        let fullText = '';

        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        fs.writeFileSync('resume_text.txt', fullText);
        console.log('Text saved to resume_text.txt');
    } catch (error) {
        console.error('Error extracting text:', error);
    }
}

extractText();
