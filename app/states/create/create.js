// import { GtState } from '../../assets/javascripts/GtEditorComponents/GtState';
export class CreateController {
    // @ngInject
    constructor($log) {
        this.states = ['upload_your_image','insert_your_text','export'];
        this.stateActive = 'upload_your_image';
        this.breadCrumbsActive = ['upload_your_image'];
    }

    chooseImage(){
        this.image = 'a';
    }

    setStateUploadYouImage(){
        
    }

    setStateInsertYourText(){

    }

    setStateExport(){

    }

    setImage(image){
        
    }


}

