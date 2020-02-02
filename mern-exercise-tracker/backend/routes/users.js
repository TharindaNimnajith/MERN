/* jshint esversion: 6 */

const router = require('express').Router();  // require express Router to create a route
let User = require('../models/user.model');  // require the mongoose model created

// route (end point) that handles incoming http get requests
// if the url is http://localhost:5000/users/ and if it is a get request internal code will be executed
router.route('/').get((req, res) => {
    // get a list of all the users from the mongodb atlas database
    // find() method returns a promise
    User.find()
        .then(users => res.json(users))  // return all the users from the database in json format
        .catch(err => res.status(400).json('Error: ' + err));  // in case of an error, return status 400 with error message in json format
});

// route (end point) that handles incoming http get requests
// if the url is http://localhost:5000/users/add and if it is a post request internal code will be executed
router.route('/add').post((req, res) => {
    const username = req.body.username;  // new username is a part of the request body
    const newUser = new User({username});  // create a new instance of User using the username
    newUser.save()  // save the new user to the database
        .then(() => res.json('User added!'))  // if successful, return success message in json format
        .catch(err => res.status(400).json('Error: ' + err));  // in case of an error, return status 400 with error message in json format
});

// export module in node.js
// module.exports is a special object which is included in every JS file in the node.js application by default
// module is a variable that represents current module
// exports is an object that will be exposed as a module
// whatever you assign to module.exports or exports, will be exposed as a module
module.exports = router;
