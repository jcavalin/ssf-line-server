import cluster, {setupPrimary} from 'cluster';
import process from 'process';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getSubdirectoryRange } from './services/fileIndexService.js';
import fileConfig from './config/fileConfig.js';

const filePath = process.argv[2];

if (!filePath) {
    console.error('ERROR: The filepath is missing.');
    process.exit(1);
}

console.log('[PRIMARY] Started');
console.time('[PRIMARY] Running time');

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKERS = process.env.CLUSTER_WORKERS || os.cpus().length;

let finished = false;
let workersCreated = [];

const totalFileLines = 15793546;
const directoriesPerWorker = Math.ceil(totalFileLines / fileConfig.linesPerFile / fileConfig.filesPerDirectory / WORKERS);

let {from, to} = getSubdirectoryRange(1);
for (let i = 0; i < directoriesPerWorker; i++) {

}





// console.log(linesPerWorker, fileConfig.linesPerFile, fileConfig.filesPerDirectory);
// process.exit(0);

// const linesPerCluster = 100 * fileConfig.linesPerFile * fileConfig.filesPerDirectory;
// let from = 1;
// let to = linesPerCluster;

// const startWorker = (fromWorker, toWorker) => {
//     if (finished) {
//         console.log('[PRIMARY] Process finished, no more workers will be created');
//         return;
//     }

//     const workerLabel = `${fromWorker}_${toWorker}`;
//     if (workersCreated.includes(workerLabel)) {
//         console.log(`[PRIMARY] Worker ${workerLabel} already created`);
        
//         from += linesPerCluster;
//         to += linesPerCluster; 
//         startWorker(fromWorker, toWorker);
//         return;
//     }

//     console.log(`[PRIMARY] Starting new worker ${workerLabel}`);
//     setupPrimary({
//         exec: __dirname + '/processFile.js',
//         args: [filePath, fromWorker, toWorker]
//     });
//     cluster.fork();

//     from += linesPerCluster;
//     to += linesPerCluster; 
        
//     workersCreated.push(workerLabel);
// };

// for (let i = 0; i < WORKERS; i++) {
//     startWorker(from, to);
// }

// cluster.on('exit', (worker, code) => {
//     console.log(`[WORKER ${worker.process.spawnargs[3]}_${worker.process.spawnargs[4]}] died: code ${code}`);

//     if (code === 2 && !finished) {
//         startWorker(from, to);
//     } else {
//         finished = true;
//         console.log('[PRIMARY] Process finished');
//     }
// });

// console.timeEnd('[PRIMARY] Running time');

// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`[PRIMARY] The script uses approximately ${Math.round(used * 100) / 100} MB`);

process.exit(0);