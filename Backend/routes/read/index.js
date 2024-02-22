import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.get('/:collection', async (req, res) => {
    let baseLimit = 1000
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

router.get('/global/:collection/:term', async (req, res) => {
    let baseLimit = 1000
    let interval = req.query.page ? req.query.page : 0
    let allFields = {"$or": []}
    try {
        let col = getCollection(req.params.collection)
        console.log(col.schema.obj)
        Object.keys(col.schema.obj).forEach((field) => {
            let fieldMatch = {}
            fieldMatch[field] = {"$regex": req.params.term}
            allFields["$or"].push(fieldMatch)
        })
        console.log(allFields)
        const result = await col.find(allFields).skip(interval*baseLimit).limit(baseLimit);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

export default router