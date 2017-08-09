/**
 * Created by user on 07-08-2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel',widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.findAllWidgets = findAllWidgets;
widgetModel.createWidget = createWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.findWidgetById = findWidgetById;

module.exports = widgetModel;

function findAllWidgets(pageId) {
    return widgetModel
        .find({_page: pageId})
        .sort({position:1});
}

function updateWidget(widgetId,newWidget) {
    delete newWidget._page;
    return widgetModel.update({_id: widgetId},{$set: newWidget});
}

function deleteWidget(pageId,widgetId) {
    return widgetModel
        .remove({_id:widgetId})
        .then(function (widget) {
            return pageModel
                .deleteWidget(pageId,widgetId);
        });
}

function createWidget(pageId,widget) {
    widget._page = pageId;
    return widgetModel
        .find({_page:pageId})
        .then(function (widgets) {
            widget.position = widgets.length;
            return widgetModel.create(widget)
                .then(function (widget) {
                    pageModel
                        .addWidget(pageId,widget._id)
                    return widget;
                });
        })
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function reorderWidget(pageId,startIndex,endIndex) {
    return widgetModel.find({_page:pageId},function(error,widgets){
        widgets.forEach(function (widget) {
            if(startIndex < endIndex) {
                if (widget.position === startIndex) {
                    widget.position = endIndex;
                    widget.save();
                }
                else if (widget.position > startIndex && widget.position <= endIndex) {
                    widget.position = widget.position - 1;
                }
            }
            else{
                if(widget.position === startIndex){
                    widget.position = endIndex;
                    widget.save();
                }
                else if(widget.position < startIndex && widget.position >= endIndex){
                    widget.position = widget.position + 1;
                    widget.save();
                }
            }
        });
    });
}