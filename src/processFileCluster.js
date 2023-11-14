import cluster, {setupPrimary} from 'cluster';
import process from 'process';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getSubdirectoryRange } from './services/fileIndexService.js';
import fileConfig from './config/fileConfig.js';
import { countLines } from './services/readFileService.js';

const filePath = process.argv[2];
const log = (log) => console.log(`[PRIMARY] ${log}`);

if (!filePath) {
    log('ERROR: The filepath is missing.');
    process.exit(1);
}

log('[PRIMARY] Started');
console.time('[PRIMARY] Running time');

const __dirname = dirname(fileURLToPath(import.meta.url));
const workers = process.env.CLUSTER_WORKERS || os.cpus().length;

log(`[PRIMARY] Getting the number of lines...`);
const totalFileLines = countLines(filePath);
if (!filePath) {
    log('ERROR: Cannot get the line number');
    process.exit(1);
}
log(`[PRIMARY] ${totalFileLines} lines to process`);

log(`[PRIMARY] Starting ${workers} workers`);
const directoriesPerWorker = Math.ceil(totalFileLines / fileConfig.linesPerFile / fileConfig.filesPerDirectory / WORKERS);
let from = 1;
let to = 1;
for (let i = 0; i < workers; i++) {
    ({from} = getSubdirectoryRange(to + 1));
    ({to} = getSubdirectoryRange((to * directoriesPerWorker) + 1));

    setupPrimary({
        exec: __dirname + '/processFile.js',
        args: [filePath, from, to]
    });
    cluster.fork();
}

cluster.on('exit', (worker, code) => {
    console.log(`[WORKER ${worker.process.spawnargs[3]}_${worker.process.spawnargs[4]}] died: code ${code}`);
});

console.timeEnd('[PRIMARY] Running time');

const used = process.memoryUsage().heapUsed / 1024 / 1024;
log(`[PRIMARY] The script uses approximately ${Math.round(used * 100) / 100} MB`);