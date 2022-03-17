import express from 'express'
import { MongoClient } from 'mongodb';
import { PORT, MONGO_URI } from './config/index.js';
import { getRecords } from './api/records.js'

const app = express();
app.use(express.json());
const port = PORT;
const client = new MongoClient(MONGO_URI);

client.connect()
    .then(() => {
        console.log('Connected to mongo server');
        const db = client.db();

        app.post('/records', getRecords(db));

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    })
    .catch((error) => {
        console.error(`Something went wrong`);
        process.exit(-1);
    });
