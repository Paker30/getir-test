import { body } from '../schemas.js';

const getRecords = (db) => (req, res) => {
    const { error } = body.validate(req.body);
    if (error) {
        return res.send({
            code: 4,
            msg: error.message,
            records: []
        });
    }
    const { startDate, endDate, minCount, maxCount } = req.body;
    db.collection('records').find({
        createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) }
    })
        .project({
            key: 1,
            createdAt: 1,
            totalCount: { $sum: "$counts" }
        })
        .toArray()
        .then((data) => {
            res.send({
                code: 0,
                msg: 'Success',
                records: data.filter(({ totalCount }) => minCount <= totalCount && totalCount <= maxCount)
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
};

export {
    getRecords
};
