import fileConfig from '../config/fileConfig.js';

function getFileRange(lineNumber) {
    const from = parseInt(Math.trunc((lineNumber - 1) / fileConfig.linesPerFile)) * fileConfig.linesPerFile;
    const to = from + fileConfig.linesPerFile;

    return {from: from + 1, to};
}

function getSubdirectoryRange(lineNumber) {
    const lineRangePerDirectory = fileConfig.linesPerFile * fileConfig.filesPerDirectory;
    const from = parseInt(Math.trunc((lineNumber - 1) / lineRangePerDirectory)) * lineRangePerDirectory;
    const to = from + lineRangePerDirectory;

    return {from: from + 1, to};
}

export {
    getFileRange,
    getSubdirectoryRange
};