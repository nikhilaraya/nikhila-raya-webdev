(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http) {

        this.findWebsitesForUser = findWebsitesForUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;


        function deleteWebsite(userId,websiteId) {
            var url ="/api/user/"+userId+"/website/"+websiteId;
            return $http.delete(url,websiteId)
                .then(function (response) {
                return response.data;
            });

            // var websiteFound = findWebsiteById(websiteId);
            // var index = websites.indexOf(websiteFound);
            // websites.splice(index,1);
        }

        function updateWebsite(websiteId,website) {
            var url = "/api/website/"+websiteId;
            return $http.put(url,website)
                .then(function (response) {
                return response.data;
            });
            // var websiteFound = findWebsiteById(websiteId);
            // websiteFound.name = website.name;
            // websiteFound.description = website.description;
        }

        function findWebsiteById(websiteId) {
            var url= "/api/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                return response.data;
            });
            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // });
        }

        function findWebsitesForUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var sites = [];
            //
            // for(var w in websites) {
            //     if(websites[w].developerId === userId) {
            //         sites.push(websites[w]);
            //     }
            // }
            // return sites;
        }

        function createWebsite(website) {
            var url = "/api/user/"+website.developerId+"/website";
            return $http.post(url,website)
                .then(function (response) {
                    return response.data;
                });
            // website._id = (new Date()).getTime() + "";
            // websites.push(website);
        }



    }
})();