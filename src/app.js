'use strict';

import express from 'express';
import { getLineContent } from './services/readFileService.js';
import process from 'process';
import { env } from 'node:process';

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

const PORT = env.APP_PORT || 80;
app.listen(PORT, () => {
    console.log(`${process.pid}: Running on ${PORT}`);
});