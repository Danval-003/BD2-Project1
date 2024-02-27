import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.post('/:collection', async (req, res) => {
    try {
        if(!req.body) throw new Error('Can not insert empty documents');
        let documents = req.body;
        let col = getCollection(req.params.collection);
        const result = await col.insertMany(documents);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/bulkWrite/:collection', async (req, res) => {
    try {
        if(!req.body) throw new Error('Can not do bulk operations on empty documents');
        let documents = req.body;
        let col = getCollection(req.params.collection);
        const result = await col.bulkWrite(documents);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

export default router