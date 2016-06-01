window.createNewLine = false;

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
    let span = this.createNewNode('span','br',"");

    span.className = 'br';
    //span.id = ++this.brCounter;
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
    let nodeToCheckIsBr = this.getParentNodeByRange(r);
    return this.nodeIsLine(nodeToCheckIsBr);
  }

  createNewTextWrapper(style,text,startOffset,endOffset){
    let s = window.getSelection();
    let r = s.getRangeAt(0);
    let sc = r.startContainer;
    let ec = r.endContainer;
    let defaultText = text ? text : "\u200B";
    let span = this.createNewNode('span',style,defaultText);

    span.className = 'wordwrapper';

    //span.id = ++this.spanCounter;

    r.insertNode(span);

    r.setStart(span,startOffset?startOffset:0);
    r.setEnd(span,endOffset?endOffset:0);

    r.deleteContents();
    r = r.cloneRange();
    s.removeAllRanges();
    s.addRange(r);

    return r;
  }

  nodeIsBr(node){
    return this.hasClass(node,'br');
  }

  nodeIsLine(node){
    return node && this.hasClass(node,'wordwrapper');
  }


  /**
   *
   * @param range {Range}
   * @returns {Null|Node}
     */
  getParentNodeByRange(range){
    if(!range) return null;
    return range.startContainer.nodeName == 'SPAN' ? range.startContainer : range.startContainer.parentNode;
  }


  /**
   *
   * @param {(object|null)} style
   * @param {(string|null)} text
   * @param {(boolean|null)} deleteContent
   * @param {(boolean|null)} setSelectionBefore
   * @param {(boolean|null)} forceNewLine
   * @returns {Undefined|Range}
   */
  promiseSelectionInLineWrapper(style,text, deleteContent,setSelectionBefore,forceNewLine){
    /**
     *
     * @type {Selection}
     */
    let s = window.getSelection();
    /**
     *
     * @type {Range}
     */
    let r = s.getRangeAt(0);
    /**
     *
     * @type {Node}
     */
    let sc = r.startContainer;
    /**
     *
     * @type {Node}
     */
    let ec = r.endContainer;
    /**
     *
     * @type {boolean}
     */
    let needToCreateNewLine;
    /**
     *
     * @type {(Undefined|Range)}
     */
    let newLine;

    let selectionNode = this.getParentNodeByRange(r);
    setSelectionBefore  = typeof setSelectionBefore != 'undefined' ? setSelectionBefore : false;

    if(!this.nodeIsLine(selectionNode)){
      needToCreateNewLine=true;
      if(this.nodeIsBr(selectionNode) && setSelectionBefore==false){
        this.setSelectionAfter(selectionNode);
      }else{
        this.setSelectionBefore(selectionNode);
      }
    }

    if(this.nodeIsLine(selectionNode) && forceNewLine){
      this.setSelectionAfter(selectionNode);
    }

    if(needToCreateNewLine || forceNewLine){
      //#TODO when selection in BR and need create new line, need to check if startContainer!= endContainer true remove the nodes between with startOffset to endOffset
      newLine = this.createNewTextWrapper(style,text, text?0:1,text?0:1);
      //this.restoreSelection(newLine);
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
  
  addClass(node,className){
    if(!node) return;
    node.classList.add(className);
    return node;
  }

  hasStyle(node,key,value){
    return node.style[key] == value;
  }

  addStyle(node,key,value){
    node.style[key] = value;
    return node;
  }

  isNeedToPartLine(r){
    return this.selectionIsInLine(r) && r.startOffset>=0 && r.startContainer.nodeValue!="\u200B";
  }


  /**
   *
   * @param startOffset
   * @param endOffset
   * @param createBrAfterFirstNode
   * @param createNewTextNodeAfterFirstNode
   * @param range
   * @returns {{first: Range, last: (Range|undefined), br: (Range|undefined), newLine: (Range|undefined)}}
     */
  partRangeByOffset(startOffset,endOffset,createBrAfterFirstNode,createNewTextNodeAfterFirstNode,range){

    /**
     *
     * @type {Selection}
     */
    let s = range ? null : window.getSelection();
    /**
     *
     * @type {Range}
     */
    let r = range ? range : s.getRangeAt(0);
    /**
     *
     * @type {Node}
     */
    let sc = r.startContainer;
    /**
     *
     * @type {Node}
     */
    let ec = r.endContainer;
    /**
     *
     * @type {String}
     */
    let endText;
    /**
     *
     * @type {String}
     */
    let startText;
    /**
     *
     * @type {Range|undefined}
     */
    let br;
    /**
     *
     * @type {Range|undefined}
     */
    let newLine;
    /**
     *
     * @type {Range|undefined}
     */
    let last;


    startText = sc.nodeValue.toString().substr(0,startOffset);
    endText = sc.nodeValue.toString().substr(endOffset,sc.length);
    sc.nodeValue = startText;

    if(createBrAfterFirstNode){
      this.prepareBeforeAddBR();
      br = this.createBR();
    }

    if(createNewTextNodeAfterFirstNode){
      newLine = this.promiseSelectionInLineWrapper(null,null,null,false,true);
    }

    last = this.promiseSelectionInLineWrapper(null,endText,null,false,createNewLine);

    if(newLine){
      this.restoreSelection(newLine);
    }

    return{
      first:r,
      last:last,
      br:br,
      newLine:newLine
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
      if(event.keyCode==8 || event.keyCode==40 || event.keyCode==38 || event.keyCode==37 || event.keyCode==39){
        return;
      }

      let s = window.getSelection();
      let r = s.getRangeAt(0);
      let sc = r.startContainer;
      let ec = r.endContainer;


      // Enter key
      if(event.keyCode == 13){
        if(this.isNeedToPartLine(r) && r.startOffset != 0 && typeof sc.data != 'undefined'){
          this.partRangeByOffset(r.startOffset, r.endOffset,true,createNewLine);
        }else{
          let setSelectionBefore = (r.startOffset <= 1 && r.endOffset <= 1) || typeof sc.data != 'undefined';
          let node = this.prepareBeforeAddBR(setSelectionBefore);
          this.createBR(node);
          this.restoreSelection(r);
        }

        //s= window.getSelection(); r = s.getRangeAt(0);
        //console.log(r.startContainer);

        event.preventDefault();
        return false;
      }


        this.promiseSelectionInLineWrapper(null,null,null,null,createNewLine);

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
      if (window.getSelection) {
        let sel = window.getSelection();

        if(deleteContent){
          range.deleteContents();
        }

        if(startOffset){
          range.setStart(range.startContainer,startOffset);
        }
        if(endOffset){
          range.setEnd(range.startContainer,endOffset);
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
