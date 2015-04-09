/**
 * Controller to create a carte
 */
ngApplication.directive('jdrBoxDraw', function () {
    return {
        scope: {
            onDrawEnd: '&'
        },
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs, ctrl) {

            //When clicking to draw
            function onStart(event){

                //If we are not clicking on the element itself
                if(event.target !== element[0]){
                    return;
                }

                //Store start position
                start = [event.pageX - parentOffset.left, event.pageY - parentOffset.top];
                //Create the box & append it to the element
                box = angular.element('<div class="jdr-box jdr-box-placeholder"></div>');
                element.append(box);

                //Stop observing starts (we are drawing)
                element.off('mousedown', onStart);

                //Observe correct ending (mousedown in case the mouse is released outside the element)
                element.on('mouseup', onStop);
                element.on('mousedown', onStop);

                //Observe pointer to update size & position
                element.on('mousemove', onMove);

                //Trigger a move to init correctly the placeholder
                onMove(event);
            }

            //When stopping (releasing mouse button)
            function onStop(event){
                //Signal end
                if((parseInt(style.width) * parseInt(style.height)) > 1000){
                    //Draw box if big enough
                    scope.onDrawEnd({$style: style});
                    scope.$evalAsync();
                }

                //Reinit everything
                init();
                event.stopPropagation();
            }

            //On dragging the mouse
            function onMove(event){
                //End point
                end = [event.pageX - parentOffset.left, event.pageY - parentOffset.top];

                //Compute style
                style = {
                    position: 'absolute',
                    left: Math.min(end[0], start[0]),
                    top: Math.min(end[1], start[1]),
                    width: Math.abs(end[0] - start[0]),
                    height: Math.abs(end[1] - start[1])
                };

                //Apply style
                box.css(style);
                //box.html(JSON.stringify(style));
            };

            //Init the directive (or reset it)
            function init(){

                //If a box is still present, remove it
                if(box){
                    box.remove();
                }

                //Reinit everything
                start = end = style = null;
                element.off('mouseup', onStop);
                element.off('mousedown', onStop);
                element.off('mousemove', onMove);

                //Observe start
                element.on('mousedown', onStart);
            }

            //Var declarations
            var start, end, style, box;
            var parentOffset = element.offset();

            //Relative positioning of parent element is mandatory
            element.css('position', 'relative');

            //Init everything once
            init();

        }
    }
});