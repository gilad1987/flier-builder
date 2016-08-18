/* globals __dirname */

import angular from 'angular';

import '../node_modules/font-awesome/scss/font-awesome.scss';
import 'assets/stylesheets/application.scss';
import 'assets/javascripts/html2canvas/build/html2canvas.js';
import 'assets/javascripts/GtEditorComponents/closest.polyfill.js';

import Models     from 'models/models';
import Services   from 'services/services';
import Directives from 'directives/directives';
import Components from 'components/components';
import Filters    from 'filters/filters';
import Config     from 'config/config';
import Routes     from 'config/routes/routes';
import States     from 'states/states';

// Import all html files to put them in $templateCache
// If you need to use lazy loading, you will probably need
// to remove these two lines and explicitly require htmls
const templates = require.context(__dirname, true, /\.html$/);
const images = require.context(__dirname+'/assets/images', true, /\.(jpg|png)/);
const svgs = require.context(__dirname+'/assets/svgs/', true, /\.(svg)/);

templates.keys().forEach(templates);

angular.module('FlierBuilder', [
  Models.name,
  Services.name,
  Directives.name,
  Components.name,
  Filters.name,
  Config.name,
  Routes.name,
  States.name,
]);

angular.element(document).ready(() =>
  angular.bootstrap(document, ['FlierBuilder'], {
    strictDi: true
  }));
