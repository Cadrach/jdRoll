/**
 * Controller to manage a fiche
 */
ngApplication.controller('CtrlFicheMain', ['$scope', '$http', '$modal', '$location',
function ($scope, $http, $modal, $location) {

    $scope.fiche = {
        blocs: [],
        boxes: []
    };

    $scope.onDrawEnd = function(style){
        $scope.fiche.boxes.push({
            bloc: null,
            style: style
        })
    }

    $scope.onDragStop = function(event, ui, box){
        box.style.left = ui.position.left + 'px';
        box.style.top = ui.position.top + 'px';
        $scope.$evalAsync();
        event.stopPropagation();
    }

    $scope.onResize = function(event, ui, box){
        box.style.width = ui.size.width + 'px';
        box.style.height = ui.size.height+ 'px';
        event.stopPropagation();
    }

    $scope.openModalBox = function(box){
        var scope = $scope.$new();
        scope.box = box;
        $modal({
            template: 'js/angular/fiche/modal-box.html',
            scope: scope
        })
    }

}]);