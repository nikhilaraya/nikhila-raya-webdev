/**
 * Created by user on 07-08-2017.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel',pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.findAllPages = findAllPages;
pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.findPageById = findPageById;

module.exports = pageModel;

function findAllPages(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function updatePage(pageId,newPage) {
    delete newPage._website;
    return pageModel.update({_id: pageId},{$set: newPage});
}

function deletePage(websiteId,pageId) {
    return pageModel
        .remove({_id:pageId})
        .then(function (page) {
            return websiteModel
                .deletePage(websiteId,pageId);
        });
}

function createPage(websiteId,page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId,page._id)
        })
}

function addWidget(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidget(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}