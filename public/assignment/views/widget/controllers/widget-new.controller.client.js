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
        model.createText = createText;

        function createText() {
            var textWidget={
                widgetType:"TEXT",
                rows:0,
                placeholder:"",
                formatted: false,
                size:0,
                text:""
            };
            widgetService
                .createWidget(model.pageId,textWidget).then(function (textWid) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+textWid._id);
            })
        }

        function createHeading() {
            var heading = {
                widgetType:"HEADING",
                size:0,
                text:""
            };
            widgetService.createWidget(model.pageId,heading).then(function (headingWid) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+headingWid._id);
            });
        }

        function createHtml() {
            var htmlWidget = {
                widgetType:"HTML",
                text:""
            };
            widgetService.createWidget(model.pageId,htmlWidget).then(function (htmlWid) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+htmlWid._id);
            })
        }

        function createYoutube(){
            var youtubeWidget ={
                widgetType: "YOUTUBE",
                width: "100%",
                url: ""
            };
            var youtubeWid = widgetService.createWidget(model.pageId,youtubeWidget).then(function (youtubeWid) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+youtubeWid._id);
            })
        }

        function createImage(){
            var imageWidget ={
                widgetType: "IMAGE",
                width: "100%",
                url: ""
            };
            widgetService.createWidget(model.pageId,imageWidget).then(function (imageWid) {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+imageWid._id);
            });
        }

    }

})();

