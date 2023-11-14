import { preprocessFile } from './services/processFileService.js';

const filePath = process.argv[2];

console.time('Running time');

if (!filePath) {
    console.log(`ERROR: The filepath is missing.`);
    process.exit(1);
}

console.log(`Processing file ${filePath}`);

const lastLineNumber = preprocessFile(filePath);

if (!lastLineNumber) {
    process.exit(1);
}

console.log('Finished!');
console.log(`${lastLineNumber} lines processed`);
console.timeEnd('Running time');

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

process.exit(0);