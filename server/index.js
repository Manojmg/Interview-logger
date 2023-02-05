require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./server/apiRoutes');

const app = express();
const port = 4000
app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes());

app.listen(port, () => {
    console.log(`Server is up and and running in port ${port}`);
});