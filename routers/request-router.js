const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'Request router is functioning.'});
})

module.exports = router;