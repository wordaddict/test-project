const express = require('express');

const router = require('./route/router');

const app = express();

app.use(router);
const port = 3005 || process.env.PORT;

app.get('/', (req, res) => {
    res.send('Welcome to this test application');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});