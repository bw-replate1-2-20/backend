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
      console.log(request);
      if (request)
        res.json(request);
      else
        res.status(400).json({ message: "ID not found" });
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

  Requests.update(id, requestData)
    .then(request => {
      Requests.findById(id)
        .then(newItem => {
          console.log(newItem);
          res.status(200).json(newItem);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: `New delivery request retrieval error: ${err}`});
        });
      })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: `Delivery request update error: ${err}`})
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Requests.findById(id)
  // .then(newItem => {
  //   console.log(newItem);
  //   res.status(200).json(newItem);
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json({ message: `New delivery request retrieval error: ${err}`});
  // });

  Requests.remove(id)
    .then(request => {
      if (request)
        res.status(200).json({ message: `ID ${id} successfully deleted`});
      else
        res.status(400).json({ message: 'ID not found'});
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: `Delivery request could not be deleted: ${err}`})
    });
  // TODO: what to return?
});


module.exports = router;