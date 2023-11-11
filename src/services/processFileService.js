import { getSubdirectoryRange } from "./fileIndexService.js";
import { getSubdirectoryByLineNumber, createDirectory, getFileFullPathByLineNumber } from "./fileService.js";
import fileConfig from "../config/fileConfig.js";
import nReadlines from 'n-readlines';
import fs from 'fs';

function preprocessFile(filePath) {
    const broadbandLines = new nReadlines(filePath);
    createDirectory(fileConfig.indexedFileDirectory, true);

    let lineNumber = 1;
    let lineContent;
    let subdirectory;
    while (lineContent = broadbandLines.next()) {
        const subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);
        if (subdirectoryByLine != subdirectory) {
            subdirectory = subdirectoryByLine;
            createDirectory(`${fileConfig.indexedFileDirectory}/${subdirectory}`, false);
        }
        
        let fileFullPath = getFileFullPathByLineNumber(lineNumber);
        fs.appendFileSync(fileFullPath, lineContent + '\n');
        
        showProgress(lineNumber, fileFullPath);
        lineNumber++;
    }

    return lineNumber - 1;
}

function showProgress(lineNumber, fileFullPath, updateProgressEachLines = 10000) {
    if (lineNumber % updateProgressEachLines != 0) {
        return;
    }

    const {to} = getSubdirectoryRange(lineNumber);
    const progressNumber = Math.trunc((lineNumber * 100) / to);
    const progress = new Array(progressNumber + 1).join('#');

    process.stdout.cursorTo(0);
    process.stdout.write(`[${progress.padEnd(100, ' ')}] Processing file ${fileFullPath} `);
    
    if (to == lineNumber) {
        process.stdout.write('\n');
    }
}

export {
    preprocessFile
};