import { getFileRange } from './fileIndexService.js';
import { getFullFilePathByLineNumber } from './fileService.js';
import nReadlines from 'n-readlines';

function getLineContent(lineNumber) {
    lineNumber = parseInt(lineNumber);
    const filePath = getFullFilePathByLineNumber(lineNumber);
    const {from} = getFileRange(lineNumber);
    
    let liner;
    try {
        liner = new nReadlines(filePath);
    } catch (e) {
        return null;
    }
    
    let found = false;
    let lineContent;
    let currentLine = from;
    while (lineContent = liner.next()) {
        if (lineNumber != currentLine) {
            currentLine++;
        }
        
        lineContent = lineContent.toString();
        found = true;
        break;
    }

    if (!found) {
        return null;
    }

    return lineContent;
}

function countLines(filePath) {
    let liner;
    try {
        liner = new nReadlines(filePath);
    } catch (e) {
        return null;
    }
    
    let lineNumber = 0;
    while (liner.next()) {
        lineNumber++;
    }

    return lineNumber;
}

export {
    getLineContent,
    countLines
}