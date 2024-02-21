import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.post('/:collection', async (req, res) => {
    let baseLimit = 1000
    let interval = req.query.page ? req.query.page : 0
    try {
        console.log(req.body)
        let col = getCollection(req.params.collection)
        const users = await col.find().skip(interval*baseLimit).limit(baseLimit);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})



export default router