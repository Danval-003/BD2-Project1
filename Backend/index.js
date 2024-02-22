import express from "express"
import read from "./routes/read/index.js"
import create from "./routes/create/index.js"
import premade from "./routes/premades/index.js"
import { PORT, URI } from "./config.js"
import mongoose from "mongoose";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json());

app.use('/read/', read)
app.use('/create/', create)

app.use('/premade/', premade)

mongoose.connect(URI).then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})

export default app