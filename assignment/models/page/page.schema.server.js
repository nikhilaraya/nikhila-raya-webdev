/**
 * Created by user on 07-08-2017.
 */
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website:{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    name: String,
    title: String,
    widgets:[{type:mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}]
},{collection: 'page'});

module.exports = pageSchema;