const express = require('express');
const bodyparser = require('body-parser');
const myReqLogger = require('./Utilities/requestLogger');
const route = require('./Routes/Routing'); // Updated import statement

const app = express();
app.use(bodyparser.json());
app.use(myReqLogger);
app.use('/', route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});