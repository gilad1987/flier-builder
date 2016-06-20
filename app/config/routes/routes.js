import { exportRoutes } from './export';
import { insertYourTextRoutes } from './insert-your-text';
import { uploadImageRoutes } from './upload-image';
import { createRoutes } from './create';
import angular from 'angular';
import 'angular-ui-router';

import { homeRoutes } from 'config/routes/home';
import { staticRoutes } from 'config/routes/static';

const defaultRoute = /* @ngInject */ ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/404');
};

export default angular.module('FlierBuilder.routes', ['ui.router'])
  .config(exportRoutes)
  .config(insertYourTextRoutes)
  .config(uploadImageRoutes)
  .config(createRoutes)
  .config(defaultRoute)
  .config(homeRoutes)
  .config(staticRoutes);
