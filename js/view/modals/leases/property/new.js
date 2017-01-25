/**
 * modals/leases/property/new.js
 */

define([
  'app',
  'view/components/autocomplete',
  'model/properties/PropertyModel',
  'collection/account/FundingSourcesCollection',
  'text!templates/modals/leases/property/new.html'
],
function(app, AutoCompleteView, PropertyModel, FundingSourcesCollection, StepTemplate) {

  return Backbone.View.extend({

    events: {
      'keyup .address-selector': 'handleChange',
      'change input[name="pay_into_target"]': 'updatePayInto',
      'click .action-toggle': 'toggleModelType'
    },

    template: _.template(StepTemplate),

    initialize: function(_options) {
      if (_options) _.extend(this, _options);

      var self = this;

      this.model = new PropertyModel();

      this.collection = new FundingSourcesCollection();

      Backbone.Validation.bind(this);

      this.collection.fetch().then(function() {
        self.render();
        self.parentView.unlock();
      });

      this.parentView.lock();
      this.render();

      this.on('autocomplete--selection', this.placeChange, this);

      return this;
    },

    placeChange: function() {
      // console.log(this.autocomplete.place)
      this.place_data = this.autocomplete.place;
    },

    // attachEvents: function() {
    //   if (this.listening) return;
    //   this.on('autocomplete--selection'),
    // },

    render: function() {
      console.log('render()')
      // this.on('next', this.next, this);

      this.$el.html(this.template({
        property: this.parentView.parentView.data.property,
        funding_sources: this.collection.toJSON()
      }));

      this.autocomplete = new AutoCompleteView({
        input: this.$el.find('.address-selector'),
        context: this,
        overflowEscape: true
      });

      this.updatePayInto();

      return this;
    },

    handleChange: function(e) {
      var query = $(e.currentTarget).val();

      console.log('handleChange')
      this.place_data = {}

      if (e.which && e.which === 27) e.preventDefault(); // esc dont close modal

      this.autocomplete.search(query);
      this.autocomplete.keyControl(e);
    },

    updatePayInto: function(e) {
      var value = this.$el.find('input[name="pay_into_target"]:checked').val();
      var $dropdown = this.$el.find('.pay-into .dropdown');
      var $select = $dropdown.children('select');
      var isTrue = value === 'true';

      var action = isTrue ? 'show' : 'hide';
      $dropdown[action]();

      $select.attr('disabled', !isTrue);
    },

    toggleModelType: function() {
      this.parentView.toggleModelType();
    },

    constructData: function() {
      var data = this.$el.find('form').serializeObject();
      
      if (data['pay_into_target'] === 'false') data.dwolla = { funding_source: null };

      data.address = this.place_data.address;
      data.city = this.place_data.city;
      data.state = this.place_data.state;
      data.zip = this.place_data.zip;
      data.country = this.place_data.country;
      data.place_id = this.place_data.place_id;

      delete data['pay_into_target'];

      // console.log(app.schema.process(data, this.model));

      return app.schema.process(data, this.model);
    },

    validate: function() {
      var data = this.constructData();

      console.log(data);

      var validate = app.utils.validate(this, data);

      console.log(validate)

      if (!validate) {
        console.warn('didnt validate')
        return false;
      }

      console.log('passed validation')

      return data;
    },

    next: function() {
      var data = this.validate();

      if (!data) return;

      this.parentView.setData(data);
    }
    
    
  });
});