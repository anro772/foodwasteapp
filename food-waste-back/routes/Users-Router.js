const express = require('express');
const router = express.Router();
const Users = require('../models').Users;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const Foods = require('../models').Foods;
const UserFridge = require('../models').UserFridge;
const { validateToken } = require('../middleware/AuthMiddleware');
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

const createFood = async ({ category, price, foodName }) => {
    return await Foods.create({ category, price, foodName });
};

const getFoods = async () => {
    return await Foods.findAll();
};


const createUserFridge = async ({ userId, foodId, availability }) => {
    return await UserFridge.create({ userId, foodId, availability });
};

const getFoodsInFridge = async userId => {
    return await UserFridge.findAll({
        where: {
            userId,
        },
    });
};

router.get('/users', async (req, res) => {

    getAllUsers().then(users => res.json(users));
});

router.post("/register", async (req, res) => {

    const user = await getUserByUsername(req.body.username);
    if (user) {
        res.status(401).json({ msg: 'Username already exists' });
        return;
    }

    if (!req.body.username || !req.body.password) {
        res.status(401).json({ msg: 'Username or password is empty' });
        return;
    }

    const { username, password, firstName, lastName } = req.body;
    createUser({ username, password, firstName, lastName }).then(user =>
        res.json(user)
    );

});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, jwtOptions.secretOrKey);
    res.json(decoded);
});


router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    if (username && password) {

        let user = await getUserByUsername(username);

        if (!user) {
            res.send({ msg: 'No such user found' });
            return;
        }

        if (user.password === password) {
            let payload = { id: user.id };
            let token = jwt.sign({ username: user.username, id: user.id }, jwtOptions.secretOrKey);
            res.json({ msg: 'ok', token: token });
        } else {
            res.send({ msg: 'Password is incorrect' });
            return;
        }

    }
});

router.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json('Success! You can now see because you are authorized.');
});


router.post('/addFood', validateToken, async (req, res) => {
    const { category, price, foodName } = req.body;
    const username = req.user.username;
    const food = await createFood({ category, price, foodName });
    food.username = username;
    res.json(food);
});

router.get('/foods', async (req, res) => {
    getFoods().then(foods => res.json(foods));
});

router.post('/addUserFridge', async (req, res) => {
    const { userId, foodId, availability } = req.body;
    const UserFridge = await createUserFridge({ userId, foodId, availability });
    res.json(UserFridge);
});

router.get('/foodsInFridge/:userId', async (req, res) => {
    const { userId } = req.params;
    getFoodsInFridge(userId).then(foods => res.json(foods));
});

module.exports = router