import {jest} from '@jest/globals';
import waitForExpect from 'wait-for-expect';
import { getRecords } from '../../src/api/records.js';

describe('records endpoints', () => {
    const res = {
        send: jest.fn(),
    };

    const mockFind = jest.fn();
    const mockProject = jest.fn();
    const mockToArray = jest.fn();

    const mockDb = {
        collection: () => ({
            find: mockFind
        })
    };

    beforeEach(() => {
        res.send.mockReset();
        mockFind.mockReset();
        mockProject.mockReset();
        mockToArray.mockReset();
        mockFind.mockReturnValue({ project: mockProject});
        mockProject.mockReturnValue({ toArray: mockToArray});
    });

    it('error at fetching the records', async () => {
        mockToArray.mockRejectedValue(new Error('Something went wrong'));

        const req = {
                body: {
                'startDate': '2016-01-26',
                'endDate': '2018-02-02',
                'minCount': 2700,
                'maxCount': 3000
            }
        };
        
        getRecords(mockDb)(req,res);
        await waitForExpect(() => {
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({
                code: 1,
                msg: 'Something went wrong',
                records: []
            });
        });
    });

    describe('fetching', () => {
        it('there\'re no record for the query', async () => {
            mockToArray.mockResolvedValue([]);
    
            const req = {
                    body: {
                    'startDate': '1800-01-26',
                    'endDate': '1700-02-02',
                    'minCount': 2700,
                    'maxCount': 3000
                }
            };
            
            getRecords(mockDb)(req,res);
            await waitForExpect(() => {
                expect(res.send).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith({
                    code: 0,
                    msg: 'Success',
                    records: []
                });
            });
        });

        it('there\'re record for the query but do not feat the counter limits', async () => {
            mockToArray.mockResolvedValue([{ totalCount: Infinity }]);
    
            const req = {
                    body: {
                    'startDate': '2016-01-26',
                    'endDate': '2016-02-02',
                    'minCount': 1,
                    'maxCount': 2
                }
            };
            
            getRecords(mockDb)(req,res);
            await waitForExpect(() => {
                expect(res.send).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith({
                    code: 0,
                    msg: 'Success',
                    records: []
                });
            });
        });

        it('query return records', async () => {
            const request = { key: 1, createdAt: '2017-01-28T01:22:14.398Z', totalCount: 2 };
            mockToArray.mockResolvedValue([request]);
    
            const req = {
                    body: {
                    'startDate': '2016-01-26',
                    'endDate': '2016-02-02',
                    'minCount': 1,
                    'maxCount': 5
                }
            };
            
            getRecords(mockDb)(req,res);
            await waitForExpect(() => {
                expect(res.send).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith({
                    code: 0,
                    msg: 'Success',
                    records: [request]
                });
            });
        });
    });
});