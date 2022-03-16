import Joi from 'joi';
import JoiDate from '@joi/date';

const ExtendedJoi = Joi.extend(JoiDate);

const body = ExtendedJoi.object({
    startDate: ExtendedJoi.date().format('YYYY-MM-DD').required().description('request from'),
    endDate: ExtendedJoi.date().format('YYYY-MM-DD').required().description('request until'),
    minCount: ExtendedJoi.number().required(),
    maxCount: ExtendedJoi.number().required()
});

export{
    body
};
