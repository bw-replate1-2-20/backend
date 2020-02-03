const router = require('express').Router();
const Volunteers = require('./volunteer-model.js');


router.get('/', (req, res) => {
  Volunteers.find()
    .then(volunteers => {
      res.json(volunteers);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get volunteers.'});
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Volunteers.findById(id)
    .then(volunteer => {
      res.json(volunteer);
    })
    .catch(err => {
      console.log(`Error getting volunteer #${id}: ${err}`);
      res.status(500).json({ message: 'Failed to get volunteer.' });
    });
});

module.exports = router;