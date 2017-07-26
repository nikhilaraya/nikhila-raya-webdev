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
        console.log(model.userId+model.websiteId+model.pageId+model.widgetId);

        model.widget = widgetService.findWidgetById(model.widgetId);
        console.log(model.widget._id);
        model.name = model.widget.widgetType;
        model.text = model.widget.text;
        model.url = model.widget.url;
        model.size = model.widget.size;
        model.width = model.widget.width;

        model.editHeading = editHeading;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        model.deleteWidget = deleteWidget;

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function editYoutube() {
            var youtube ={
                _id: model.widget._id,
                pageId: model.widget.pageId,
                widgetType: model.name,
                url: model.url,
                width: model.width
            }
            widgetService.updateWidget(model.widgetId,youtube);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');

        }
        function editImage() {
            var imageWid ={
                _id: model.widget._id,
                pageId: model.widget.pageId,
                widgetType: model.name,
                url: model.url,
                width: model.width
            }
            widgetService.updateWidget(model.widgetId,imageWid);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
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
            widgetService.updateWidget(model.widgetId,heading);
            console.log("hmm");
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }

})();
