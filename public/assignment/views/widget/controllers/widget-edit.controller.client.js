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
            model.rows = model.widget.rows;
            model.placeholder = model.widget.placeholder;
            model.formatted = model.widget.formatted;
        }


        model.editHeading = editHeading;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        model.editHtml = editHtml;
        model.editText = editText;
        model.deleteWidget = deleteWidget;

        function deleteWidget() {
            widgetService.deleteWidget(model.pageId,model.widgetId).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            });
        }

        function editHtml() {
            var htmlWid={
                _id: model.widget._id,
                pageId: model.widget.pageId,
                text:model.text
            };
            widgetService.updateWidget(model.widgetId,htmlWid).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })
        }

        function editText() {
            console.log(model.text+" "+model.placeholder+" "+model.rows+" "+model.formatted);
            var textWid = {
                _id:model.widget._id,
                widgetType: "TEXT",
                rows: model.rows,
                placeholder: model.placeholder,
                formatted: model.formatted,
                text: model.text
            };

            widgetService.updateWidget(model.pageId,textWid).then(function () {
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
            })
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
