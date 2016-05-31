class gtTextEditorController {

  // @ngInject
  constructor($element, $document, $window, Selection ,$scope) {
    this.contentElement = $element[0].querySelector('.content');
    this.brCounter = 0;
    this.spanCounter = 0;
    this.waitToUpdateStyle = false;
  }

  createNewNode(nodeName, style,text){
    let node = document.createElement(nodeName);

    if(text){
      node.innerHTML = text;
    }

    return node;
  }

  createBR(nodeToStart){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let br = document.createElement('br');
    let span = this.createNewNode('span','br',"\u200B");

    span.className = 'br';
    span.id = ++this.brCounter;
    span.appendChild(br);
    s.removeAllRanges();

    r = r.cloneRange();
    r.deleteContents();
    r.insertNode(span);

    r.setStart(nodeToStart ? nodeToStart : span.firstChild,0);
    r.setEnd(nodeToStart ? nodeToStart : span.firstChild,0);

    s.addRange(r);
    return r;
  }

  prepareBeforeAddBR(setSelectionBefore){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let nodeToCheckIsBr = sc.nodeName == 'SPAN' ? sc : sc.parentNode;
    if(setSelectionBefore){
      this.setSelectionBefore(nodeToCheckIsBr);
    }else{
      this.setSelectionAfter(nodeToCheckIsBr);
    }

  }

  selectionIsInLine(r){
    let nodeToCheckIsBr = r.startContainer.nodeName == 'SPAN' ? r.startContainer : r.startContainer.parentNode;
    return this.hasClass(nodeToCheckIsBr,'line');
  }

  createNewTextWrapper(style,text){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let defaultText = text ? text : "\u200B";
    let span = this.createNewNode('span',style,defaultText);

    span.className = 'line';
    span.id = ++this.spanCounter;

    r.insertNode(span);
    r.setStart(span,0);
    r.setEnd(span,0);

    s.removeAllRanges();
    r = r.cloneRange();
    s.addRange(r);

    return r;
  }

  nodeHasBr(node){
    return this.hasClass(node,'br');
  }

  nodeHasLine(node){
    return node && this.hasClass(node,'line');
  }


  promiseSelectionInLineWrapper(style,text,deleteContent,setSelectionBefore,createNewLineIfSelectionInline){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let newLine;

    let selectionNode = r.startContainer.nodeName == 'SPAN' ? r.startContainer : r.startContainer.parentNode;
    setSelectionBefore  = typeof setSelectionBefore != 'undefined' ? setSelectionBefore : false;
    let createNewLine = !this.nodeHasLine(selectionNode) ||  createNewLineIfSelectionInline;

    if(!this.nodeHasLine(selectionNode)){
      if(this.nodeHasBr(selectionNode) && setSelectionBefore==false){
        this.setSelectionAfter(selectionNode);
      }else{
        this.setSelectionBefore(selectionNode);
      }
    }

    if(createNewLine){
      if(this.nodeHasLine(selectionNode)){
        if(setSelectionBefore){
          this.setSelectionBefore(selectionNode);
        }else{
          this.setSelectionAfter(selectionNode);
        }
      }

      newLine = this.createNewTextWrapper(style,text);
    }

    return newLine;
  }

  setSelectionBefore(node){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    s.removeAllRanges();
    r = r.cloneRange();
    r.setStartBefore(node);
    s.addRange(r);
    return r;
  }

  setSelectionAfter(node,setStart){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    s.removeAllRanges();
    r = r.cloneRange();
    r.setStartAfter(node);
    if(setStart){
      r.setStart(node,0);
      r.setEnd(node,0);
    }
    s.addRange(r);
    return r;
  }

  hasClass(node,className){
    return node && node.classList && node.classList.contains(className);
  }

  hasStyle(node,key,value){
    return node.style[key] == value;
  }

  setStyle(node,key,value){
    node.style[key] = value;
    return node;
  }

  isNeedToPartLine(r){
    return this.selectionIsInLine(r) && r.startOffset>=0 && r.startContainer.data!='';
  }

  partRangeByOffset(range,startOffset,endOffset,createBrAfterFirstNode,createNewLineAfterFirstNode){
    let s = range ? null : window.getSelection();
    let r = range ? range : s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let endText;
    let startText;

    startText = sc.nodeValue.toString().substr(0,startOffset);
    endText = sc.nodeValue.toString().substr(endOffset,sc.length);
    sc.nodeValue = startText;


    return{
      firstRange:r,
      lastRange:null,
      brRange:null,
      newLine:null
    }

  }


  partRangeByOffset(startOffset,endOffset){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let endText;
    let startText;

    startText = sc.nodeValue.toString().substr(0,startOffset);
    endText = sc.nodeValue.toString().substr(endOffset,sc.length);
    sc.nodeValue = startText;

    let selectionNode = r.startContainer.nodeName == 'SPAN' ? r.startContainer : r.startContainer.parentNode;
    let last = this.promiseSelectionInLineWrapper(null,endText,null,null,true);

    return {
      start:r,
      end:last
    }
  }

  $postLink(){
    //this.$document[0].addEventListener('selectionchange', this.cb.bind(this));
    this.contentElement.addEventListener('keydown',(event) => {

      /**
       * 40 arrow bottom
       * 38 arrow top
       * 37 arrow left
       * 39 arrow right
       */
      if(event.keyCode==40 || event.keyCode==38 || event.keyCode==37 || event.keyCode==39){
        return;
      }

      let s = window.getSelection();
      let r = s.getRangeAt(0);
      let sc = r.startContainer;
      let ec = r.endContainer;


      // Enter key
      if(event.keyCode == 13){

        if(this.isNeedToPartLine(r) && r.startOffset != 0){
          let lastRange = this.saveSelection();
          let ranges = this.partRangeByOffset(r.startOffset, r.endOffset,false,true);
          this.restoreSelection(ranges.first);

          this.prepareBeforeAddBR(true);
          let brRange = this.createBR();
          console.log(ranges.last);
          this.restoreSelection(ranges.last,0,0);
        }else{
          let lastRange = this.saveSelection();
          let setSelectionBefore = r.startOffset <= 1 && r.endOffset <= 1;
          let node = this.prepareBeforeAddBR(setSelectionBefore);
          this.restoreSelection(lastRange);
        }

        //s= window.getSelection(); r = s.getRangeAt(0);
        //console.log(r.startContainer);

        event.preventDefault();
        return false;
      }

      this.promiseSelectionInLineWrapper(null,null,null,true);

    });

    this.init();
  }

  init(){
    if(!this.contentElement.childNodes.length){
      //console.log('init');
      this.contentElement.focus();
      this.createNewTextWrapper();
    }
  }

  $onDestroy(){}

  toggleUnderscore(){}
  toggleBold(){}
  toggleItalic(){}

  restoreSelection(range,deleteContent,startOffset,endOffset) {
    if (range) {
      deleteContent = typeof deleteContent == 'undefined' ? false : deleteContent;
      let sel = window.getSelection();

      if(deleteContent){
        range.deleteContents();
      }

      if(startOffset >= 0){
        range.setStart(range.startContainer,startOffset);
      }
      if(endOffset >= 0){
        range.setEnd(range.startContainer,endOffset);
      }
      sel.removeAllRanges();
      sel.addRange(range);
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
