import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: '/'
});

Router.map(function () {
  this.route('login');
});

export default Router;