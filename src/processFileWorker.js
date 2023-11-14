import process from 'process';
import { preprocessFile } from './services/processFileService.js';

const filePath = process.argv[2];
const from = process.argv[3];
const to = process.argv[4];

const log = (log) => console.log(`[WORKER ${from}_${to}] ${log}`);

if (!filePath) {
    log('ERROR: The filepath is missing.');
    process.exit(1);
}

if (!from || !to) {
    log('ERROR: The range (from or to) is missing.');
    process.exit(1);
}

log('Started');
console.time(`[WORKER ${from}_${to}] Running time`);
    
log(`Processing file ${filePath}`);

const {lastLineNumber, hasNextLine} = preprocessFile(filePath, from, to);

log(`${lastLineNumber} lines processed`);
log('Finished');
console.timeEnd(`[WORKER ${from}_${to}] Running time`);

const used = process.memoryUsage().heapUsed / 1024 / 1024;
log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

process.exit(hasNextLine ? 0 : 2);