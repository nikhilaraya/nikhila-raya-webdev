/**
 * Created by user on 27-07-2017.
 */
const app = require('../../express');
var userModel = require('../models/user/user.model.server');

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete('/api/user/:userId',deleteUser);

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });

    // for(var u in users){
    //     if(users[u]._id === userId){
    //         users.splice(u,1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (status) {
            res.send(status);
        });

    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users[u] = user;
    //         res.send(user)
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function registerUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        },function (error) {
            res.send(error);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // res.send(user);
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                }
                else
                {
                    res.sendStatus(404);
                }
            });

    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.json(user);
                }else{
                    res.sendStatus(404);
                }
            });
        // for(var u in users) {
        //     if(users[u].username === username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
    }else{
        userModel
            .findTotalUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            response.json(user);
        });
    // for(var u in users) {
    //     if(users[u]._id === req.params.userId) {
    //         response.send(users[u]);
    //     }
    // }
}