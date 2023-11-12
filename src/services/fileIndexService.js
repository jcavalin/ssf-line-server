import fileConfig from '../config/fileConfig.js';

function getFileRange(lineNumber) {
    const from = parseInt(Math.trunc((lineNumber - 1) / fileConfig.linesPerFile)) * fileConfig.linesPerFile + 1;
    const to = from + fileConfig.linesPerFile;

    return {from, to};
}

function getSubdirectoryRange(lineNumber) {
    const lineRangePerDirectory = fileConfig.linesPerFile * fileConfig.filesPerDirectory;
    const from = parseInt(Math.trunc((lineNumber - 1) / lineRangePerDirectory)) * lineRangePerDirectory + 1;
    const to = from + lineRangePerDirectory;

    return {from, to};
}

export {
    getFileRange,
    getSubdirectoryRange
};