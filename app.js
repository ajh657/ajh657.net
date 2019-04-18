const express = require('express');
const bodyParser = require('body-parser');
const subdomain = require('express-subdomain');

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(subdomain('git', require('./routers/git')));
app.use(subdomain('api', require('./routers/api')));

app.use('/', require('./routers/frontend'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));