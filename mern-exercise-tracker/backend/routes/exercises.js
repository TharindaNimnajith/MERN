/* jshint esversion: 6 */

const router = require('express').Router();  // require express Router to create a route
let Exercise = require('../models/exercise.model');  // require the mongoose model created

// route (end point) that handles incoming http get requests
// if the url is http://localhost:5000/exercises/ and if it is a get request internal code will be executed
router.route('/').get((req, res) => {
    // get a list of all the exercises from the mongodb atlas database
    // find() method returns a promise
    Exercise.find()
        .then(exercises => res.json(exercises))  // return all the exercises from the database in json format
        .catch(err => res.status(400).json('Error: ' + err));  // in case of an error, return status 400 with error message in json format
});

// route (end point) that handles incoming http get requests
// if the url is http://localhost:5000/exercises/add and if it is a post request internal code will be executed
router.route('/add').post((req, res) => {
    // assign different parts of the request body to several variables
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // create a new instance of Exercise using all the variables
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()  // save the new exercise to the database
        .then(() => res.json('Exercise added!'))  // if successful, return success message in json format
        .catch(err => res.status(400).json('Error: ' + err));  // in case of an error, return status 400 with error message in json format
});

// export module in node.js
// module.exports is a special object which is included in every JS file in the node.js application by default
// module is a variable that represents current module
// exports is an object that will be exposed as a module
// whatever you assign to module.exports or exports, will be exposed as a module
module.exports = router;
