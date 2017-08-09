const app = require('../../express');
var pageModel = require('../models/page/page.model.server');
var websiteModel = require('../models/website/website.model.server');

// var pages =
//     [
//         { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//         { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//         { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
//     ];

app.post("/api/website/:websiteId/page",createPage);
app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
app.get("/api/page/:pageId",findPageById);
app.put("/api/page/:pageId",updatePage);
app.delete("/api/website/:websiteId/page/:pageId",deletePage);

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId,page)
        .then(function (page) {
            res.json(page);
        });
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.json(page);
}

function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId
    pageModel
        .findAllPages(websiteId)
        .then(function (pages) {
            res.json(pages);
        })
    // var pagesWebsite = [];
    // for(var p in pages) {
    //     if(pages[p].websiteId === req.params.websiteId) {
    //         pagesWebsite.push(pages[p]);
    //     }
    // }
    // res.json(pagesWebsite);
}

function findPageById(req,res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
    // for(var p in pages){
    //     if(pages[p]._id === pageId){
    //         res.send(pages[p]);
    //         return;
    //     }
    // }
}
function updatePage(req,res) {
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId,page)
        .then(function (status) {
            res.sendStatus(status);
        });
    // for(var p in pages){
    //     if(pages[p]._id === page._id){
    //         pages[p] = page;
    //         res.sendStatus(200);
    //     }
    // }
}
function deletePage(req,res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    return pageModel
        .deletePage(websiteId,pageId)
        .then(function (page) {
            res.sendStatus(200);
        },function (error) {
            res.sendStatus(404);
        });
    // for(var p in pages){
    //     if(pages[p]._id === pageId){
    //         pages.splice(p,1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}