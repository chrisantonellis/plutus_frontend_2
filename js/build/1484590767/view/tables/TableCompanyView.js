define(["app","text!templates/tables/table-row-company.html"],function(e,t){return Backbone.View.extend(_.extend({},Backbone.Events,{className:"row",events:{click:"viewModel","click .action-remove":"dialogueConfirm"},template:_.template(t),initialize:function(){this.on("confirmDelete",this.deleteModel,this),this.model.on("change",this.render,this),this.render()},render:function(){var e=this.model.toJSON();return this.$el.attr("data-id",this.model.get("_id")),this.$el.html(this.template({company:e})),this},viewModel:function(t){if(!$(".companies-table").hasClass("editing")){$(".companies-table .row").removeClass("selected"),this.$el.addClass("selected");var i=e.router.getRoute(),o=this.model.id;e.router.navigate(i+"/"+o,{trigger:!0})}},deleteModel:function(){var e=this.$el;this.parentView.trigger("modelDeleted"),this.parentView.queue.push(this.model),e.addClass("removing-1"),setTimeout(function(){e.addClass("removing-2"),setTimeout(function(){e.remove()},800)},100)},dialogueConfirm:function(t){var t=this.model.get("full_name"),i="Are you sure you want to delete "+t+"?";e.controls.modalConfirm(i,"confirmDelete",this)}}))});
//# sourceMappingURL=TableCompanyView.js.map