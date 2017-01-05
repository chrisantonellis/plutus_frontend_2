define(["app","view/modals/ModalView","text!templates/modals/modal-funding-source.html","https://cdn.dwolla.com/1/dwolla.js"],function(e,t,n){return t.extend({title:"Add Bank Account",actions:{confirm:!1,cancel:!0},template:_.template(n),initialize:function(t){t&&_.extend(this,t);var n=this;e.utils.request({path:"account/iav",method:"GET"}).then(function(e){n.iav_token=e,n.renderModalView()})},render:function(){return this.ready(),this.renderIAV(),this},renderIAV:function(){var t=this;this.$el.find(".modal").addClass("loading"),e.controls.wait(1800).then(function(){t.$el.find(".modal").removeClass("loading")});var n=this.iav_token;dwolla.configure(e.config.dwolla_env),dwolla.iav.start(n,{container:"iav-container",stylesheets:["https://fonts.googleapis.com/css?family=Roboto",e.url.base_url+"css/dwolla_style.css"],microDeposits:!0,fallbackToMicroDeposits:!0},function(n,o){if(o){console.log(o);var i={id:o._links["funding-source"].href.split("funding-sources/")[1],status:o._links["verify-micro-deposits"]?"unverified":"verified"};e.utils.request({path:"account/funding_sources",method:"POST",data:i}).then(function(){t.closeModal(),t.context.trigger(t.eventName)})}else n&&e.controls.handleError(n)})}})});
//# sourceMappingURL=ModalFundingSourceView.js.map
