define(["app","text!templates/404.html"],function(t,e){return Backbone.View.extend({initialize:function(){this.render()},render:function(){return this.template=_.template(e),this.$el.html(this.template()),this}})});
//# sourceMappingURL=404View.js.map
