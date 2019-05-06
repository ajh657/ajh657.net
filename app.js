const express = require('express');
const bodyParser = require('body-parser');
const subdomain = require('express-subdomain');
const fileUpload = require('express-fileupload');

const app = express();
const port = 80;

app.use(fileUpload({
    limit: 50 * 1024 * 1024
}));
app.use(bodyParser.json());
app.use(subdomain('file', require('./routers/file')));
app.use(subdomain('game', require('./routers/game')));
app.use(subdomain('git', require('./routers/git')));
app.use(subdomain('api', require('./routers/api')));

app.use('/', require('./routers/frontend'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));