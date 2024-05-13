var express = require('express');
var router = express.Router();

const mailSender = require("../mail")

router.post('/', mailSender.single("Email"), (req, res, next) => {
  
    if (!req.file) {
      next(new Error("No email sent!"));
      return;
    }
    console.log("this is an email", req.file)
    res.json({ email: req.file.path });
    
  })

module.exports = router;