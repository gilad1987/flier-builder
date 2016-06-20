import { gtEditorContent } from './gt-editor-content/gt-editor-content';
import { gtEditor } from './gt-editor/gt-editor';
import { gtToolbar } from './gt-toolbar/gt-toolbar';
import angular from 'angular';

export default angular.module('FlierBuilder.components', [])
  .component('gtToolbar', gtToolbar)
  .component('gtEditor', gtEditor)
  .component('gtEditorContent', gtEditorContent);
