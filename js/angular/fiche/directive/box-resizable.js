ngApplication.directive('jdrBoxResizable', function () {
    var resizableConfig = {
        containment: "parent"
    };

    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem) {
            //jQuery UI init
            elem.resizable(resizableConfig);
            //Callback when resize end
            elem.on('resizestop', function (event, ui) {
                if (scope.callback){
                    scope.callback({$event: event, $ui: ui});
                }
                scope.$apply();
            });
        }
    };
});