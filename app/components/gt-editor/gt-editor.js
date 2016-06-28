import { GtState } from '../../assets/javascripts/GtEditorComponents/GtState';

class gtEditorController {
    // @ngInject
    constructor($log, $element) {

        this.states = [
            new GtState('toggleBold',false,true),
            new GtState('toggleUnderline',false,true),
            new GtState('toggleItalic',false,true),
            new GtState('toggleStrike',false,true)
        ];

        this.statesMetadata = {
            toggleBold:{
                'nodeType':'button',
                'nodeName':'button',
                'buttonClassName':'Button',
                'id':null,
                'styleKey':'font-weight',
                'styleValue':'700',
                'wordWrapperClassName':'bold',
                'iconHtml':'b',
                'buttonTitle':'bold'
            },
            toggleStrike:{
                'nodeType':'button',
                'nodeName':'button',
                'buttonClassName':'Button',
                'id':null,
                'styleKey':'text-decoration',
                'styleValue':'line-through',
                'wordWrapperClassName':'strike',
                'iconHtml':'<span style="text-decoration: line-through">s</span>',
                'buttonTitle':'strike'
            },
            toggleUnderline:{
                'nodeType':'button',
                'nodeName':'button',
                'buttonClassName':'Button',
                'id':null,
                'styleKey':'text-decoration',
                'styleValue':'underline',
                'wordWrapperClassName':'underline',
                'iconHtml':'<span style="text-decoration: underline">U</span>',
                'buttonTitle':'underline'
            },
            toggleItalic:{
                'nodeType':'button',
                'nodeName':'button',
                'buttonClassName':'Button',
                'id':null,
                'styleKey':'font-style',
                'styleValue':'italic',
                'wordWrapperClassName':'italic',
                'iconHtml':'<span style="font-style: italic">I</span>',
                'buttonTitle':'italic'
            }
        };

        console.log(this);
    }
}

export const gtEditor = {
  bindings: {},
  templateUrl: '/components/gt-editor/gt-editor.html',
  controller: gtEditorController,
  controllerAs: 'gtEditor'
};
