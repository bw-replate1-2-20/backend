const router = require('express').Router();
const Requests = require('./request-model.js');

router.get('/', (req, res) => { // TODO: Filter by logged-in user
  Requests.find()
    .then(requests => {
      res.json(requests);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get delivery requests.'});
    });
})

router.get('/all', (req, res) => {
  Requests.find()
    .then(requests => {
      res.json(requests);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get delivery requests.'});
    });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Requests.findById(id)
    .then(request => {
      res.json(request);
    })
    .catch(err => {
      console.log(`Error getting delivery request #${id}: ${err}`);
      res.status(500).json({ message: 'Failed to get delivery request' });
    });
})

module.exports = router;