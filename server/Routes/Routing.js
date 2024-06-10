const express = require('express');

const routing = express.Router();
const users = require('../Controller/Users');
const que = require('../Controller/Questions')
const exams = require('../Controller/Exams');

routing.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "http://localhost:3000"); // Origin, X-Requested-With, Content-Type,
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
}
);

routing.post('/addusers', users.addUser);
routing.get('/users', users.getAllUsers); 
routing.post('/login', users.login);
routing.get('/getQuestions',que.getAllQuestion)
routing.get('/exams', exams.getAllExams);
routing.get('/exams/:userid', exams.getExamByUserId);
routing.post('/exams', exams.createExam);



module.exports = routing;


