const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'Business router is functioning.'});
})

module.exports = router;