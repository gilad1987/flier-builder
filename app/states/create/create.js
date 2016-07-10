
export class CreateController {

    // @ngInject
    constructor($log, $state) {
        
        this.images = [
            'assets/images/states/create/BTH_Poster.jpg',
            'assets/images/states/create/93657192-5beb-4933-a236-d9b17ee2cf92.jpg',
            'assets/images/states/create/harav.jpg'

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

        let element = document.getElementById('canvas');

        html2canvas(document.getElementById('canvas'), {
            onrendered: function(canvas) {
                document.getElementById('imageByHtml').src = canvas.toDataURL('image/jpeg');
            }
        });

        // function convertImgToDataURLviaCanvas(url, callback, outputFormat){
        //     var img = new Image();
        //     img.crossOrigin = 'Anonymous';
        //     img.onload = function(){
        //         var canvas = document.createElement('CANVAS');
        //         var ctx = canvas.getContext('2d');
        //         var dataURL;
        //         canvas.height = this.height;
        //         canvas.width = this.width;
        //         ctx.drawImage(this, 0, 0);
        //         dataURL = canvas.toDataURL(outputFormat);
        //         callback(dataURL);
        //         canvas = null;
        //     };
        //     img.src = url;
        // }
        //
        // convertImgToDataURLviaCanvas(element.getElementsByTagName('img')[0].src, function(base64){
        //     let image = element.getElementsByTagName('img')[0].src;
        //     var pdf = new jsPDF("p", "px", "a4");
        //     let wordwrappers = element.getElementsByClassName('wordwrapper');
        //     let i=0;
        //
        //     pdf.addImage(base64 , 'JPEG', 0, 0,image.width, image.height);
        //
        //     function findPos(obj) {
        //         var curleft,curtop;
        //         curleft = curtop = 0;
        //         if (obj.offsetParent) {
        //             do {
        //                 curleft += obj.offsetLeft;
        //                 curtop += obj.offsetTop;
        //             } while (obj = obj.offsetParent);
        //         }
        //
        //         return [curleft,curtop];
        //     }
        //     for(;i<wordwrappers.length; i++){
        //         let currentElement = wordwrappers[i];
        //
        //         let pos = findPos(currentElement);
        //         let text = currentElement.innerText;
        //         let y=pos[1];
        //         let x=pos[0];
        //
        //         pdf.text(text,x/1.7765,y/1.7765);
        //         console.log(x/1.7765+' - '+y/1.7765+' - '+text);
        //         let a=1;
        //         a=4;
        //     }
        //     pdf.save('TestHTMLDoc.pdf');
        // },'image/jpeg');



    }



}

