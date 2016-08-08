import { gtFocus } from './gt-focus';
import angular from 'angular';
import { ifEnv } from 'directives/if-env';

export default angular.module('FlierBuilder.directives', [])
  .directive('ifEnv', ifEnv)
  .directive('gtFocus', gtFocus);
