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
      if (volunteer)
        res.json(volunteer);
      else
        res.status(400).json({ message: "ID not found" });
    })
    .catch(err => {
      console.log(`Error getting volunteer #${id}: ${err}`);
      res.status(500).json({ message: 'Failed to get volunteer.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const volunteerData = req.body;

  // TODO: handle password changes

  Volunteers.update(id, volunteerData)
    .then(volunteer => {
      if (volunteer) {
        Volunteers.findById(id)
          .then(newItem => {
            res.status(200).json(newItem);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: `Failed to update database: ${err}`});
          });
      }
      else { res.status(400).json({ message: `Invalid volunteer ID ${id}`});
      }
    })
    .catch (error => {
      // console.log(error);
      res.status(500).json({ message: `Volunteer update error: ${error}`});
    });
    //   if (volunteer)
    //     res.status(200).json(volunteer)
    //   else
    //     res.status(400).json({ message: "ID not found" });
    // })
    // .catch (err => {
    //   // console.log(err);
    //   res.status(500).json({ message: `Delivery request update error: ${err}`})
    // });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  Volunteers.remove(id)
    .then(volunteer => {
      if(volunteer)
        res.status(200).json({ message: `ID ${id} successfully deleted`});
      else
        res.status(400).json({ message: "ID not found" });
    })
    .catch (err => {
      // console.log(err);
      res.status(500).json({ message: `Volunteer could not be deleted: ${err}`});
    });
});

module.exports = router;