import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.delete('/:collection', async (req, res) => {
    try {
        if(!req.body) throw new Error('Invalid body.')
        let documents = req.body
        let col = getCollection(req.params.collection)
        const result = await col.deleteOne(documents);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})



export default router