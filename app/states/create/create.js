
export class CreateController {

    // @ngInject
    constructor($log, $state, $scope) {
        
        this.images = [
            'assets/images/states/create/BTH_Poster.jpg',
            'assets/images/states/create/93657192-5beb-4933-a236-d9b17ee2cf92.jpg',
            'assets/images/states/create/harav.jpg'

        ];

        this.$scope = $scope;
        this.currentTemplate = null;
        this.flierDataUrl = null;
        this.canvas = null;

        this.templates = [


            {
                imageSrc:"assets/images/states/create/93657192-5beb-4933-a236-d9b17ee2cf92.jpg",
                editors:[
                    {
                        text:'<p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">Join the Israel JCC for a special Yom Ha\'atzmaut</span><span style="font-weight: 300; font-size: 16px;"> </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">screening of</span><span style="font-weight: 300; font-size: 16px;"> </span><span style="font-weight: 700; font-size: 16px;">Mekonen: the Journey of an African Jew:</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 16px;"> </span><span style="font-weight: 700; font-size: 16px;">DATE: </span><span style="font-weight: 300; font-size: 16px;">May 9, 2016</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 16px;">TIME:</span><span style="font-weight: 300; font-size: 16px;"> 8:00 PM </span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 16px;">LOCATION:</span><span style="font-weight: 300; font-size: 16px;"> 67 Independence Lane </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 16px;">RSVP:</span><span style="font-weight: 300; font-size: 16px;"> Binyamin N – Israeljcc@gmail.com </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 12px;">A new mini-documentary that follows the personal journey of Mekonen Abebe, a young African/Israeli Jewish soldier, as he returns to Africa to explore his roots, make peace with his past and embrace his future in Israel. mekonen.jerusalemu.org</span></p>',
                        posx:"80",
                        posy:"358",
                        width:"523",
                        height:""
                    }
                ]
            }
        ];


        this.stateActive = 'upload-image';

        // this.stateActive = 'insert-text';
        // this.currentTemplate = this.templates[0];

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

    setStateInsertYourText(template){


        if(template){
            this.currentTemplate = template;
        }

        if(this.currentTemplate==null){
            return;
        }

        this.stateActive = 'insert-text';
    }

    setStateExport(){
        if(this.currentTemplate==null){
            return;
        }

        html2canvas(document.getElementById('canvas'), {
            onrendered: (canvas) => {
                this.flierDataUrl = canvas.toDataURL('image/jpeg');
                this.canvas = canvas;
                this.stateActive = 'export';
                this.$scope.$apply();
            }
        });


    }
    
    print(){
        var html  = "<html><head>" +
            "</head>" +
            "<body  style ='-webkit-print-color-adjust:exact;'>"+
            "<img src=\"" + this.flierDataUrl + "\" onload=\"javascript:window.print();\"/>" +
            "</body>";
            var win = window.open("about:blank","_blank");
            win.document.write(html);
     }

}



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

