define(["app","view/ModelView","model/users/UserModel","text!templates/users/user.html"],function(e,t,n,i){return Backbone.View.extend({className:"user-view",events:{"click .action-reinvite":"resendInvitation"},template:_.template(i),initialize:function(t){_.extend(this,t);var i=this,s=e.router.getRoute();this.model=new n({_id:this._id},{role:s}),this.model.fetch().then(function(){i.render()})},render:function(){return this.ModelView=new t({context:this,options:{edit:!0,delete:!0}}),this.$el.html(this.ModelView.$el),this},resendInvitation:function(){var t=this;this.model.resendInvitation().then(function(){e.alerts.success("Invitation has been resent to "+t.model.get("full_name"))},function(t){console.warn(t),e.alerts.error("Could not resend invitation...")})}})});
//# sourceMappingURL=UserView.js.map