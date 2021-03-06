(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams,$location,pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);

            function renderPages(pages) {
                model.pages = pages;
            }
        }
        init();

        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();