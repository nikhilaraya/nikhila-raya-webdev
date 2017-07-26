(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ]

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.createPage = createPage;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function updatePage(pageId,page) {
            var pageFound = findPageById(pageId);
            pageFound.name = page.name;
            pageFound.description = page.title;
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }

        function createPage(page) {
            page._id = (new Date()).getTime() +"";
            pages.push(page);
        }

        function findPageById(pageId)
        {
            return pages.find(function (page) {
                return page._id === pageId
            });
        }
        function findPageByWebsiteId(websiteId) {
            var results = [];

            for(var p in pages){
                if(pages[p].websiteId === websiteId)
                {
                    results.push(pages[p]);
                }
            }
            return results;
        }

    }
})();