const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

var cors = require('cors');



let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
// use the strategy
passport.use(strategy);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'fooddb',
    username: 'root',
    password: '1234',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

const db = require('./models');
const Users = require('./models/Users');



app.get('/', function (req, res) {
    res.json({ message: 'Express is up!' });
});



//Routers
const usersRouter = require('./routes/Users-Router.js')

app.use(usersRouter);

db.sequelize.sync().then(() => {

    app.listen(8080, () => {

        console.log("Server running on port 8080");
    });
});
