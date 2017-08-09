(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);
    
    function widgetService($http) {

        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetByPageId = findWidgetByPageId;
        this.sortingWidgets = sortingWidgets;

        function sortingWidgets(startIndex,stopIndex,pageId) {
            var url = "/api/page/"+pageId+"/widget?initial="+startIndex+"&final="+stopIndex;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var results = [];
            // for(var v in widgets){
            //     if(widgets[v].pageId === pageId){
            //         results.push(widgets[v]);
            //     }
            // }
            // return results;
        }

        function findWidgetById(widgetId) {
            var url= "/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // return widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
        }

        function updateWidget(widgetId,widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url,widget)
                .then(function (response) {
                    return response.data;
                });
            // var widgetFound = findWidgetById(widgetId);
            // var index = widgets.indexOf(widgetFound);
            // widgets[index] = widget;
        }

        function deleteWidget(pageId,widgetId) {
            var url ="/api/page/"+pageId+"/widget/"+widgetId;
            return $http.delete(url,widgetId)
                .then(function (response) {
                    return response.data;
                });
            // var widgetFound = findWidgetById(widgetId);
            // var index = widgets.indexOf(widgetFound);
            // widgets.splice(index,1);
        }

        function createWidget(pageId,widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url,widget)
                .then(function (response) {
                    return response.data;
                });
            // widget._id = (new Date()).getTime() +"";
            // widget.pageId = pageId;
            // widgets.push(widget);
            // console.log("created");
            // return widget;
        }
    }
    
})();