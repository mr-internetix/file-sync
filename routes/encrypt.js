const router = require("express").Router();

const multer = require("multer");

const path = require("path");

const File = require("../models/file");

const { v4: uuid4 } = require("uuid");

const HummusRecipe = require("hummus-recipe");

// const pdfDoc = require("../models/encrpt");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 100000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  // store file

  upload(req, res, async (err) => {
    // console.log(req.file)
      console.log(req.body)
    //validate request
    if (!req.file) {
      return res.json({ error: "all fileds are required" });
    }

    if (err) {
      res.status(500).send({ error: err.message });
    }

    // store into database

    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    if(response){
        console.log(req.file.path);
        // file_path = path.resolve();
        const pdfDoc = new HummusRecipe(
          req.file.path,
          path.resolve('uploads',`op${req.file.filename}`)

        );
        await pdfDoc
          .encrypt({
            userPassword: req.body.password,
            ownerPassword: req.body.password,
            userProtectionFlag: 4,
          })
          .endPDF();
        
    }
    
    
    return res.download(path.resolve('uploads',`op${req.file.filename}`));
  });


});

module.exports = router;
