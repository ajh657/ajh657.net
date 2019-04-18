const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    var homePath = path.resolve(__dirname + '/../frontend/html/index.html')
    res.sendFile(homePath);
})

module.exports = router;