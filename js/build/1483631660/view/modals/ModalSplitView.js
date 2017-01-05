define(["app","view/modals/ModalView","view/cards/user_payments","model/users/TenantModel","text!templates/modals/modal-split.html"],function(t,e,n,i,a){return e.extend({className:"split",events:{"change .amount":"validateSplit"},title:function(){return this.action+" Rent Split"},template:_.template(a),initialize:function(e){e&&_.extend(this,e),this.model=this.context.model,this.user=t.session.user.toJSON(),this.renderModalView()},render:function(){var e=this.model.get("rent"),n=t.session.user.id,i=this.model.get("autopay")[n]===!0;return this.ready({total:t.utils.prettyMoney(e),autopay:i}),this.renderChart(),this},getSplitData:function(e){var n=this.model.clone().toJSON(),i=this.user._id,a=n.split;n.tenants=n.tenants.map(function(t){return a[t._id]&&(t.split=a[t._id]),t});var r,s=n.tenants.filter(function(t){return"undefined"!=typeof t.split}).map(function(t){return{name:t._id,split:t.split}}),l=n.tenants.length-s.length,o=l?(n.rent-d)/l:0;r=e?parseFloat(e):o;var u=n.split&&n.split.hasOwnProperty(this.user._id);u?e&&(s=s.map(function(t){return t.name==i&&(t.split=r),t})):s.push({name:i,split:r});var d=s.map(function(t){return t.split}).reduce(function(t,e){return t+e},0),p=n.rent-d,h=s.map(function(t){return t.split}).reduce(function(t,e){return t+e},0),c=n.rent-h;if(c<0)return this.$el.find(".amount").val(p),this.updateChart(p),!1;p&&s.push({name:"Remaining",split:c});var m={},f=[];s.forEach(function(t){f.push(t.name),m[t.name]=t.split});var v=m[i];return this.$el.find(".amount").val(t.utils.parseMoney(v)),{data:m,keys:f}},renderChart:function(e){var a=this,r=$.extend(!0,[],this.model.get("tenants")),s=this.user._id;this.cards={};var l=this.getSplitData(e);r=r.sort(function(t,e){return t.split?-1:1}).sort(function(t,e){return t._id===s?-1:e._id===s?1:void 0}),r=r.map(function(t){return t.split=l.data[t._id],t}),_.each(r,function(t){var e=new i(t);a.cards[e.id]=new n({data:e.toJSON(),amount:e.toJSON().split}),a.$el.find(".chart").append(a.cards[e.id].$el)});var o=l.data.Remaining?t.utils.prettyMoney(l.data.Remaining):0;this.$el.find(".remaining").html(o)},updateChart:function(e){var n=this.getSplitData(e),i=this.user._id;if(n){var a=t.utils.prettyMoney(n.data[i]),r=t.utils.prettyMoney(n.data.Remaining||0);this.$el.find(".remaining").html(r),this.cards[i].$el.find(".transfer-data li").html(a)}},validateSplit:function(e){var n=$(e.currentTarget).val(),i=t.utils.validateMoney(n);i?(e.stopPropagation(),t.controls.fieldError({element:$(e.currentTarget),type:"error",error:i})):this.updateChart(n)},constructData:function(){var e={split:this.$el.find(".amount").val(),autopay:this.$el.find("#autopay").is(":checked")};return t.schema.process(e,this.model)}})});
//# sourceMappingURL=ModalSplitView.js.map
