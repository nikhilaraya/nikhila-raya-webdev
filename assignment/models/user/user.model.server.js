/**
 * Created by user on 07-08-2017.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findTotalUsers = findTotalUsers;

module.exports = userModel;

function findTotalUsers() {
    return userModel.find();
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

function findUserByCredentials(username,password){
    return userModel.findOne({username: username,password: password});
}

function updateUser(userId,newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});
}

function addWebsite(userId,websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function deleteWebsite(userId,websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index,1);
            return user.save();
        });
}