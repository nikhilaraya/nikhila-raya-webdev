(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites = websites;
            }
        }
        init();
    }
})();