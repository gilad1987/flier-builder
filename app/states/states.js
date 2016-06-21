import { CreateController } from './create/create';
import angular            from 'angular';
import { HomeController } from 'states/home/home';

export default angular.module('FlierBuilder.controllers', [])
  .controller('HomeController', HomeController)
  .controller('CreateController', CreateController);
