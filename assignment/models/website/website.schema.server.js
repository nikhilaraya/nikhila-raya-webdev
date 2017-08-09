/**
 * Created by user on 07-08-2017.
 */
var mongoose = require('mongoose');

var webSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    name: String,
    description: String,
    pages: [{type:mongoose.Schema.Types.ObjectId, ref:"PageModel"}]
},{collection:'website'});

module.exports = webSchema;