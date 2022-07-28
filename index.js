const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const UPLOADS_FOLDER = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("_") + "_" + Date.now();
    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, //1MB this is optional
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname == "avatar") {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpj" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        // cb(null, false); or
        cb(new Error("Only jpj, png, jpeg, format allowed!"));
      }
    } else if (file.fieldname == "doc") {
      if (file.mimetype == "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only pdf format allowed!"));
      }
    } else {
      cb(new Error("There was an unknown Error!"));
    }
  },
});

app.post("/", upload.single("avatar"), (req, res) => {
  res.send("tui ekta gappa kaisos");
});

app.post("/1", upload.array("avatar", 2), (req, res) => {
  res.send("hello world 1");
});
app.post(
  "/2",
  upload.fields([
    { name: "avatar", maxCount: 2 },
    { name: "doc", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("hello world 2");
  }
);

app.get("/", (req, res) => {
  res.send("tui ekta gappa kaisos");
});

app.use((req, res, next) => {
  next("requested url was not found!");
});

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("there was an upload error!");
    } else {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  } else {
    res.status(500).send("there was an error!");
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
