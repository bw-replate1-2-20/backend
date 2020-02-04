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
});

router.get('/all', (req, res) => {
  Requests.find()
    .then(requests => {
      res.json(requests);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get delivery requests.'});
    });
});

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
});

router.post('/', (req, res) => {
  let requestData = req.body;

  // TODO: Add error checking. Add time stamps

  Requests.add(requestData)
    .then(request => {
      res.status(201).json(request);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new request' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const requestData = req.body;

  // TODO: handle password changes
  
  Requests.update(id, body)
    .then(request => {
      res.status(200).json(request);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: `Delivery request update error: ${err}`})
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Requests.remove(id)
    .then(request => {
      res.status(200).json(request);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: `Delivery request could not be deleted: ${err}`})
    });
  // TODO: what to return?
});


module.exports = router;