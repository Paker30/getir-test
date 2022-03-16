

import express from 'express'
import { MongoClient } from 'mongodb';
import { PORT, MONGO_URI } from './config/index.js';

const app = express();
const port = PORT;
const client = new MongoClient(MONGO_URI);

client.connect()
    .then(() => {
        console.log('Connected to mongo server');
        const db = client.db();

        app.post('/records', (req, res) => {
            res.send('hello');
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    })
    .catch(() => {
        console.error(`Something went wrong`);
        process.exit(-1);
    });
