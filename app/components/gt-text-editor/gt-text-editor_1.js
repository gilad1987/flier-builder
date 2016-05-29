class gtTextEditorController {

  // @ngInject
  constructor($element, $document, $window, Selection ,$scope) {
    this.$window = $window;
    this.$document = $document;
    this.isBold = false;
    this.isTalic = false;
    this.range = null;
    this.$scope = $scope;
    this.contentElement = $element[0].querySelector('.content');
    this.selection = null;
    this.waitToChange=true;
    this.cbBeforeKeydown = [];
  }

  $postLink(){
    this.$document[0].addEventListener('selectionchange', this.cb.bind(this));

    this.contentElement.addEventListener('keydown',(event) => {

      this.waitToChange = true;

      if(event.keyCode==37 || event.keyCode==39){
        this.waitToChange = false;
        return;
      }

      //let r = this.saveSelection();
      //this.restoreSelection(r);

      let s = window.getSelection();
      let r = s.getRangeAt(0);
      let sc = r.startContainer;
      let ec = r.endContainer;

      if(this.isBold && sc.parentNode.classList.contains('bold')){
        console.log('already is bold');
      }

      if(r.endOffset - r.startOffset == 0){

        if(this.isBold){
          if(typeof sc.length == 'undefined' || sc.length==1 && sc.data == '' && sc.parentNode.classList.contains('bold') == false){
            console.log('add class bold to container');
            sc.classList.add('bold');
          }

          if(sc.length == r.endOffset && sc.parentNode.classList.contains('bold') == false){
            console.log('add span bold');
            this.insertTextAtCursor('bold','',sc.parentNode);
          }



          if(r.startOffset < sc.length &&  sc.parentNode.classList.contains('bold')==false){

//debugger;

            let startText = sc.nodeValue.toString().substr(0,r.startOffset);
            let endText = sc.nodeValue.toString().substr(r.endOffset,sc.length);
            let saveRange = this.saveSelection();
            let leftRange = this.insertTextAtCursor('',endText,sc.parentNode,true);
            sc.nodeValue = startText;
            this.restoreSelection(saveRange);
            let rightRange = this.insertTextAtCursor('bold','',sc.parentNode,false);

            this.waitToChange = false;

            console.log('saparete without BOLD');
          }

        }else{

          if(sc.parentNode.classList.contains('bold') == true && r.endOffset == sc.length || r.endOffset == sc.length-1){
            console.log('add span ');
            this.insertTextAtCursor('','',sc.parentNode);
          }

          if(r.startOffset < sc.length &&  sc.parentNode.classList.contains('bold')){

//debugger;

            let startText = sc.nodeValue.toString().substr(0,r.startOffset);
            let endText = sc.nodeValue.toString().substr(r.endOffset,sc.length);
            let saveRange = this.saveSelection();
            let leftRange = this.insertTextAtCursor('bold',endText,sc.parentNode,true);
            sc.nodeValue = startText;
            this.restoreSelection(saveRange);
            let rightRange = this.insertTextAtCursor('','',sc.parentNode,false);

            this.waitToChange = false;

            console.log('saparete with BOLD');
          }

        }

      }else{

      }

        this.waitToChange = false;
    });

    this.init();
  }

  init(){
    if(!this.contentElement.childNodes.length){
      //console.log('init');
      this.contentElement.focus();
      this.insertTextAtCursor('');
    }
  }

  $onDestroy(){

  }

  toggleBold(){
    this.isBold = !this.isBold;
    let r = this.saveSelection();
    this.restoreSelection(r);
    this.waitToChange = true;
  }

  setSelection(){
    this.selection = window.getSelection();
  }

  setRange(){
    this.setSelection();
    this.range = this.selection.getRangeAt(0);
  }


  cb(event){
    //console.log('cb');
    this.setRange();
    let r = this.range;
    let wrapper = r.endContainer.parentNode;
    if(this.waitToChange || r.endContainer.parentNode.nodeName != 'SPAN'){
      return;
    }
    if(this.isBold && wrapper.classList.contains('bold') || !this.isBold && !wrapper.classList.contains('bold')){
      return;
    }

    this.isBold = wrapper.classList.contains('bold');
    console.log('$digest');
    this.$scope.$digest();
  }


  toggleUnderscore(){
    this.isUnderscore = !this.isUnderscore;
    let r = this.saveSelection();
    this.restoreSelection(r);
    this.waitToChange = true;
  }



  insertTextAtCursor(className,text,afterNode, deleteContent) {
    //console.table([
    //  {'className':className},
    //  {'text':text},
    //  {'deleteContent':deleteContent},
    //]);

    function insertAfter(newElement,targetElement) {
      //target is what you want it to go after. Look for this elements parent.
      var parent = targetElement.parentNode;

      //if the parents lastchild is the targetElement...
      if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
      } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
      }
    }

  let sel, range, _deleteContent ;

    _deleteContent = typeof deleteContent != 'undefined' ? deleteContent : true;

  if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {

        range = sel.getRangeAt(0);

        if(_deleteContent)
          range.deleteContents();

        var textNode = document.createElement('span');
        textNode.className = className;
        textNode.innerHTML = text ? text :'\u200B';




        if(afterNode){
          if(afterNode.nextSibling==null || afterNode.nextSibling.nodeName=='SPAN'){
            var newElement = document.createTextNode('');
            insertAfter(newElement,afterNode);
          }

          range.setStartAfter(afterNode.nextSibling);
          range.insertNode(textNode);

        }else{
          range.insertNode(textNode);
          range.setStart(textNode,0);
          range.setEnd(textNode,0);
        }

        sel.removeAllRanges();
        range = range.cloneRange();
        sel.addRange(range);

      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      range.pasteHTML(text);
      range.select();
    }


    return range;
  }

  restoreSelection(range) {
  if (range) {
    if (window.getSelection) {
      let sel = window.getSelection();
      range.deleteContents();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.selection && range.select) {
      range.select();
    }
  }
}

  saveSelection() {
  if (window.getSelection) {
    let sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
    return null;
  }
}

export const gtTextEditor = {
  bindings: {},
  templateUrl: '/components/gt-text-editor/gt-text-editor.html',
  controller: gtTextEditorController,
  controllerAs: 'gtTextEditor'
};
