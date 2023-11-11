#!/usr/bin/env node

import { preprocessFile } from './services/processFileService.js';

console.time('Running time');

const filePath = process.argv[2];
console.log('Processing file', filePath);

const lastLineNumber = preprocessFile(filePath);

process.stdout.write('\n');
console.log('Finished!');
console.log(`${lastLineNumber} lines processed`);
console.timeEnd('Running time');

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);