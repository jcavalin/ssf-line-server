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
        let filenameByLine = getFileByLineNumber(lineNumber);
        let subdirectoryByLine = getSubdirectoryByLineNumber(lineNumber);
    
        if (subdirectoryByLine != subdirectory) {
            subdirectory = subdirectoryByLine;
            createDirectory(`${fileConfig.indexedFileDirectory}/${subdirectory}`, false);
        }
    
        // let currentProcess = (lineNumber * 100 / totalLines);
        // //process.stdout.clearLine(0);
        // process.stdout.cursorTo(0);
        // process.stdout.write(currentProcess.toFixed(2) + '%');
        
        fs.appendFileSync(`${fileConfig.indexedFileDirectory}/${subdirectory}/${filenameByLine}`, line + '\n');
    
        lineNumber++;
    }
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
    preprocessFile
};