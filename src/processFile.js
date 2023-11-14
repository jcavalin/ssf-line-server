import { preprocessFile } from './services/processFileService.js';

console.time('Running time');

const filePath = process.argv[2];
const fromLine = process.argv[3];
const toLine = process.argv[4];

const log = (log) => console.log(fromLine && toLine ? `[WORKER ${fromLine}_${toLine}] ${log}` : log);

if (!filePath) {
    log(`ERROR: The filepath is missing.`);
    process.exit(1);
}

log('Processing file', filePath);

const {lastLineNumber, hasNextLine} = preprocessFile(filePath, fromLine, toLine);

if (!lastLineNumber) {
    process.exit(1);
}

log('Finished!');
log(`${lastLineNumber} lines processed`);
log('Running time');

const used = process.memoryUsage().heapUsed / 1024 / 1024;
log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

process.exit(hasNextLine ? 2 : 1);