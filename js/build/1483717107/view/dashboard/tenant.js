define(["app","view/bills/Current","text!templates/headers/header-bills.html"],function(e,t,i){return Backbone.View.extend({className:"tabs-view panel",events:{"click .tabs a":"toggleTab"},initialize:function(t){t&&_.extend(this,t);e.views.currentView=this,this.template_container=_.template(i),this.render()},render:function(){return this.$el.html(this.template_container()),this.loadView(),this},loadView:function(){var t=this,i="current",a=!0;this.subPage&&(i=this.subPage,a=!1,this.$el.find(".tabs a").removeClass("active"),this.$el.find('.tabs a[data-tab="'+i+'"]').addClass("active")),file=e.utils.capitalize(i),e.utils.loadView.get("bills/"+file).then(function(r){var l=new r({parentModel:t.model});e.views.currentView.currentTab=l,t.$el.find(".bills-view").html(l.$el),l.delegateEvents(),e.views.modelView||(e.router.navigate("dashboard/"+i,{trigger:!1,replace:a}),e.router.trigger("route"))}).fail(function(t){e.router.navigate("404",{trigger:!0,replace:!0})})},toggleTab:function(e){var t=$(e.currentTarget).attr("data-tab");this.subPage=t,this.loadView()}})});
//# sourceMappingURL=tenant.js.map