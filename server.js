const express = require('express');
const app = express();

const api = require('./src/api');

const PORT = process.env.PORT || 4000;

app.use( express.json() );

app.use( '/api', api );

app.listen( PORT, () => console.log(`Server listening at port ${PORT}`) );
