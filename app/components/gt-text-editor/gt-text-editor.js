//while (nodeToBeRemoved.firstChild)
//{
//  nodeToBeRemoved.parentNode.insertBefore(nodeToBeRemoved.firstChild,
//      nodeToBeRemoved);
//}
//
//nodeToBeRemoved.parentNode.removeChild(nodeToBeRemoved);

class gtTextEditorController {

  // @ngInject
  constructor($element, $document, $window, Selection ,$scope) {
    this.$window = $window;
    this.$document = $document;
    this.bold = {};
    this.bold.active = false;
    this.range = null;
    this.$scope = $scope;
  }

  $postLink(){
    this.$document[0].addEventListener('selectionchange',
        this.cb.bind(this)
    );
  }


  $onDestroy(){

  }


  cb(){
    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let wrapper = range.endContainer.parentNode;
    this.bold.active = wrapper.classList.contains('bold');
    this.$scope.$digest();
  }


  setItalic(){

  }

  toggleBold(){
    let isBold = this.bold.active = !this.bold.active;
    let r = this.range = this.saveSelection();
    this.restoreSelection(this.range);
    let sel = window.getSelection();

    let parent = this.range.endContainer.parentNode;

    let sc = r.startContainer;
    let ec = r.endContainer;
    if(sc !== ec){
      if(isBold){
        if(sc.parentNode.classList.contains('bold') && ec.parentNode.classList.contains('bold')){
            return;
        }

        if(sc.parentNode.classList.contains('bold')){

        }


      }else{

      }

      return;
    }

    if((this.range.endOffset != this.range.endContainer.length || this.range.startOffset == 0 ) && !this.bold.active && parent.classList.contains('bold')
    ){
      while (parent.firstChild) {
          parent.parentNode.insertBefore(parent.firstChild, parent);
      }
      parent.parentNode.removeChild(parent);
      return;
    }

    if(this.bold.active && parent.classList.contains('bold')==false &&
        (this.range.startOffset != this.range.endOffset)
    ){
      let range = sel.getRangeAt(0).cloneRange();
      let element = document.createElement('span');
      element.className = 'bold';
      range.surroundContents(element);
      sel.removeAllRanges();
      sel.addRange(range);
      this.range = range;
      return;
    }

    if(this.bold.active==false) {

      let range = sel.getRangeAt(0);

      let element = range.endContainer.parentNode;

      range = sel.getRangeAt(0);
      range.deleteContents();
      debugger;
      range.setStartAfter(element.nextSibling);
      var textNode = document.createTextNode('\u200B');

      range.insertNode(textNode);
      sel.removeAllRanges();
      range = range.cloneRange();

      sel.addRange(range);
      console.log(range);
      return;
    }

    this.insertTextAtCursor();
  }

  insertTextAtCursor() {
  let sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      var textNode = document.createElement('span');
      textNode.className = 'bold';
      textNode.innerHTML = '\u200B';
      range.insertNode(textNode);

      sel.removeAllRanges();
      range = range.cloneRange();
      sel.addRange(range);
      //textNode.focus();
      //document.execCommand('delete', false, null);
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.pasteHTML(text);
    range.select();
  }
  }

  restoreSelection(range) {
  if (range) {
    if (window.getSelection) {
      let sel = window.getSelection();
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
