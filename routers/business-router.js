const router = require('express').Router();
const Businesses = require('./business-model.js');


router.get('/', (req, res) => {
  Businesses.find()
    .then(businesses => {
      res.json(businesses);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get businesses.'});
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Businesses.findById(id)
    .then(business => {
      res.json(business);
    })
    .catch(err => {
      console.log(`Error getting business #${id}: ${err}`);
      res.status(500).json({ message: 'Failed to get business.' });
    });
});

module.exports = router;