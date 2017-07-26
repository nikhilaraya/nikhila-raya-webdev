(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);
    
    function websiteNewController($routeParams,$location,websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();