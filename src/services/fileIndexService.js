import fileConfig from "../config/fileConfig.js";

function getFileRange(lineNumber) {
    let from = parseInt(Math.trunc((lineNumber - 1) / fileConfig.linesPerFile)) * fileConfig.linesPerFile;
    let to = from + fileConfig.linesPerFile;

    return {from: from + 1, to};
}

function getSubdirectoryRange(lineNumber) {
    let lineRangePerDirectory = fileConfig.linesPerFile * fileConfig.filesPerDirectory;
    let from = parseInt(Math.trunc((lineNumber - 1) / lineRangePerDirectory)) * lineRangePerDirectory;
    let to = from + lineRangePerDirectory;

    return {from: from + 1, to};
}

export {
    getFileRange,
    getSubdirectoryRange
};