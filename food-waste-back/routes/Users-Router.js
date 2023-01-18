const express = require('express');
const router = express.Router();
const Users = require('../models').Users;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserFridge = require('../models').UserFridge;
const Groups = require('../models').Groups;
const UserGroups = require('../models').UserGroups;
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

const createUser = async ({ username, password, firstName, lastName }) => { //create a user
    return await Users.create({ username, password, firstName, lastName });
};

const getAllUsers = async () => { //get all users
    return await Users.findAll();
};

const getUser = async obj => { //get a user
    return await Users.findOne({
        where: obj,
    })
};

const getUserByUsername = async username => { //get a user by username
    return await Users.findOne({
        where: {
            username,
        },
    });
};


const createGroup = async ({ groupName }) => { //create a group 
    return await Groups.create({ groupName });
};

const createUserGroup = async ({ userId, groupId, groupName, preference }) => { //create a user group
    return await UserGroups.create({ userId, groupId, groupName, preference });
};

const getGroupMembers = async groupId => { //get all the members of a group
    return await UserGroups.findAll({
        where: {
            groupId,
        },
    });

};

const createUserFridge = async ({ userId, foodName, availability, foodCategory }) => { //create a user fridge
    return await UserFridge.create({ userId, foodName, availability, foodCategory });
};

const removeUserFridge = async ({ id }) => { //remove a user fridge
    return await UserFridge.destroy({
        where: {
            id,
        },
    });
};

const getFoodsInFridge = async userId => { //get all the foods in a user fridge
    return await UserFridge.findAll({
        where: {
            userId,
        },
    });
};

router.get('/users', async (req, res) => { //get all users

    getAllUsers().then(users => res.json(users));
});

router.post("/register", async (req, res) => { //register a user

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

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => { //get current user
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, jwtOptions.secretOrKey);
    res.json(decoded);
});


router.post('/login', async function (req, res, next) { //login a user
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

router.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) { //protected route
    res.json('Success! You can now see because you are authorized.');
});


router.get('/foods', async (req, res) => { //get all foods
    getFoods().then(foods => res.json(foods));
});

router.post('/addUserFridge', async (req, res) => { //add a food to a user fridge
    const { userId, foodName, availability, foodCategory } = req.body;
    const UserFridge = await createUserFridge({ userId, foodName, availability, foodCategory });
    res.json(UserFridge);
});

router.post('/removeUserFridge', async (req, res) => { //remove a food from a user fridge
    const { id } = req.body;
    const UserFridge = await removeUserFridge({ id });
    res.json(UserFridge);
});

router.get('/foodsInFridge/:userId', async (req, res) => { //get all the foods in a user fridge
    const { userId } = req.params;
    getFoodsInFridge(userId).then(foods => res.json(foods));
});

router.post('/createGroup', async (req, res) => { //create a group
    const { groupName } = req.body;
    const group = await createGroup({ groupName });
    res.json(group);
});

router.post('/createUserGroup', async (req, res) => { //create a user group
    const { userId, groupId, groupName, preference } = req.body;
    const userGroup = await createUserGroup({ userId, groupId, groupName, preference });
    res.json(userGroup);
});

function getGroups() { //get all groups
    return Groups.findAll();
}

router.get('/groups', async (req, res) => { //get all groups
    getGroups().then(groups => res.json(groups));
});

function getUserGroups(userId) { //get all the groups of a user
    return UserGroups.findAll({
        where: {
            userId,
        },
    });
}

router.get('/userGroups/:userId', async (req, res) => { //get all the groups of a user
    const { userId } = req.params;
    getUserGroups(userId).then(groups => res.json(groups));
});

router.get('/groupMembers/:groupId', async (req, res) => { //get all the members of a group
    const { groupId } = req.params;
    getGroupMembers(groupId).then(members => res.json(members));
});


module.exports = router