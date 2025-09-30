class FileSizeError extends Error {
    constructor(filePath, fileSize, maxSize) {
        super(`File size error: ${filePath} このファイルは ${fileSize} byteです。 最大許容サイズは ${maxSize} byteです`);
        this.name = 'FileSizeError';
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.maxSize = maxSize;
    }
}

let error = new FileSizeError('file/path', 1025, 1024);
console.log(error.message);
console.log(error.name); // FileSizeError
console.log(error.filePath); // file/path
console.log(error.fileSize); // 1025
console.log(error.maxSize); // 1024