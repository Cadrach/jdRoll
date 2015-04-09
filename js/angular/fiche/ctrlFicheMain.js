/**
 * Controller to manage a fiche
 */
ngApplication.controller('CtrlFicheMain', ['$scope', '$http', '$modal', '$location', 'jdrFactoryBox', 'jdrFactoryBloc',
function ($scope, $http, $modal, $location, jdrFactoryBox, jdrFactoryBloc) {

    //TEMPORARY: We create the first bloc (will be added auto when creating a fiche)
    jdrFactoryBloc.create();

    /**
     * ********************************************************************************************************
     * ********************************************************************************************************
     * LOCAL VARIABLES
     * ********************************************************************************************************
     * ********************************************************************************************************
     */
    var openedModals = {};

    /**
     * ********************************************************************************************************
     * ********************************************************************************************************
     * SCOPE VARIABLES
     * ********************************************************************************************************
     * ********************************************************************************************************
     */
    $scope.boxes = jdrFactoryBox.getBoxes();
    $scope.store = {};

    /**
     * ********************************************************************************************************
     * ********************************************************************************************************
     * SCOPE METHODS
     * ********************************************************************************************************
     * ********************************************************************************************************
     */

    /**
     * When draw finish, create a new box
     * @param style
     */
    $scope.onDrawEnd = function(style){
        var box = jdrFactoryBox.create({
            boxStyle: style
        });

        //Init definition
        box.setDefinitionFromStyle();
    }

    /**
     * When drag box finishes, update box style
     * @param event
     * @param ui
     * @param box
     */
    $scope.onDragStop = function(event, ui, box){

        box.setStyle({
            left: ui.position.left,
            top: ui.position.top
        });

        $scope.$evalAsync();
        event.stopPropagation();
    }

    /**
     * When box resize finishes, update box style
     * @param event
     * @param ui
     * @param box
     */
    $scope.onResize = function(event, ui, box){
        box.setStyle({
            width: ui.size.width,
            height: ui.size.height
        });
    }

    /**
     * Manage opened modals & open them if requested
     * @param box
     */
    $scope.openModalBox = function(box){
        if(openedModals[box.id]){
            //Do not open the modal twice
            console.log(openedModals[box.id]);
            openedModals[box.id].show();
        }
        else{
            var scope = $scope.$new();
            scope.box = box;
            openedModals[box.id] = $modal({
                template: 'js/angular/fiche/modal-box.html',
                backdrop: false,
                container: '[jdr-box-draw]',
                scope: scope
            })
        }
    }

}]);