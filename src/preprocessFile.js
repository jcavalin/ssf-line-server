#!/usr/bin/env node

import { preprocessFile } from './services/processFileService.js';

console.time('Running time');

let filePath = process.argv[2];
console.log('Processing file', filePath);

preprocessFile(filePath);

console.log('Finished!');
console.timeEnd('Running time');

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);