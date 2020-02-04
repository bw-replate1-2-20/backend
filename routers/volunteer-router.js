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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const requestData = req.body;
  Volunteers.update(id, body)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: `Delivery request update error: ${err}`})
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Volunteers.remove(id)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: `Delivery request could not be deleted: ${err}`});
    });
  // TODO: what to return?
});

module.exports = router;