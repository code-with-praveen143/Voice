const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({ storage });

module.exports = upload;
