const express = require ('express');
const bodyParser = require('body-parser');
const util = require('./util/Util');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (res, req) => {
    util.log('info', 'root');
});

app.listen(port, () => {
    util.log('info', `Server running on port : ${port}` );
});





