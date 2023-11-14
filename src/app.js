'use strict';

import express from 'express';
import { env } from 'node:process';
import { getLineContent } from './services/readFileService.js';
import cluster from 'cluster';
import process from 'process';
import os from "os";

const app = express();

// GET line route
app.get('/lines/:lineIndex(\\d+)', (req, res) => {
    const lineContet = getLineContent(req.params.lineIndex);

    if (lineContet === null) {
        res.status(413).send();
        return;
    }

    res.status(200)
        .setHeader('content-type', 'text/plain')
        .send(lineContet);
});

// catch 404
app.use(function(req, res, next) {
    res.status(404).send('Not Found');
    next();
});

// cluster init
const PORT = env.APP_PORT || 80;
const WORKERS = process.env.CLUSTER_WORKERS || os.cpus().length;
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < WORKERS; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died: code ${code} signal ${signal}`);
    });
} else {
    const serverApp = app.listen(PORT, () => {
        console.log(`${process.pid}: Running on ${PORT}`);
    });
}