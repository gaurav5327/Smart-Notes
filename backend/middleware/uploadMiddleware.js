import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload.single('pdf'); // form-data field should be named 'pdf'
