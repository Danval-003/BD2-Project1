import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.get('/:collection', async (req, res) => {
    let baseLimit = 30
    let interval = req.query.page ? req.query.page : 0
    try {
        let col = getCollection(req.params.collection)
        let filter = req.body ? req.body : {}
        const result = await col.find(filter).skip(interval*baseLimit).limit(baseLimit);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.get('/search/:collection', async (req, res) => {
    try {
        let col = getCollection(req.params.collection)
        const result = await col.aggregate([
            {$search: 
                {
                    index: "default",
                    text: {
                        query: req.query.q,
                        path: {wildcard: "*"}
                    }
                }
            },
            { $limit: 300 }
        ]);
        console.log(result.length);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

export default router