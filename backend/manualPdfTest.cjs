const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js'); // ✅ must be legacy path

async function extractPdfText(buffer) {
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }

    return fullText.trim();
}

(async () => {
    try {
        const filePath = path.resolve(__dirname, 'sample.pdf');
        const buffer = fs.readFileSync(filePath);
        const text = await extractPdfText(buffer);
        console.log('\n✅ Extracted PDF Text:\n');
        console.log(text);
    } catch (err) {
        console.error('❌ Failed to extract PDF:', err.message);
    }
})();
