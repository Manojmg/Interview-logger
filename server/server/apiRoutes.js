const express = require('express');

const candidateRoutes = require('./candidates/candidatesRoutes');

const apiRouter = express.Router();

module.exports = () =>
    apiRouter
        .use('/candidate', candidateRoutes())