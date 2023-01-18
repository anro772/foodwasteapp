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

var cors = require('cors'); //use cors for cross origin resource sharing (CORS)
//cors is used to allow access to resources on a web page from another domain outside the domain from which the first resource was served

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
passport.use(strategy); //passport is used to authenticate requests, which it does through an extensible set of plugins known as strategies.

const app = express(); //create an express app
app.use(bodyParser.json()); //use body-parser to parse JSON bodies 
app.use(bodyParser.urlencoded({ extended: true })); //use body-parser to parse URL-encoded bodies
app.use(passport.initialize()); //initialize passport
app.use(cors()); //use cors

const Sequelize = require('sequelize'); //use sequelize to connect to mysql database

const sequelize = new Sequelize({ //create a sequelize instance with the database credentials
    database: 'fooddb',
    username: 'root',
    password: '1234',
    dialect: 'mysql',
});

sequelize //authenticate the database connection
    .authenticate() 
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

const db = require('./models'); //import the models from the models folder
const Users = require('./models/Users'); 

app.get('/', function (req, res) { //create a GET route
    res.json({ message: 'Express is up!' });
});


//Routers
const usersRouter = require('./routes/Users-Router.js') //import the users router from the routes folder

app.use(usersRouter);

db.sequelize.sync().then(() => {

    app.listen(8080, () => {

        console.log("Server running on port 8080"); //start the server on port 8080
    });
});
