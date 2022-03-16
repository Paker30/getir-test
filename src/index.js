import express from 'express'
import { MongoClient } from 'mongodb';
import { createValidator } from 'express-joi-validation';
import { PORT, MONGO_URI } from './config/index.js';
import { body } from './schemas.js'

const app = express();
app.use(express.json());
const port = PORT;
const client = new MongoClient(MONGO_URI);
const validator = createValidator({});

client.connect()
    .then(() => {
        console.log('Connected to mongo server');
        const db = client.db();

        app.post('/records', validator.body(body), (req, res) => {
            const { startDate, endDate, minCount, maxCount } = req.body;
            db.collection('records').find({
                createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) }
            })
            .project({
                key: 1,
                createdAt: 1,
                totalCount: { $sum: "$counts"}
            })
            .toArray()
                .then((data) => {
                    res.send({
                        code: 0,
                        msg: 'Success',
                        records: data.filter(({ totalCount}) => minCount <= totalCount && totalCount <= maxCount)
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                    res.send({
                        code: 1,
                        msg: error.message,
                        records: []
                    });
                })
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    })
    .catch((error) => {
        console.error(`Something went wrong`);
        process.exit(-1);
    });
