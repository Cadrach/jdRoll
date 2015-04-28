/**
 * Factory to define & manage Boxes
 */
ngApplication.factory('jdrFactoryBox', ['jdrFactoryBloc', function(jdrFactoryBloc) {

    //Reference of all instanced boxes
    var boxes = {};

    /**
     * Constructor
     * @param box
     * @constructor
     */
    function Box(box){
        //We apply all of the object property to our new object
        angular.extend(this, {
            id: !_.isEmpty(boxes) ? _.max(_.pluck(boxes, 'id')) + 1:1,
            bloc: _.values(jdrFactoryBloc.getBlocs())[0].id,
            definition: {},
            startingLine: 0,
            numberOfLines: 0,
            boxStyle: {},
            lineStyle: {
                fontSize: 10
            }
        }, box);
    }

    /**
     * Get Bloc
     * @returns Bloc
     */
    Box.prototype.getBloc = function(){return jdrFactoryBloc.get(this.bloc)}

    /**
     * Set Bloc
     * @param Bloc bloc
     */
    Box.prototype.setBloc = function(bloc){this.bloc = bloc.id}

    /**
     *
     * @param style
     * @param type
     */
    Box.prototype.setStyle = function(style, type){
        type = type ? type:'box';
        angular.extend(this[type + 'Style'], style);
        this.updateLineHeight();
    }

    Box.prototype.updateLineHeight = function(){
        //Set the line height
        this.lineStyle.height = 100 / this.numberOfLines + '%';
    }

    /**
     * Set definition values from style
     */
    Box.prototype.setDefinitionFromStyle = function(){
        var defaultLineHeight = 14;
        this.numberOfLines = Math.floor(this.boxStyle.height / defaultLineHeight);

        this.lineStyle.height = 100 / this.numberOfLines + '%';
        this.lineStyle.lineHeight = '100%';
        this.updateLineHeight();
    }

    Box.prototype.getLines = function(){
        return this.getBloc().getValuesForBox(this);
    }

    /**
     * Factory methods
     */
    return {
        get: function(id){
            return boxes[id];
        },
        getBoxes: function(){
            return boxes;
        },
        delete: function(box){
            delete boxes[box.id];
        },
        create: function(box){
            if(box && box.id && boxes[box.id]){
               throw "The box with id "+box.id+" already exists.";
            }

            var object = new Box(box);
            boxes[object.id] = object;
            return object;
        }
    };
}]);