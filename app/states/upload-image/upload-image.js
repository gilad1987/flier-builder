export class UploadImageController {

  // @ngInject
  constructor($log) {
    this.message = 'Hello from UploadImageController';
    this.$log = $log;
  }

  chooseImage(parentController){
    parentController.setImage('src');
  }
}
