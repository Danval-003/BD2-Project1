import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { getCollection } from '../../utils/collections.js';

const router = express.Router()

const uploads = multer({ dest: 'uploads/' });

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

router.post('/bulkWrite/:collection', uploads.single('file'), async (req, res) => {

    let bulkInstructions = [];

    try {
        if (!req.file) throw new Error('No file uploaded');
        
        console.log(req.file.path)
        const fileContent = fs.readFileSync(req.file.path, 'utf8');
        const documents = JSON.parse(fileContent);

        if (!documents || !Array.isArray(documents) || documents.length === 0) {
            throw new Error('No valid documents found in the file');
        }

        documents.forEach((doc) => {
            bulkInstructions.push({ insertOne: { document: doc } });
        });

        let col = getCollection(req.params.collection);
        const result = await col.bulkWrite(bulkInstructions);
        
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
});


export default router