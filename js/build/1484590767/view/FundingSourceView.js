define(["app","text!templates/funding_sources/funding_source.html"],function(e,t){return Backbone.View.extend({className:"funding-source-view",template:_.template(t),events:{"click .action-delete":"promptDelete","click .action-send-md":"sendMicro","click .action-request-md":"requestMicro","click .action-make-primary":"makePrimary"},initialize:function(e){_.extend(this,e),this.on("confirmDelete",this.deleteModel,this),this.on("confirmPrimary",this.confirmPrimary,this),this.render()},render:function(){var t=this.model.toJSON();t.primary=this.primary;var o=e.session.user.get("dwolla_account.funding_sources");_.extend(t,o[t.id]),console.log(t),this.$el.html(this.template({funding_source:t}));var i=this.$el.find(".numbers-only");return i.mask("zz",{reverse:!0,translation:{a:{pattern:/[0]/,fallback:"0"},z:{pattern:/[0-9]/}}}),i.on("click focus",function(){$(this).val($(this).val())}),this.$el},promptDelete:function(){var t="",o=this.model.get("name");this.primary&&(t+="You are about to delete your primary funding source. "),1===this.parentView.collection.length&&(t+="This is your only funding source. "),t+="Are you sure you want to delete "+o+"?",e.controls.modalConfirm(t,"confirmDelete",this)},deleteModel:function(){var t=this;e.controls.loadLock(!0),this.model.destroy().then(function(){e.controls.loadLock(!1),t.$el.fadeOut(function(){t.close()})}).fail(function(){console.log(arguments),e.alerts.error("Couldn't delete the funding source")})},sendMicro:function(){var t=this,o={},i=this.$el.find("form.micro-deposits").serializeArray();_.each(i,function(e){o[e.name]={},o[e.name].value=parseFloat("0."+e.value).toFixed(2),o[e.name].currency="USD"}),o=e.schema.process(o,this.model),e.controls.loadLock(!0),this.model.sendMicroDeposits(o).always(function(){e.controls.loadLock(!1)}).then(function(){t.parentView.parentView.initialize(),e.alerts.success("Thanks for verifying your bank account!")}).fail(function(){console.warn(arguments),e.alerts.error("Mico Deposits could not be verified.")})},requestMicro:function(){var t=this,o={};e.controls.loadLock(!0),this.model.requestMicroDeposits(o).always(function(){e.controls.loadLock(!1)}).then(function(){t.parentView.parentView.initialize()},function(){console.warn(arguments),e.alerts.error("Mico Deposits could not be initiated.")})},makePrimary:function(){var t=this.model.get("name"),o="Are you sure you want to use "+t+" as your primary bank account?";e.controls.modalConfirm(o,"confirmPrimary",this)},confirmPrimary:function(){var t=this;this.model.setPrimary().then(function(){t.parentView.parentView.initialize(),e.alerts.success("Your primary bank account has been updated!")}).fail(function(t){e.controls.handleError(t)})}})});
//# sourceMappingURL=FundingSourceView.js.map