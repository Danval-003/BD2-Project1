import express from 'express'
import { getCollection } from '../../utils/collections.js'

const router = express.Router()

router.get('/bestStudents', async (req, res) => {
    try {
        let col = getCollection('students')
        const result = await col.aggregate([
            { $unwind: "$courses" },
            { $match: {"courses.year": 2023} },
            { $group: {_id: {student: "$fullName", grade: "$idGrade"}, mean: {$avg: "$courses.percentGrade"}} },
            { $sort: {"mean": -1} },
            { $limit: 10 }
        ]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/bestTeachers', async (req, res) => {
    try {
        let col = getCollection('teachers')
        const result = await col.aggregate([
            { $unwind: "$courses" },
            { $match: {"courses.year": 2023} },
            { $group: {_id: {teacher: "$fullName"}, mean: {$avg: "$courses.performance"}} },
            { $sort: {"mean": -1} },
            { $limit: 10 }
        ]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/bestGrades', async (req, res) => {
    try {
        let col = getCollection('teachers')
        const result = await col.aggregate([
            { $unwind: "$courses" },
            { $group: {_id: {Courses: "$courses.name", grade: "$courses.idGrade"}, mean: {$avg: "$courses.performance"}} },
            { $sort: {"mean": -1} },
            { $limit: 10 }
        ]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/bestStudents/limit', async (req, res) => {
    try {
        let col = getCollection('students');
        const result = await col.aggregate([
            { $unwind: "$courses" },
            { $match: {"courses.year": 2023} },
            { $group: {_id: {id:"$_id",student: "$fullName", admissionYear: '$admissionYear', gender:'$gender', gradeSection:'$gradeSection', idSchool: '$idSchool', idGrade: '$idGrade', eca: '$eca'}, mean: {$avg: "$courses.percentGrade"}} },
            { $sort: {"mean": -1} },
            { $limit: 5 },
            { $project: {'_id': 0, _id: "$_id.id", student: '$_id.student', gender:'$_id.gender', gradeSection:'$_id.gradeSection', idSchool: '$_id.idSchool', idGrade: '$_id.idGrade', eca: '$_id.eca', actualMean: {$round: ['$mean', 2]}} },
        ]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

export default router