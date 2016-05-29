import { createRoutes } from './create';
import angular from 'angular';
import 'angular-ui-router';

import { homeRoutes } from 'config/routes/home';
import { staticRoutes } from 'config/routes/static';

const defaultRoute = /* @ngInject */ ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/404');
};

export default angular.module('FlierBuilder.routes', ['ui.router'])
  .config(createRoutes)
  .config(defaultRoute)
  .config(homeRoutes)
  .config(staticRoutes);
