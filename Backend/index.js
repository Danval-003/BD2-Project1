import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { GridFSBucket } from "mongodb";

import read from "./routes/read/index.js";
import create from "./routes/create/index.js";
import premade from "./routes/premades/index.js";
import del from "./routes/delete/index.js";
import update from "./routes/update/index.js";
import { PORT, URI } from "./config.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/read/", read);
app.use("/create/", create);
app.use("/delete", del);
app.use("/update/", update);
app.use("/premade/", premade);

mongoose.connect(URI)
  .then(() => {
    console.log("Connected to DB");
    const connection = mongoose.connection;
    const gfs = new GridFSBucket(connection.db, { bucketName: "uploads" });

    const storage = new GridFsStorage({
      url: URI,
      file: (req, file) => {
        return {
          filename: req.body.fileName ? req.body.fileName : file.originalname,
          bucketName: "uploads"
        };
      }
    });
    const upload = multer({ storage });

    app.post("/upload", upload.single("image"), (req, res) => {
        res.status(200).json({ message: "File uploaded succesfully" })
    });

    app.get("/image/:filename", async (req, res) => {
        const filename = req.params.filename;
      
        try {
            const file = await gfs.find({ filename });

            if (!file) {
                return res.status(404).json({ error: "File not found" });
            }

            const readStream = gfs.openDownloadStreamByName(filename);
            readStream.pipe(res);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
        
    });

    app.delete("/image/delete/:filename", async (req, res) => {
        const filename = req.params.filename;

        try {
            const file = await gfs.find({ filename }).toArray();

            if (!file || file.length === 0) {
                return res.status(404).json({ error: "File not found" });
            }

            await gfs.delete(file[0]._id);

            res.json({ message: "File deleted successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

export default app;
