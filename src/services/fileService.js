import { getFileRange, getSubdirectoryRange } from './fileIndexService.js';
import fileConfig from '../config/fileConfig.js';
import fs from 'fs';

function getFullFilePathByLineNumber(lineNumber) {
    const filenameByLine = getFileByLineNumber(lineNumber);
    const subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);

    return `${fileConfig.indexedFileDirectory}/${subdirectoryByLine}/${filenameByLine}`;
}

function getFileByLineNumber(lineNumber) {
    const {from, to} = getFileRange(lineNumber);
    
    return `file_${from}_${to}.txt`;
}

function getSubdirectoryByLineNumber(lineNumber) {
    const {from, to} = getSubdirectoryRange(lineNumber);

    return `${from}_${to}`;
}

function createDirectory(directoryPath, removeIfExists) {
    if (removeIfExists) {
        fs.rmSync(directoryPath, {recursive: true, force: true});
    }

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}

export {
    getFullFilePathByLineNumber,
    getFileByLineNumber,
    getSubdirectoryByLineNumber,
    createDirectory
}