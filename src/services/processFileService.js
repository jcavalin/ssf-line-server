import { getSubdirectoryRange } from "./fileIndexService.js";
import { getSubdirectoryByLineNumber, createDirectory, getFullFilePathByLineNumber } from "./fileService.js";
import fileConfig from "../config/fileConfig.js";
import nReadlines from "n-readlines";
import fs from "fs";

function preprocessFile(filePath) {
    let liner;

    try {
        liner = new nReadlines(filePath);
    } catch (e) {
        console.error(`ERROR: Cannot read file ${filePath}`);
        return null;
    }

    createDirectory(fileConfig.indexedFileDirectory, true);

    let lineNumber = 1;
    let lineContent;
    let subdirectory;
    while (lineContent = liner.next()) {
        const subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);
        if (subdirectoryByLine != subdirectory) {
            subdirectory = subdirectoryByLine;
            createDirectory(`${fileConfig.indexedFileDirectory}/${subdirectory}`, false);
        }
        
        let fileFullPath = getFullFilePathByLineNumber(lineNumber);
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

    const {from, to} = getSubdirectoryRange(lineNumber);
    const progressNumber = Math.trunc(((lineNumber - from) * 100) / (to - from));
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