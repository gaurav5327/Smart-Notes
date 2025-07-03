// File: backend/testPdf.js

import fs from 'fs';
import path from 'path';
import extractPdfText from './utils/extractPdfText.js';

const runTest = async () => {
    try {
        const pdfPath = path.resolve('sample.pdf'); // This file must exist in /backend/
        const buffer = fs.readFileSync(pdfPath);    // This gives real buffer
        const text = await extractPdfText(buffer);
        console.log('✅ Extracted Text:\n', text);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
};

runTest();
