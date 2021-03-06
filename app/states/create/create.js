import {saveAs} from 'FileSaver';

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
                title:'Mekonen - The Journey of An African Jew',
                imageSrc:"/assets/images/states/create/Mekonen.jpg",
                thumbnail:"/assets/images/states/create/thumbnails/93657192-5beb-4933-a236-d9b17ee2cf92.jpg",
                editors:[
                    {
                        text:'<p style="text-align: center;"><span style="font-weight: 300; font-size: 26px;">Join the Israel JCC for a special Yom Ha\'atzmaut</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 26px;">screening of&nbsp;</span><span style="font-weight: 700; font-size: 26px;">Mekonen: the Journey of an African Jew:</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 16px;"> </span><span style="font-weight: 700; font-size: 20px;">DATE: </span><span style="font-weight: 300; font-size: 20px;">May 9, 2016</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">TIME:</span><span style="font-weight: 300; font-size: 20px;"> 8:00 PM </span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">LOCATION:</span><span style="font-weight: 300; font-size: 20px;"> 67 Independence Lane </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">RSVP:</span><span style="font-weight: 300; font-size: 20px;"> Binyamin N – Israeljcc@gmail.com</span><span style="font-weight: 300; font-size: 16px;"> </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span><span style="font-size: 16px; font-weight: 300;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 12px;">A new mini-documentary that follows the personal journey of Mekonen Abebe, a young African/Israeli Jewish soldier, as he returns to Africa to explore his roots, make peace with his past and embrace his future in Israel. mekonen.jerusalemu.org</span></p>',
                        posx:"63",
                        posy:"544",
                        width:"754",
                        height:""
                    }
                ]
            },
            {
                title:'Beneath the Helmet',
                imageSrc:"/assets/images/states/create/BTH-Template.jpg",
                thumbnail:"/assets/images/states/create/thumbnails/Benath_The_Helmet_Template.jpg",
                editors:[
                    {
                        text:'<p style="text-align: center;"><span style="font-weight: 300; font-size: 20px;">Join the Israel JCC for a special Yom Ha\'atzmaut&nbsp;</span><span style="font-size: 20px; font-weight: 300;">screening</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;"> </span><span style="font-weight: 700; font-size: 16px;">DATE: </span><span style="font-weight: 300; font-size: 16px;">May 9, 2016</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 700; font-size: 16px;">TIME:</span><span style="font-weight: 300; font-size: 16px;"> 8:00 PM </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 700; font-size: 16px;">LOCATION:</span><span style="font-weight: 300; font-size: 16px;"> 67 Independence Lane </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 700; font-size: 16px;">RSVP:</span><span style="font-weight: 300; font-size: 16px;"> Binyamin N – Israeljcc@gmail.com </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p>',
                        posx:"179",
                        posy:"753",
                        width:"554",
                        height:""
                    }
                ]
            },
            {
                title:'Crossing the Line 2',
                imageSrc:"/assets/images/states/create/CTL-Template.jpg",
                thumbnail:"/assets/images/states/create/thumbnails/CTL_inviteTemplate.jpg",
                editors:[
                    {
                        text:'<p style="text-align: center;"><span style="font-weight: 300; font-size: 30px;">Join the Israel JCC for a special Yom Ha\'atzmaut</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 30px;">screening of&nbsp;</span><span style="font-weight: 700; font-size: 30px; font-style: italic;">Crossing the Line 2</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 16px;"> </span><span style="font-weight: 700; font-size: 20px;">DATE: </span><span style="font-weight: 300; font-size: 20px;">May 9, 2016</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">TIME:</span><span style="font-weight: 300; font-size: 20px;"> 8:00 PM </span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">LOCATION:</span><span style="font-weight: 300; font-size: 20px;"> 67 Independence Lane </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">RSVP:</span><span style="font-weight: 300; font-size: 20px;"> Binyamin N – Israeljcc@gmail.com</span><span style="font-weight: 300; font-size: 16px;"> </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">​</span><span style="font-size: 16px; font-weight: 300;">​</span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 16px;">A new documentary that reveals the rise of anti-Israel activity and anti-Semitic rhetoric on North American university campuses.</span></p>',
                        posx:"119",
                        posy:"490",
                        width:"673",
                        height:""
                    }
                ]
            },
            {
                title:'Israel Inside',
                imageSrc:"/assets/images/states/create/Israel-Inside-Template.jpg",
                thumbnail:"/assets/images/states/create/thumbnails/Israel_Inside_Template.jpg",
                editors:[
                    {
                        text:'<span style="font-weight: 300; font-size: 22px;">Join YOUR COMPANY NAME for a screening of a</span>',
                        posx:"122",
                        posy:"-35",
                        width:"654",
                        height:""
                    },
                    {
                        text:'<p style="text-align: left;"><span style="font-weight: 300; font-size: 16px;"> </span><span style="font-weight: 700; font-size: 20px;">DATE: </span><span style="font-weight: 300; font-size: 20px;">May 9, 2016</span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">TIME:</span><span style="font-weight: 300; font-size: 20px;"> 8:00 PM </span></p><p style="text-align: left;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">LOCATION:</span><span style="font-weight: 300; font-size: 20px;"> 67 Independence Lane </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 20px;">​</span></p><p style="text-align: left;"><span style="font-weight: 700; font-size: 20px;">RSVP:</span><span style="font-weight: 300; font-size: 20px;"> Binyamin N – Israeljcc@gmail.com </span></p><p style="text-align: center;"><span style="font-weight: 300; font-size: 20px;">​</span></p>',
                        posx:"400",
                        posy:"680",
                        width:"400",
                        height:""
                    }
                ]
            },
        ];


        this.stateActive = 'upload-image';

        // this.stateActive = 'insert-text';
        // this.currentTemplate = this.templates[3];

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

        ga('send', 'event', 'flyer', 'choose', 'template', this.currentTemplate.title);

        this.stateActive = 'insert-text';
    }

    setStateExport(){
        if(this.currentTemplate==null){
            return;
        }

        let scaleBy = 5;

        let dom = document.getElementById('canvas');
        let canvas = document.createElement('canvas');
        let w = dom.offsetWidth;
        let h = dom.offsetHeight;

        canvas.width = w * scaleBy;
        canvas.height = h * scaleBy;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        var context = canvas.getContext('2d');
        context.scale(scaleBy, scaleBy);

        html2canvas(dom, {
            canvas:canvas,
            onrendered: (canvas) => {
                this.flierDataUrl = canvas.toDataURL('image/jpg');
                this.canvas = canvas;
                this.stateActive = 'export';
                this.$scope.$apply();
            }
        });

//         let dom = document.getElementById('canvas');
//         let DOMString = this.htmlToString(dom,false);
//         let html;
//         var doc = document.implementation.createHTMLDocument("");
//         doc.write(DOMString);
//         doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);
//
// // Get well-formed markup
//         html = (new XMLSerializer).serializeToString(doc);
//         console.log(html);
//
//         var data = '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700">' +
//             '<foreignObject width="100%" height="100%">' +
//             html +
//             '</foreignObject>' +
//             '</svg>';
//
//         let DOMURL = window.URL || window.webkitURL || window;
//
//
//
//
//         let img = new Image();
//         let svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
//         let url = DOMURL.createObjectURL(svg);
//         let canvas = document.getElementById('canvas1');
//         let ctx = canvas.getContext('2d');
//
//
//
//         img.onload = ()=>{
//             ctx.drawImage(img, 0, 0);
//             this.flierDataUrl = canvas.toDataURL('image/png',1.0);
//             DOMURL.revokeObjectURL(url);
//         };
//
//         img.src = url;
//         console.log(img.src);

    }

    htmlToString(who, deep){
        if(!who || !who.tagName) return '';
        var txt, ax, el= document.createElement("div");
        var clone = who.cloneNode(true);
        //clone.removeAttribute("ng-class");
        //clone.removeAttribute("id");
        el.appendChild(clone);
        txt= el.innerHTML;
        if(deep){
            ax= txt.indexOf('>')+1;
            txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
        }
        el= null;
        return txt;
    }

    print(){
        // var html  = "<html><head>" +
        //     "</head>" +
        //     "<body  style ='-webkit-print-color-adjust:exact;'>"+
        //     "<img src=\"" + this.flierDataUrl + "\" onload=\"javascript:window.print();\"/>" +
        //     "</body>";
        //     var win = window.open("about:blank","_blank");
        //     win.document.write(html);
        let printPdf = function (url) {
            let iframe  = document.createElement('iframe');
                document.body.appendChild(iframe);

                iframe.style.display = 'none';
                iframe.onload = function() {
                    setTimeout(function() {
                        iframe.focus();
                        iframe.contentWindow.print();
                    }, 1);
                };

            iframe.src = url;
        };

        var doc = new jsPDF("p", "px", "a4");
        doc.addImage(this.canvas.toDataURL('image/jpg') , 'JPEG', 0, 0);
        let blob = doc.output('blob');
        let url = URL.createObjectURL(blob);
        printPdf(url);


     }

    getFlayerFileName(){
        return this.currentTemplate.title.split(" ").join("_");
    }

    download(){
        this.canvas.toBlob((blob)=>{
            let filename = this.getFlayerFileName();
            saveAs(blob, filename);
            ga('send', 'event', 'flyer', 'save', 'template', this.currentTemplate.title);
        });

        // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        // saveAs(blob, "hello world.txt");
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


