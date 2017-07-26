(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;


        function deleteWebsite(websiteId) {
            var websiteFound = findWebsiteById(websiteId);
            var index = websites.indexOf(websiteFound);
            websites.splice(index,1);
        }

        function updateWebsite(websiteId,website) {
            var websiteFound = findWebsiteById(websiteId);
            websiteFound.name = website.name;
            websiteFound.description = website.description;
        }

        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function findWebsitesForUser(userId) {
            var sites = [];

            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }



    }
})();