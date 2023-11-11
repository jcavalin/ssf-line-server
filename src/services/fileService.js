import { getFileRange, getSubdirectoryRange } from "./fileIndexService.js";
import fileConfig from "../config/fileConfig.js";
import fs from 'fs';

function getFileFullPathByLineNumber(lineNumber) {
    let filenameByLine = getFileByLineNumber(lineNumber);
    let subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);

    return `${fileConfig.indexedFileDirectory}/${subdirectoryByLine}/${filenameByLine}`;
}

function getFileByLineNumber(lineNumber) {
    let {from, to} = getFileRange(lineNumber);
    
    return `file_${from}_${to}.txt`;
}

function getSubdirectoryByLineNumber(lineNumber) {
    let {from, to} = getSubdirectoryRange(lineNumber);

    return `${from}_${to}`;
}

function createDirectory(directoryPath, removeIfExists) {
    if (removeIfExists) {
        fs.rmSync(directoryPath, {recursive: true, force: true});
    }

    if(!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}

export {
    getFileFullPathByLineNumber,
    getFileByLineNumber,
    getSubdirectoryByLineNumber,
    createDirectory
}