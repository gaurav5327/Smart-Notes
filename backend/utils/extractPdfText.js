import pkg from 'pdfjs-dist/legacy/build/pdf.js';
import { fileURLToPath } from 'url';
import path from 'path';

const { getDocument } = pkg;

const standardFontsPath = path.resolve(
    './node_modules/pdfjs-dist/standard_fonts'
) + path.sep;

const extractPdfText = async (pdfBuffer) => {
    // ✅ Convert Buffer to Uint8Array (important!)
    const uint8Array = new Uint8Array(pdfBuffer);

    const loadingTask = getDocument({
        data: uint8Array,
        standardFontDataUrl: standardFontsPath,
        // ✅ Optional: Set standard fonts (not required for basic text extraction)
        // standardFontDataUrl: path.resolve('./node_modules/pdfjs-dist/standard_fonts/')
    });

    const pdf = await loadingTask.promise;
    let text = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        text += pageText + '\n\n';
    }

    return text;
};

export default extractPdfText;
