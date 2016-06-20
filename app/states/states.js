import { ExportController } from './export/export';
import { InsertYourTextController } from './insert-your-text/insert-your-text';
import { UploadImageController } from './upload-image/upload-image';
import { CreateController } from './create/create';
import angular            from 'angular';
import { HomeController } from 'states/home/home';

export default angular.module('FlierBuilder.controllers', [])
  .controller('HomeController', HomeController)
  .controller('CreateController', CreateController)
  .controller('UploadImageController', UploadImageController)
  .controller('InsertYourTextController', InsertYourTextController)
  .controller('ExportController', ExportController);
