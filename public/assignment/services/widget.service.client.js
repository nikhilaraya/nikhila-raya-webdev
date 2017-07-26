(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);
    
    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" }
        ]

        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetByPageId = findWidgetByPageId;

        function findWidgetByPageId(pageId) {
            var results = [];
            for(var v in widgets){
                if(widgets[v].pageId === pageId){
                    results.push(widgets[v]);
                }
            }
            return results;
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                console.log("hiiiiiiiiiii"+widgetId);
                return widget._id === widgetId;
            });
        }

        function updateWidget(widgetId,widget) {
            var widgetFound = findWidgetById(widgetId);
            console.log("hhhhhhhhhhhhh"+widgetFound._id);
            var index = widgets.indexOf(widgetFound);
            widgets[index] = widget;
        }

        function deleteWidget(widgetId) {
            var widgetFound = findWidgetById(widgetId);
            var index = widgets.indexOf(widgetFound);
            widgets.splice(index,1);
        }

        function createWidget(pageId,widget) {
            widget._id = (new Date()).getTime() +"";
            widget.pageId = pageId;
            widgets.push(widget);
            console.log("created");
            return widget;
        }
    }
    
})();