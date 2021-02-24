const express = require('express');
require('./db_connection/mongodb');
const userRouter = require('./routers/user')
const CountriesRouter =require('./routers/countries')
const authenticationMiddleware = require('./middlewares/authentication');
const logsMiddleware = require('./middlewares/logs');
const errorHandlerMiddleware = require('./middlewares/errorhandler');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use( '/api/users',logsMiddleware,userRouter);
app.use( '/api/Countries',logsMiddleware,CountriesRouter);
app.use(errorHandlerMiddleware)


app.listen(process.env.PORT || 3000, () => {
    console.info(`server listening on port 3000`);
}); 