define(["app","collection/users/LandlordsCollection","view/modals/ModalInviteView","view/tables/TableView","view/tables/TableUserView","text!templates/tables/table-users.html"],function(e,t,i,l,s,n){return Backbone.View.extend({className:"collection-view",template:_.template(n),initialize:function(){this.render()},attachEvents:function(){this.listening=!0},render:function(){return this.listening||this.attachEvents(),this.tableView&&this.tableView.tips&&this.tableView.tips.close(),this.tips||this.$el.addClass("no-tips"),this.tableView=new l({context:this,modelName:"landlord",collection:t,row:s,options:{search:!0,add:i,addModalOptions:{action:"invite",eventName:"modelAdded"}}}),this.$el.html(this.tableView.$el),this}})});
//# sourceMappingURL=LandlordsView.js.map
