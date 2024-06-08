const express = require('express');

const routing = express.Router();
const users = require('../Controller/Users');

routing.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*"); // Origin, X-Requested-With, Content-Type,
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
}
);

routing.post('/addusers', users.addUser);
routing.get('/users', users.getAllUsers);  
routing.post('/login', users.login);

module.exports = routing;

