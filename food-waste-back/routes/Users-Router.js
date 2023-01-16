const express = require('express');
const router = express.Router();
const Users = require('../models').Users;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Foods = require('../models').Foods;
const UserFridge = require('../models').UserFridge;
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

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

const createUser = async ({ username, password, firstName, lastName }) => {
    return await Users.create({ username, password, firstName, lastName });
};

const getAllUsers = async () => {
    return await Users.findAll();
};

const getUser = async obj => {
    return await Users.findOne({
        where: obj,
    })
};

const getUserByUsername = async username => {
    return await Users.findOne({
        where: {
            username,
        },
    });
};

//foods: category, price, availability, foodName
const createFood = async ({ category, price, foodName }) => {
    return await Foods.create({ category, price, foodName });
};

const getFoods = async () => {
    return await Foods.findAll();
};

//UserFridge: userId, foodId, availability
// createUserFridge using foreign key
const createUserFridge = async ({ userId, foodId, availability }) => {
    return await UserFridge.create({ userId, foodId, availability });
};

//function to get all foods in fridge from userid
const getFoodsInFridge = async userId => {
    return await UserFridge.findAll({
        where: {
            userId,
        },
    });
};

router.get('/users', async (req, res) => {
    // res.json("Hello World"); //put json instead of send if u want to receive json
    // const listOfUsers= await Users.findAll()
    // res.json(listOfUsers);
    getAllUsers().then(users => res.json(users));
});

router.post("/register", async (req, res) => {
    // const post=req.body;
    // await Users.create(post);
    // res.json(post);

    //check if user doesnt exist
    // const user = await getUserByUsername(req.body.username);
    // if (user) {
    //     res.status(401).json({ msg: 'Username already exists' });
    //     return;
    // }

    //check if user doesnt exist
    const user = await getUserByUsername(req.body.username);
    if (user) {
        res.status(401).json({ msg: 'Username already exists' });
        return;
    }

    //check if username and password are not empty
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ msg: 'Username or password is empty' });
        return;
    }

    const { username, password, firstName, lastName } = req.body;
    createUser({ username, password, firstName, lastName }).then(user =>
        res.json(user)
    );

});


router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    if (username && password) {
        // we get the user with the name and save the resolved promise returned
        let user = await getUserByUsername(username);


        // if (!user) {
        //     res.status(401).json({ msg: 'No such user found', user });
        //     return;
        // }

        //check if user exists
        if (!user) {
            res.send({ msg: 'No such user found' });
            return;
        }

        if (user.password === password) {
            // from now on we'll identify the user by the id and the id is
            // the only personalized value that goes into our token
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ msg: 'ok', token: token });
        } else {
            res.send({ msg: 'Password is incorrect' });
            return;
        }
    }
});

//protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json('Success! You can now see because you are authorized.');
});

//add food to food table
//foods: category, price, availability, foodName
router.post('/addFood', async (req, res) => {
    const { category, price, foodName } = req.body;
    const food = await createFood({ category, price, foodName });
    res.json(food);

});

//get all foods
router.get('/foods', async (req, res) => {
    getFoods().then(foods => res.json(foods));
});

//userFridge: userId, foodId
router.post('/addUserFridge', async (req, res) => {
    const { userId, foodId, availability } = req.body;
    const UserFridge = await createUserFridge({ userId, foodId, availability });
    res.json(UserFridge);
});

//get all foods in user fridge
router.get('/foodsInFridge/:userId', async (req, res) => {
    const { userId } = req.params;
    getFoodsInFridge(userId).then(foods => res.json(foods));
});

module.exports = router