
export class CreateController {

    // @ngInject
    constructor($log, $state) {
        
        this.images = [
            'assets/images/states/create/BTH_Poster.jpg',
            'assets/images/states/create/93657192-5beb-4933-a236-d9b17ee2cf92.jpg'
        ];

        this.backgroundImageFlier = null;

        this.stateActive = 'upload-image';


    }

    checkStateInsertTextIsActive(){
        return this.stateActive == 'insert-text' || this.stateActive == 'export';
    }

    checkStateExportIsActive(){
        return this.stateActive == 'export';
    }

    setStateUploadYouImage(){
        this.stateActive = 'upload-image';
    }

    setStateInsertYourText(imageSrc){


        if(imageSrc){
            this.backgroundImageFlier = imageSrc;
        }

        if(this.backgroundImageFlier==null){
            return;
        }

        this.stateActive = 'insert-text';
    }

    setStateExport(){
        if(this.backgroundImageFlier==null){
            return;
        }
        this.stateActive = 'export';
    }

    genPDF(){



        var doc = new jsPDF();

        var specialElementHandlers = {
            '#hidediv' : function(element,render) {return true;}
        };

        doc.fromHTML(document.getElementById('canvas'), 20,20,{
            'width':500,
            'elementHandlers': specialElementHandlers
        });

        doc.save('Test.pdf');

    }



}

