'use strict';

import cluster, {setupPrimary} from 'cluster';
import process from 'process';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { env } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKERS = env.CLUSTER_WORKERS || os.cpus().length;

console.log(`Primary ${process.pid} is running`);

setupPrimary({ exec: __dirname + '/app.js' });
for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died: code ${code} signal ${signal}`);
    cluster.fork();
});