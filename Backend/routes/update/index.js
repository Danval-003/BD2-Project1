import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.put('/:collection', async (req, res) => {
    try {
        if(!req.body || req.body.length < 2 ) throw new Error('Invalid body (must include non-empty JSON)')

        let documents = req.body
        let col = getCollection(req.params.collection)

        if(
            Object.keys(documents[0]).length < 1 || Object.keys(documents[1]).length < 1
        ) throw new Error('Only non-destructive updates allowed.')

        const result = await col.findOneAndUpdate(documents[0], documents[1]);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err });
    }
})



export default router