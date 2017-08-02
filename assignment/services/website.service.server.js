const app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post("/api/user/:userId/website",createWebsite);
app.get("/api/user/:userId/website",findAllWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.put("/api/website/:websiteId",updateWebsite);
app.delete("/api/website/:websiteId",deleteWebsite);

function createWebsite(req,res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function findAllWebsitesForUser(req,res) {
    var sites = [];
    for(var w in websites) {
        if(websites[w].developerId === req.params.userId) {
            sites.push(websites[w]);
        }
    }
    res.json(sites);
}

function findWebsiteById(req,res) {
    var websiteId = req.params.websiteId;
    for(var v in websites){
        if(websites[v]._id === websiteId){
            res.send(websites[v]);
            return;
        }
    }
}
function updateWebsite(req,res) {
    var website = req.body;
    for(var v in websites){
        if(websites[v]._id === website._id){
            websites[v] = website;
            res.sendStatus(200);
        }
    }
}
function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    for(var v in websites){
        if(websites[v]._id === websiteId){
            websites.splice(v,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}