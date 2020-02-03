const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../routers/auth-router.js');
const businessRouter = require('../routers/business-router.js');
const volunteerRouter = require('../routers/volunteer-router.js');
const requestRouter = require('../routers/request-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/businesses', /* authenticate, */ businessRouter);
server.use('/api/volunteers', /* authenticate, */ volunteerRouter);
server.use('/api/requests', /* authenticate, */ requestRouter);

module.exports = server;