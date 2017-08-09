/**
 * Created by user on 07-08-2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    websites: [{type:mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}]
},{collection:"assignment_user"});

module.exports = userSchema;