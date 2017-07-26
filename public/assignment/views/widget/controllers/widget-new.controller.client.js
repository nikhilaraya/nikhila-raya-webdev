(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams,$location,widgetService) {

        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.createHeading = createHeading;
        model.createHtml = createHtml;
        model.createYoutube = createYoutube;
        model.createImage = createImage;

        function createHeading() {
            var heading = {
                widgetType:"HEADING",
                size:0,
                text:""
            };
            var headingWid = widgetService.createWidget(model.pageId,heading);
            console.log(headingWid.widgetType);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+headingWid._id);
        }

        function createHtml() {
            var htmlWidget = {
                widgetType:"HTML",
                text:""
            };
            var htmlWid = widgetService.createWidget(model.pageId,htmlWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+htmlWid._id);
        }

        function createYoutube(){
            var youtubeWidget ={
                widgetType: "YOUTUBE",
                width: "100%",
                url: ""
            };
            var youtubeWid = widgetService.createWidget(model.pageId,youtubeWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+youtubeWid._id);
        }

        function createImage(){
            var imageWidget ={
                widgetType: "IMAGE",
                width: "100%",
                url: ""
            };
            var imageWid = widgetService.createWidget(model.pageId,imageWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+imageWid._id);
        }

    }

})();

