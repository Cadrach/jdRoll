/**
 * Controller to manage a box
 */
ngApplication.controller('CtrlFicheBox', ['$scope', 'jdrFactoryBox',
function ($scope, jdrFactoryBox) {

    $scope.tabs = [{
        title: "Configuration",
        template: 'js/angular/fiche/modal-box-tab-config.html'
    },{
        title: "Style",
        template: 'js/angular/fiche/modal-box-tab-style.html'
    }];

    $scope.delete = function(){
        if(confirm('Êtes vous sûr?')){
            jdrFactoryBox.delete($scope.box);
            $scope.$hide();
        }
    }

}]);