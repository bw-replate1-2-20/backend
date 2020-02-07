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
      if(business)
        res.json(business);
      else
        res.status(400).json({ message: "ID not found" });
    })
    .catch(err => {
      console.log(`Error getting business #${id}: ${err}`);
      res.status(500).json({ message: 'Failed to get business.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const businessData = req.body;

  // TODO: handle password changes

  Businesses.update(id, businessData) // FIXME: IO Error
    .then(business => {
      if (business) {
        Businesses.findById(id)
          .then(newItem => {
            res.status(200).json(newItem);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: `Failed to update database: ${err}`});
          });
      }
      else { res.status(400).json({ message: `Invalid business ID ${id}`});
      }
    })
    .catch (error => {
      // console.log(error);
      res.status(500).json({ message: `Business update error: ${error}`});
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Businesses.remove(id)
    .then(business => {
      if (business)
        res.status(200).json({ message: `ID ${id} successfully deleted`});
      else
        res.status(400).json({ message: "ID not found" });
    })
    .catch (err => {
      // console.log(err);
      res.status(500).json({ message: `Business could not be deleted: ${err}`})
    });
});


module.exports = router;