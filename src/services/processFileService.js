import { getFileRange, getSubdirectoryRange } from "./fileIndexService.js";
import fileConfig from "../config/fileConfig.js";
import nReadlines from 'n-readlines';
import fs from 'fs';

function preprocessFile(filePath) {
    const broadbandLines = new nReadlines(filePath);
    createDirectory(fileConfig.indexedFileDirectory, true);

    let line;
    let lineNumber = 1;
    let subdirectory;

    while (line = broadbandLines.next()) {
        let subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);
        if (subdirectoryByLine != subdirectory) {
            subdirectory = subdirectoryByLine;
            createDirectory(`${fileConfig.indexedFileDirectory}/${subdirectory}`, false);
        }
        
        let fileFullPath = getFileFullPathByLineNumber(lineNumber);
        fs.appendFileSync(fileFullPath, line + '\n');
        
        showProgress(lineNumber, fileFullPath);
        lineNumber++;
    }

    return lineNumber - 1;
}

function getFileByLineNumber(lineNumber) {
    let {from, to} = getFileRange(lineNumber);
    
    return `file_${from}_${to}.txt`;
}

function getSubdirectoryByLineNumber(lineNumber) {
    let {from, to} = getSubdirectoryRange(lineNumber);

    return `${from}_${to}`;
}

function showProgress(lineNumber, fileFullPath, updateProgressEachLines = 10000) {
    if (lineNumber % updateProgressEachLines != 0) {
        return;
    }

    let {to} = getSubdirectoryRange(lineNumber);
    
    const progress = Math.trunc((lineNumber * 100) / to);
    const progressStr = new Array(progress + 1).join('#');

    process.stdout.cursorTo(0);
    process.stdout.write(`[${progressStr.padEnd(100, ' ')}] Processing file ${fileFullPath} `);
    
    if (to == lineNumber) {
        process.stdout.write('\n');
    }
}

function getFileFullPathByLineNumber(lineNumber) {
    let filenameByLine = getFileByLineNumber(lineNumber);
    let subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);

    return `${fileConfig.indexedFileDirectory}/${subdirectoryByLine}/${filenameByLine}`;
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
    preprocessFile
};