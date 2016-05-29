class gtTextEditorController {

  // @ngInject
  constructor($element, $document, $window, Selection ,$scope) {
    this.$window = $window;
    this.$document = $document;
    this.isBold = false;
    this.isItalic = false;
    this.range = null;
    this.$scope = $scope;
    this.contentElement = $element[0].querySelector('.content');
    this.selection = null;
    this.waitToChange=true;
    this.lastIsBrElement=false;
    this.brElementReference = null;
    this.cbBeforeKeydown = [];
    this.restoreRangeBeforeWrite = false;
    this.brCounter = 0;
    this.spanCounter = 0;
  }

  getAllStyleIsOn(){

    let className = '';

    if(this.isBold){
      className += ' bold';
    }

    if(this.isUnderscore){
      className += ' underscore';
    }

    if(this.isItalic){
      className += ' italic';
    }

    return className.substring(1);
  }

  updateStyleInRange(){

    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;

    let nextElement = r.startContainer;
    console.log(nextElement);
    while ((nextElement = nextElement.nextSibling) != ec.parentNode){
        console.log(nextElement);
    }
    console.log(nextElement);
  }

  applyStyle(condition,style){

    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let className;


    if(condition && sc.parentNode.classList.contains(style)){
      //console.log('already is :'+style);
      return;
    }

    if(r.endOffset - r.startOffset == 0){

      if(condition){

        if(typeof sc.length == 'undefined' || sc.length==1 && sc.data == '' && sc.parentNode.classList.contains(style) == false){
          //console.log('add class - '+style+' - to container');
          sc.classList.add(style);
        }

        if(sc.length == r.endOffset && sc.parentNode.classList.contains(style) == false){
          className = this.getAllStyleIsOn();
          this.insertTextAtCursor(className,'',sc.parentNode);
          //console.log('add span - '+ className);
        }

        if(r.startOffset < sc.length &&  sc.parentNode.classList.contains(style)==false){
          let startText = sc.nodeValue.toString().substr(0,r.startOffset);
          let endText = sc.nodeValue.toString().substr(r.endOffset,sc.length);
          let saveRange = this.saveSelection();
          let leftRange = this.insertTextAtCursor(sc.parentNode.className,endText,sc.parentNode,true);
          sc.nodeValue = startText;
          this.restoreSelection(saveRange);
          className = this.getAllStyleIsOn();
          let rightRange = this.insertTextAtCursor(className,'',sc.parentNode,false);
          this.waitToChange = false;
        }

      }else{

        if(sc.parentNode.classList.contains(style) == true && r.endOffset == sc.length ){  //|| r.endOffset == sc.length-1
          className = this.getAllStyleIsOn();
          this.insertTextAtCursor(className,'',sc.parentNode);
        }

        if(r.startOffset < sc.length &&  sc.parentNode.classList.contains(style)){
          let startText = sc.nodeValue.toString().substr(0,r.startOffset);
          let endText = sc.nodeValue.toString().substr(r.endOffset,sc.length);
          let saveRange = this.saveSelection();
          let leftRange = this.insertTextAtCursor(sc.parentNode.className,endText,sc.parentNode,true);
          sc.nodeValue = startText;
          this.restoreSelection(saveRange);
          className = this.getAllStyleIsOn();
          let rightRange = this.insertTextAtCursor(className,'',sc.parentNode,false);
          this.waitToChange = false;
        }

      }

    }
  }

  $postLink(){
    this.$document[0].addEventListener('selectionchange', this.cb.bind(this));

    this.contentElement.addEventListener('keydown',(event) => {

      console.log('keydown');
      this.waitToChange = true;

      /**
       * 40 arrow bottom
       * 38 arrow top
       * 37 arrow left
       * 39 arrow right
       */
      if(event.keyCode==40 || event.keyCode==38 || event.keyCode==37 || event.keyCode==39){
        this.waitToChange = false;
        return;
      }

      // Enter key
      if(event.keyCode == 13){

        let s = window.getSelection();
        let r = s.getRangeAt(0);
        let sc = r.startContainer;
        let ec = r.endContainer;
        let br = document.createElement('br');
        let span = document.createElement('span');
        span.appendChild(br);

        span.id = ++this.brCounter;
        span.className = 'br';

        let saveRange = this.saveSelection();
        if(sc.parentNode.nodeName=='SPAN' && r.startOffset!=0 ){ //this.lastIsBrElement==false
          let startText = sc.nodeValue.toString().substr(0,r.startOffset);
          let endText = sc.nodeValue.toString().substr(r.endOffset,sc.length);
          let rightRange = this.insertTextAtCursor(sc.parentNode.className,endText,sc.parentNode,true);
          sc.nodeValue = startText;
          this.restoreSelection(saveRange);
          saveRange.setStart(sc.parentNode.nextSibling,0);
          sc.parentNode.parentNode.insertBefore(span,sc.parentNode.nextSibling);
          s.removeAllRanges();
          r = saveRange.cloneRange();
          s.addRange(r);
        }else{

          //sc.parentNode.insertBefore(brElement,this.brElementReference.nextSibling);
          //sc.parentNode.insertBefore(textNode,brElement);
          s.removeAllRanges();
          r = saveRange.cloneRange();
          //r.setStart(this.brElementReference,0);
          if(this.brElementReference){
            r.setStartAfter(this.brElementReference);
            r.insertNode(span);
          }else{
            //r = this.saveSelection();
            //this.restoreSelection(r);
            //r = saveRange.cloneRange();

            if(sc.nodeName=='SPAN'){
              r.insertNode(span);
              r.setStartAfter(sc);
            }else{
              r.insertNode(span);
              r.setStartAfter(span);
            }

          }

          s.addRange(r);
        }


        this.lastIsBrElement=true;
        this.brElementReference=span;
        this.waitToChange = false;
        event.preventDefault();
        return false;
      }

      this.checkTextIsWithoutSpanWrapper(event.keyCode);
      this.applyStyle(this.isBold,'bold');
      this.applyStyle(this.isItalic,'italic');
      this.applyStyle(this.isUnderscore,'underscore');

      this.lastIsBrElement=false;
      this.brElementReference=null;
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


  checkTextIsWithoutSpanWrapper(eventKeyCode){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let parent = sc;

    if((r.startOffset==0 && sc.length!=0) || sc.firstChild && sc.firstChild.nodeName =='BR' || (sc && sc.nodeName == '#text' && sc.parentNode.nodeName != 'SPAN') ){ //

      // when select text and press any key
      if(sc.nodeName=='#text'){
        parent = sc.parentNode;
      }
      let className = this.getAllStyleIsOn();
      //if(this.restoreRangeBeforeWrite){
        r = this.saveSelection();
        this.restoreSelection(r);
      //  this.restoreRangeBeforeWrite=false;
        this.lastIsBrElement=false;
        this.brElementReference=null;
      //}
      console.log(parent);
      this.insertTextAtCursor(className,'',parent,false);
    }
  }

  toggleUnderscore(){
    this.isUnderscore = !this.isUnderscore;
    let r = this.saveSelection();
    this.restoreSelection(r);
    this.waitToChange = true;
  }

  toggleBold(){
    this.isBold = !this.isBold;
    let r = this.saveSelection();
    this.restoreSelection(r,false);
    this.waitToChange = true;
  }

  toggleItalic(){
    this.isItalic = !this.isItalic;
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
    let classNameIsOn = this.getAllStyleIsOn().split(' ');

    if(r.endContainer.previousSibling){
      //console.log(r.endContainer.previousSibling.nodeName =='#text');
      //console.log(r.endContainer.firstChild.nodeName=='BR');
    }
    if(r.endContainer.previousSibling && r.endContainer.previousSibling.nodeName=='#text' || r.endContainer.firstChild && r.endContainer.firstChild.nodeName=='BR'){
      this.lastIsBrElement=false;
      this.brElementReference=null;
    }

    //console.log(wrapper);

    if(this.waitToChange || r.endContainer.parentNode.nodeName != 'SPAN'){
      return;
    }

    let i=0;
    let wrapperClassName = wrapper.className;
    let runApply=false;

    if(this.isBold && wrapperClassName.indexOf('bold') == -1 || this.isBold==false && wrapperClassName.indexOf('bold') > -1){
      this.isBold = wrapperClassName.indexOf('bold') > -1;
      runApply=true;
    }

    if(this.isUnderscore && wrapperClassName.indexOf('underscore') == -1 || this.isUnderscore==false && wrapperClassName.indexOf('underscore') > -1){
      this.isUnderscore = wrapperClassName.indexOf('underscore') > -1;
      runApply=true;
    }

    if(this.isItalic && wrapperClassName.indexOf('italic') == -1 || this.isItalic==false && wrapperClassName.indexOf('italic') > -1){
      this.isItalic = wrapperClassName.indexOf('italic') > -1;
      runApply=true;
    }


    if(runApply){
      this.$scope.$apply();
//console.log('$apply');
    }
  }




  insertAfter(newElement,targetElement) {
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


  insertTextAtCursor(className,text,afterNode, deleteContent) {
    let sel, range, _deleteContent ;

    _deleteContent = typeof deleteContent != 'undefined' ? deleteContent : true;

    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {

      range = sel.getRangeAt(0);

      if(_deleteContent)
        range.deleteContents();

      var textNode = document.createElement('span');
      textNode.className = className;
      textNode.id = ++this.spanCounter;
      textNode.innerHTML = text ? text :'\u200B';

      if(afterNode){
        if(afterNode.nextSibling==null || afterNode.nextSibling.nodeName=='SPAN'){
          var newElement = document.createTextNode('');
          this.insertAfter(newElement,afterNode);
        }

        if(afterNode.firstChild && afterNode.firstChild.nodeName=='BR'){
          range.setStartBefore(afterNode);
          console.log('setStartBefore');
        }else{
          range.setStartAfter(afterNode.nextSibling);
          console.log('setStartAfter');
        }

        range.insertNode(textNode);

      }else{
        range.insertNode(textNode);
        range.setStart(textNode,0);
        range.setEnd(textNode,0);
      }

      if(textNode.previousElementSibling && textNode.previousElementSibling.nextSibling && textNode.previousElementSibling.nextSibling.nodeName=='#text'){
        textNode.previousElementSibling.nextSibling.remove();
      }


      sel.removeAllRanges();
      range = range.cloneRange();
      sel.addRange(range);

    }

    return range;

  }

  restoreSelection(range,deleteContent) {
  if (range) {
    deleteContent = typeof deleteContent == 'undefined' ? false : deleteContent;
    if (window.getSelection) {
      let sel = window.getSelection();

      if(deleteContent){
        range.deleteContents();
      }
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
