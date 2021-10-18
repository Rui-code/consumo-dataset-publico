const express = require('express');
const app = express();
const router = require('./routes');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.set('port', port);
app.use(express.json());

app.use('/', router);
app.use('/dsk', router);

app.listen(app.get('port'), () => {
	
});

module.exports = app;