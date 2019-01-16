const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const users = [
    {
      id: 736527,
      username: 'admin',
      password: 'admin'
    }
];

let jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'nicenice';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    const user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
});
  
passport.use(strategy);

const router = express.Router();

// Global array of counties
let countries = ["Nigeria", "Ghana"];

router.use(passport.initialize());
router.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
router.use(bodyParser.json())

router.get('/yes', (req, res) => {
    res.send('This also works!');
});

router.post('/login', (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    if (username && password === undefined){
        return res.send({
            error: true,
            statusCode: 401,
            message: "Missing username and password field"
        })
      }
    // usually this would be a database call:
    const user = users[_.findIndex(users, {username: username})];
    if(!user){
        res.status(401).json({message:"no such user found"});
      }
    if (username !== user.username){
        return res.send({
            error: true,
            statusCode: 401,
            message: "Incorrect username"
        });
    }

    if (password === user.password){
       
        const payload = {
            'id': user.id
        }
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.send({
            error: false,
            statusCode: 200,
            message: "logged in successfully",
            token: token
        })
    } else {
        return res.send({
            error: true,
            statusCode: 401,
            message: "Incorrect password"
        }) 
    }

});

// router.get("/countries", passport.authenticate('jwt', { session: false }), function(req, res){
//     console.log('I got here')
//     res.send({
//         error: false,
//         statusCode: 200,
//         message: "Data gotten successfully",
//         data: countries
//     })
// });

router.get("/countries", (req, res) => {
    console.log('I got here')
    res.send({
        error: false,
        statusCode: 200,
        message: "Data gotten successfully",
        data: countries
    })
});

router.put('/countries', (req, res) => {
    const { country } = req.body;
    countries.push(country);
    return res.send({
        error: false,
        statusCode: 200,
        message: "Country added successfully",
        data: countries
    })
});

router.delete('/countries', (req, res) => {
    const { country } = req.body;
    const index = countries.indexOf(country);
    if (index !== -1) {
        countries.splice(index, 1);
    }
    return res.send({
        error: false,
        statusCode: 200,
        message: "Country removed successfully",
        data: countries
    });
});

module.exports = router;