const express = require('express');
var router = express.router();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

module.exports = router;