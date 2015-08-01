define('semantic-ui-ember/mixins/modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    actions: {
      openModal: function(name, model, properties) {
        var container,
            controller,
            key,
            prop,
            result,
            view,
            viewName;

        try {
          container = this.get('container');
          try {
            controller = this.controllerFor(name);
          } catch (e) {
            controller = Em.generateController(container, name, model);
          }

          controller.set('model', model);
          if ($.isPlainObject(properties)) {
            for (key in properties) {
              prop = properties[key];
              controller.set(key, prop);
            }
          }

          view = container.lookup('view:' + name);
          if (view) {
            viewName = name;
          } else {
            viewName = 'ui-modal';
          }

          return result = this.render(name, {
            into: 'application',
            outlet: 'modal',
            controller: controller,
            view: viewName
          });
        } catch (e) {
          return Ember['default'].Logger.log(e);
        }
      },

      closeModal: function() {
        return this.disconnectOutlet({
          outlet: 'modal',
          parentView: 'application'
        });
      }
    }
  });

});