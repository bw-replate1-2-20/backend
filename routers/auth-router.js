const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'Auth router is functioning.'});
})

module.exports = router;