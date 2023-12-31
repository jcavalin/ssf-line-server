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
    
    let lineContent;
    let currentLine = from;
    while (lineContent = liner.next()) {
        if (lineNumber == currentLine) {
            return lineContent.toString();
        }
        
        currentLine++;
    }

    return null;
}

export {
    getLineContent
}