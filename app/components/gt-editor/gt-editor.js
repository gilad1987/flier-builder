import { GtState } from '../../assets/javascripts/GtEditorComponents/GtState';

class gtEditorController {
    // @ngInject
    constructor($log, $element) {

        this.states = [
            new GtState('font-weight',true),
            new GtState('text-decoration',true),
            new GtState('font-style',true),
            new GtState('text-align',true)
        ];

        this.statesMetadata = {

            'font-weight':{
                type:'toggle', // options --> toggle / group / list
                style: {
                    key: "font-weight",
                    values: ['300', '700']
                },
                buttons: {
                    700:{
                        nodeName:'button',
                        elementAttrs:{
                            type:'button',
                            title:'bold'
                        },

                        icon:'<span style="font-weight: 700">B</span>'
                    }
                }

            },

            'font-style':{
                type:'toggle', // options --> toggle / group / list
                style: {
                    key: "font-style",
                    values: ['', 'italic']
                },
                buttons: {
                    italic:{
                        nodeName:'button',
                        elementAttrs:{
                            type:'button',
                            title:'italic'
                        },

                        icon:'<span style="font-style: italic">I</span>'
                    }
                }

            },


            'text-decoration':{
                type:'toggle', // options --> toggle / group / list
                style: {
                    key: "text-decoration",
                    values: ['', 'underline']
                },
                buttons: {
                    underline:{
                        nodeName:'button',
                        elementAttrs:{
                            type:'button',
                            title:'underline'
                        },

                        icon:'<span style="text-decoration: underline">U</span>'
                    }
                }

            },

            'text-align':{
                type:'group', // options --> toggle / group / list
                style: {
                    key: "text-align",
                    values: ['left', 'right','center','justify']
                },
                buttons: {
                    'left':{
                        nodeName:'button',
                        elementAttrs:{
                            type:'button',
                            title:'Text align left'
                        },

                        icon:'<i class="fa fa-align-left" aria-hidden="true"></i>'
                    },
                    'right':{
                        nodeName:'button',
                        elementAttrs:{
                            title:'Text align right',
                            type:'button'
                        },

                        icon:'<i class="fa fa-align-right" aria-hidden="true"></i>'
                    },
                    'center':{
                        nodeName:'button',
                        elementAttrs:{
                            title:'Text align center',
                            type:'button'
                        },

                        icon:'<i class="fa fa-align-center" aria-hidden="true"></i>'
                    },
                    'justify':{
                        nodeName:'button',
                        elementAttrs:{
                            title:'Text align justify',
                            type:'button'
                        },

                        icon:'<i class="fa fa-align-justify" aria-hidden="true"></i>'
                    }

                }

            }
        };


        $element[0].style.position = "absolute";
        $element[0].style.top = this.posy+'px';
        $element[0].style.left = this.posx+'px';

    }
}

export const gtEditor = {
  bindings: {
      'posx':'@',
      'posy':'@',
      'textForInit':'='
  },
  templateUrl: '/components/gt-editor/gt-editor.html',
  controller: gtEditorController,
  controllerAs: 'gtEditor'
};
