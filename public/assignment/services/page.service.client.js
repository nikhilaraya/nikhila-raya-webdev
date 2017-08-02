(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http) {

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.createPage = createPage;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function updatePage(pageId,page) {
            var url = "/api/page/"+pageId;
            return $http.put(url,page)
                .then(function (response) {
                    return response.data;
                });
            // var pageFound = findPageById(pageId);
            // pageFound.name = page.name;
            // pageFound.description = page.title;
        }

        function deletePage(pageId) {
            var url ="/api/page/"+pageId;
            return $http.delete(url,pageId)
                .then(function (response) {
                    return response.data;
                });
            // var page = findPageById(pageId);
            // var index = pages.indexOf(page);
            // pages.splice(index,1);
        }

        function createPage(page) {
            var url = "/api/website/"+page.websiteId+"/page";
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;
                });
            // page._id = (new Date()).getTime() +"";
            // pages.push(page);
        }

        function findPageById(pageId)
        {
            var url= "/api/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // return pages.find(function (page) {
            //     return page._id === pageId
            // });
        }
        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var results = [];
            //
            // for(var p in pages){
            //     if(pages[p].websiteId === websiteId)
            //     {
            //         results.push(pages[p]);
            //     }
            // }
            // return results;
        }

    }
})();