import express from 'express'
import { Student } from '../../models/studentModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await Student.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

export default router