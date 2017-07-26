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
                model.websites = websiteService.findWebsitesForUser(model.userId);
                model.website = websiteService.findWebsiteById(model.websiteId);
            }
            init();

            function updateWebsite(websiteId,website) {
                websiteService.updateWebsite(websiteId,website);
                $location.url('/user/'+model.userId+'/website');
            }

            function deleteWebsite(websiteId) {
                websiteService.deleteWebsite(websiteId);
                $location.url('/user/'+model.userId+'/website');
            }
        }
})();
