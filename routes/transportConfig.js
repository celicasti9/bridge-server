var express = require('express');
var router = express.Router();

const TransporterConfig = require('../models/TransporterConfig')

router.get('/', async (req, res, next) => {
    try {
        
        let config = await TransporterConfig.find()
        let thisConfig = config[0]


    
        res.json(thisConfig)

    } catch(err) {
        console.log("error updating config", err)
        res.status(500).json({errorMessage: "error updating config", err})
    }
})

/* GET home page. */
router.put('/update', async (req, res, next) => {

    try {
        
        let config = await TransporterConfig.find()
        let thisConfig = config[0]

        console.log("this is the config", thisConfig)

        const { host, port, user, pass } = req.body

        thisConfig.host = host
        thisConfig.port = port
        thisConfig.user = user
        thisConfig.pass = pass
    
        let newConfig = await thisConfig.save()
    
        res.json(newConfig)
    } catch(err) {
        console.log("error updating config", err)
        res.status(500).json({errorMessage: "error updating config", err})
    }


})

module.exports = router;