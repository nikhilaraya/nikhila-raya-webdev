(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams,$location,widgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        widgetService.findWidgetById(model.widgetId).then(renderWidget);
        function renderWidget(widget) {
            model.widget= widget;
            model.name = model.widget.widgetType;
            model.text = model.widget.text;
            model.url = model.widget.url;
            model.size = model.widget.size;
            model.width = model.widget.width;
        }


        model.editHeading = editHeading;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        model.deleteWidget = deleteWidget;

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
        }

        function editYoutube() {
            var youtube ={
                _id: model.widget._id,
                pageId: model.widget.pageId,
                widgetType: model.name,
                url: model.url,
                width: model.width
            }
            widgetService.updateWidget(model.widgetId,youtube).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
        }
        function editImage() {
            var imageWid ={
                _id: model.widget._id,
                pageId: model.widget.pageId,
                widgetType: model.name,
                url: model.url,
                width: model.width
            }
            widgetService.updateWidget(model.widgetId,imageWid).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
        }
        function editHeading(){
            console.log("heading"+model.size+model.name);
            var heading = {
                _id: model.widget._id,
                pageId: model.widget.pageId,
                widgetType: model.name,
                text: model.text,
                size: model.size
            }
            widgetService.updateWidget(model.widgetId,heading).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
        }
    }

})();
