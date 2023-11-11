'use strict';

import express from 'express';
import { env } from 'node:process';
import { getLineContent } from './services/readFileService.js';

const app = express();

app.get('/lines/:lineIndex(\\d+)', (req, res) => {
    const lineContet = getLineContent(req.params.lineIndex);

    if (!lineContet) {
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
    console.log(`Running on ${PORT}`);
});

export default app;