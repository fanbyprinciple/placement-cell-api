// importing models
const Student = require('../models/student.js');
const Company = require('../models/company.js');

const route = require('express').Router();

//Use of logger winton timestamp
const winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});
logger.level = 'debug';
logger.info('Initialised');
logger.debug('with logger');



// To show all the students registered 
route.get('/students', (req, res) => {
    Student.find({}, function (err, students) {
        logger.info("successfully displayed students"); 
        //logging
        res.send(students);
    }).catch((err) => {
        res.status(500).send("Error retrieving students")
        // error handling
    });
});

//To register a student at the portal
route.post('/addStudent', (req, res) => {
    var student = new Student();
    student.name = req.body.name;
    student.department = req.body.department;
    student.sid = req.body.sid;
    student.percentage = req.body.percentage;
    student.save(function (err, student) {
        if (err) res.status(500).send("Error adding students");
        // error handling
        logger.info("successfully added students"); 
        //logging
        res.send(student);
    });
});

//To edit a student details at the portal
route.post('/editStudent/:id', (req, res) => {
    Student.findOne({
        sid: req.params.id
    }, function (err, student) {
        if (err) return err;
        student.name = req.body.name;
        student.department = req.body.department;
        student.sid = req.body.sid;
        student.percentage = req.body.percentage;
        student.save(function (err, student) {
            if (err) res.status(500).send("Error editing students");
            // error handling
            logger.info("successfull in editing"); 
            //logging
            res.send(student);
        });

    });
});


// give the sid as the params value (i.e in place of :id) to remove a student
// this is done because its more intuitive
route.delete('/removeStudent/:id', (req, res) => {
    Student.remove({
        sid: req.params.id
    }, function (err) {
        if (err) return err;
        // error handling
        logger.info("successfull in removing students"); 
            //logging
        res.send();
    });
});

// returns all the registered companies
route.get('/companys', (req, res) => {
    Company.find({}, function (err, companys) {
        logger.info("successfull in displaying company"); 
            //logging
        res.send(companys);
    }).catch((err) => {
        res.status(500).send("Error retrieving companies")
        // error handling
    });
});

// for registering a new company 
route.post('/registerCompany', (req, res) => {
    var company = new Company();

    company.cname = req.body.cname;
    company.cid = req.body.cid;


    company.save(function (err, company) {
        if (err) return err;
        // error handling
        logger.info("successfull in registrating company"); 
            //logging
        res.send(company);
    });
});

// give the cid as the params value (i.e in place of :id) to unregister a company
// this is done because its more intuitive
route.delete('/unregisterCompany/:id', (req, res) => {
    Company.remove({
        cid: req.params.id
    }, function (err) {
        if (err) return err;
        // error handling
        logger.info("successfully unregistered"); 
            //logging
        res.send();
    }).catch((err) => {
        res.send(err);
    });;
});

// Registering a student with a company
//:id represents cid of the company the student wants to be registered in
// the students sid needs to be provided in the body as req.body.sid
// in short : this will register a student with given req.body.sid with a company cid given in params (:id)
route.post('/registerStudent/:id', (req, res) => {
    Company.findOne({
        cid: req.params.id
    }, function (err, company) {
        if (err) return err;
        company.regsid.push(req.body.sid);
        company.save(function (err, company) {
            if (err) return err;
            // error handling
            res.send(company);
        });

    });

});

// Unregistering a student with a company
//:id represents cid of the company the student wants to be unregistered from
// the students sid needs to be provided in the body as req.body.sid
// in short : this will unregister a student with given req.body.sid with a company cid given in params (:id)
route.post('/unregisterStudent/:id', (req, res) => {
    Company.findOne({
        cid: req.params.id
    }, function (err, company) {
        if (err) return err;
        // error handling
        company.regsid.remove(req.body.sid);
        company.save(function (err, company) {
            if (err) return err;
            // error handling
            res.send(company);
        });

    });

});


module.exports = route;