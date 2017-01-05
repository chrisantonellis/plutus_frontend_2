define(["app","view/modals/ModalTransferView","text!templates/cards/bill_large.html"],function(e,t,i){return Backbone.View.extend({events:{"click .action-lease":"viewLease",click:"viewBill","click .action-bill":"handleAction"},template:_.template(i),initialize:function(e){_.extend(this,e),this.on("transferAdded",this.render,this),this.render()},render:function(){var t=this.model.toJSON();return this.$el.html(this.template({bill:t,prettyMoney:e.utils.prettyMoney})),this},handleAction:function(e){"paid"===this.model.get("status")?this.viewBill():this.showTransferModal()},viewBill:function(t){if(!t||!["A","FOOTER"].contains(t.target.tagName)){var i=this.model.get("_id"),n=e.router.getPath();e.router.navigate(n+"/"+i,{trigger:!0})}},viewLease:function(t){var i=this.model.get("lease._id");e.router.navigate("/myleases/"+i,{trigger:!0})},showTransferModal:function(){var i;if("monthly"===this.model.get("type")){var n,a=this.model.get("lease.split"),l=e.session.user.id;a&&(n=a[l]),i=n}else i=this.model.get("total");this.modal=new t({action:"submit",model:this.model,eventName:"transferAdded",context:this,amount:i})}})});
//# sourceMappingURL=bill_large.js.map
