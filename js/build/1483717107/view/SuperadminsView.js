define(["app","collection/users/SuperAdminsCollection","view/modals/ModalAdminView","view/tables/TableView","view/tables/TableUserView","text!templates/tables/table-users.html"],function(e,t,i,s,l,n){return Backbone.View.extend({className:"collection-view",template:_.template(n),initialize:function(){this.render()},attachEvents:function(){this.listening=!0},render:function(){return this.listening||this.attachEvents(),this.tableView&&this.tableView.tips&&this.tableView.tips.close(),this.tips||this.$el.addClass("no-tips"),this.tableView=new s({context:this,modelName:"superAdmin",collection:t,row:l,options:{search:!0,add:i,addModalOptions:{action:"add",eventName:"modelAdded"}}}),this.$el.html(this.tableView.$el),this}})});
//# sourceMappingURL=SuperadminsView.js.map