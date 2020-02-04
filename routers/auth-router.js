const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

const Volunteer = require('./volunteer-model.js');
const Business = require('./business-model.js');

router.get('/', (req, res) => {
  res.status(200).json({message: 'Auth router is functioning.'});
})


// =============== Registration ===============

// ------ Volunteer -------
router.post('/register/volunteer', (req, res) => {
  let user = req.body;

  if( !user.email ||
      !user.password ||
      !user.name ||
      !user.phone) {
        res.status(400).json({ message: "Missing required fields"});
  }

  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Volunteer.add(user)
  .then(saved => {
    const token = signToken(saved);
      res.status(201).json({
        id: saved.id,
        email: saved.email,
        name: saved.name,
        phone: saved.phone,
        token,
      });
  })
  .catch(error => {
      res.status(500).json(error);
  });
});

// ------- Business ---------
router.post('/register/business', (req, res) => {
  let user = req.body;

  if( !user.email ||
      !user.password ||
      !user.name ||
      !user.address ||
      !user.description ||
      !user.phone) {
      res.status(400).json({ message: "Missing required fields"});
}

  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Business.add(user)
  .then(saved => {
    const token = signToken(saved);
      res.status(201).json({
        id: saved.id,
        email: saved.email,
        name: saved.name,
        address: saved.address,
        description: saved.description,
        phone: saved.phone,
        token,
      });
  })
  .catch(error => {
      res.status(500).json(error);
  });
});

// ================ Login ==================
// ------ Volunteer -----
router.post('/login/volunteer', (req, res) => {
  // implement login
  let { email, password } = req.body;

  Volunteer.findBy({ email })
    .first()
    .then(user => {
      if( user && password &&
          bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({ 
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          token });
      }
      else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

// ------- Business -------
router.post('/login/business', (req, res) => {
  let { email, password } = req.body;

  Business.findBy({ email })
    .first()
    .then(user => {
      if( user && password &&
          bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          address: user.address,
          description: user.description,
          phone: user.phone,
          token });
      }
      else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

// ========== Helper functions ===========

function signToken(user) {
  const payload = {
    sub: user.id,
    email: user.email
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;