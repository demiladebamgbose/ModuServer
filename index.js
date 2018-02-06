const express = require ('express');
const bodyParser = require('body-parser');
const util = require('./server/util/Util');
const morgan = require ('morgan');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(('dev')));

app.get('/', (req, res) => {
    util.log('info', 'root');
    res.json({
        message: 'root route'
    });
});

app.listen(port, () => {
    util.log('info', `Server running on port : ${port}` );
});





