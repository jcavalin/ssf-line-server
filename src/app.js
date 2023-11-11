'use strict';

import express from 'express';
import {env} from 'node:process';

const app = express();

app.use(express.json());

app.get('/lines/:lineIndex', (req, res) => {
    res.send('GET ' + req.params.lineIndex);
});

const PORT = env.APP_PORT || 80;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});

export default app;