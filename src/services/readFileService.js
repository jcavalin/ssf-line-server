import { getFileRange } from "./fileIndexService.js";
import { getFullFilePathByLineNumber } from "./fileService.js";
import nReadlines from 'n-readlines';

function getLineContent(lineNumber) {
    const filePath = getFullFilePathByLineNumber(lineNumber);
    const {from} = getFileRange(lineNumber);
    
    let broadbandLines;
    try {
        broadbandLines = new nReadlines(filePath);
    } catch (e) {
        return null;
    }
    
    let found = false;
    let lineContet;
    let currentLine = from;
    while (lineContet = broadbandLines.next()) {
        if (parseInt(lineNumber) == currentLine) {
            lineContet = lineContet.toString();
            found = true;
            break;
        }

        currentLine++;
    }

    if (!found) {
        return null;
    }

    return lineContet;
}

export {
    getLineContent
}