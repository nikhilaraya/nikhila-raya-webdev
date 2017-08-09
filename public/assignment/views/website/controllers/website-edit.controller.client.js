(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

        function websiteEditController($routeParams,$location,websiteService) {

            var model = this;
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams.websiteId;
            model.updateWebsite = updateWebsite;
            model.deleteWebsite = deleteWebsite;

            function init() {
                websiteService
                    .findWebsitesForUser(model.userId)
                    .then(renderWebsites);
                function renderWebsites(websites) {
                    model.websites = websites;
                }
                websiteService
                    .findWebsiteById(model.websiteId)
                    .then(renderWebsite);
                function renderWebsite(website) {
                    model.website = website;
                }
            }
            init();

            function updateWebsite(websiteId,website) {
                websiteService.updateWebsite(websiteId,website);
                $location.url('/user/'+model.userId+'/website');
            }

            function deleteWebsite(websiteId) {
                websiteService.deleteWebsite(model.userId,websiteId);
                $location.url('/user/'+model.userId+'/website');
            }
        }
})();
