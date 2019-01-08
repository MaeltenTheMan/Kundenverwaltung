var express = require('express');
var router = express.Router();

var Customer = require('./Customer');

module.exports = router;


// CREATES A NEW CUSTOMER
router.post('/', function (req, res) {

    req.check('name', 'invalid name').notEmpty();
    req.check('lastName', 'invalid lastName').notEmpty();
    req.check('gender', 'invalid gender').notEmpty();
    req.check('street', 'invalid street').notEmpty();
    req.check('city', 'invalid city').notEmpty();
    req.check('postCode', 'invalid postCode').notEmpty();


    var errors = req.validationErrors();

    console.log("create new Customer");

    if(!errors){

        Customer.create({
                name : req.body.name,
                lastName: req.body.lastName,
                gender: req.body.gender,
                street: req.body.street,
                postCode: req.body.postCode,
                city: req.body.city
            }, 
            function (err, customer) {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                res.status(200).send(customer);
            }
        );
    }
    else{
        return res.status(500).send("Validationproblems");
    }
});

// RETURNS ALL CUSTOMERS IN THE DATABASE
router.get('/', function (req, res) {
    console.log("get Customers");
    let filter = {}
    if(req.query.lastName){
        filter = {
            lastName: new RegExp(req.query.lastName, 'i')
        }
    }
    Customer.find(filter, function (err, customers) {
        if (err) return res.status(500).send("There was a problem finding the customers.");
        res.status(200).send(customers);
    });
});


// GETS A SINGLE CUSTOMER FROM THE DATABASE
router.get('/:id', function (req, res) {
    console.log("get single Customers");
    Customer.findById(req.params.id, function (err, customer) {
        if (err) return res.status(500).send("There was a problem finding the customer.");
        if (!customer) return res.status(404).send("No customer found.");
        res.status(200).send(customer);
    });
});

// DELETES A CUSTOMER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    console.log("delete Customers");
    Customer.findByIdAndRemove(req.params.id, function (err, customer) {
        if (err) return res.status(500).send("There was a problem deleting the customer.");
        res.status(200).send("User " + customer.name + " " + customer.lastName + " was deleted.");
    });
});

// UPDATES A SINGLE CUSTOMER IN THE DATABASE
router.put('/:id', function (req, res) {

    req.check('name', 'invalid name').notEmpty();
    req.check('lastName', 'invalid lastName').notEmpty();
    req.check('gender', 'invalid gender').notEmpty();
    req.check('street', 'invalid street').notEmpty();
    req.check('city', 'invalid city').notEmpty();
    req.check('postCode', 'invalid postCode').notEmpty();

    var errors = req.validationErrors();

    console.log("update Customer");  
    
    if(!errors){
    
        Customer.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, customer) {
            if (err) return res.status(500).send("There was a problem updating the customer.");
            res.status(200).send(customer);
        });
    }
    else{
        return res.status(500).send("Validationproblems");
    }
});

module.exports = router;