define(["app","collection/bills/MyBillsCollection","view/cards/bill_small","text!templates/bills/past.html"],function(e,i,l,t){return Backbone.View.extend({className:"panel",template:_.template(t),initialize:function(e){e&&_.extend(this,e);var l=this;this.child_views=[],this.collection=new i,this.collection.fetch().then(function(){l.render()})},render:function(){var e=this;return this.$el.html(this.template()),this.collection.models.reverse(),this.collection.length<1&&this.showEmpty(),this.collection.each(function(i){var t=new l({model:i});e.$el.find(".scroll-y").append(t.$el),e.child_views.push(t)}),this},showEmpty:function(){var e='<div class="no-bills">';e+='<div class="icon-container"><div class="icon success"></div></div>',e+="<h2>You're all set!</h2>",e+="<p>You have no bills at this time.</p>",e+="</div>",this.$el.find(".scroll-y").html($(e))}})});
//# sourceMappingURL=Past.js.map
