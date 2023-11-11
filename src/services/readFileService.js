import { getFileRange } from "./fileIndexService.js";
import { getFileFullPathByLineNumber } from "./fileService.js";
import nReadlines from 'n-readlines';

function getLineContent(lineNumber) {
    const filePath = getFileFullPathByLineNumber(lineNumber);
    const {from} = getFileRange(lineNumber);
    
    let broadbandLines;
    try {
        broadbandLines = new nReadlines(filePath);
    } catch (e) {
        console.error(`Cannot read file ${filePath}`);
        return null;
    }
    
    let lineContet;
    let currentLine = from;
    while (lineContet = broadbandLines.next()) {
        if (parseInt(lineNumber) == currentLine) {
            break;
        }

        currentLine++;
    }

    return lineContet;
}

export {
    getLineContent
}