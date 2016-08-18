class assistanceController {
  // @ngInject
  constructor($log, $element) {

    function hasClass(node,className){
      return node && className && node.classList.contains(className);
    }
    $element[0].addEventListener('click',(e)=>{
      let target = (e.target.closest('.icon') || e.target.closest('.icon-desc'));


      if(target){
        let help = $element[0].querySelector('.help');

        help.classList.contains('open') ?
            help.classList.remove('open') :
            help.classList.add('open');
      }
    });

  }
}

export const assistance = {
  bindings: {},
  templateUrl: '/components/assistance/assistance.html',
  controller: assistanceController,
  controllerAs: 'assistance'
};
