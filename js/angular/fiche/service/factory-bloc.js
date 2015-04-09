/**
 * Factory to define & manage Blocs
 */
ngApplication.factory('jdrFactoryBloc', [function() {
    
    var blocs = {};

    function ucfirst(str) {
        str += '';
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    }

    return {
        get: function(id){
            return blocs[id];
        },
        getBlocs: function(){
            return blocs;
        },
        create: function(bloc){
            if(bloc && bloc.id && blocs[bloc.id]){
                throw "The bloc with id "+bloc.id+" already exists.";
            }

            if(!bloc){
                bloc = {};
            }

            if(!bloc.id){
                bloc.id = ! _.isEmpty(blocs) ? _.max(_.pluck(blocs, 'id')) + 1:1;
            }

            if(!bloc.type){
                bloc.type = 'base';
            }

            var object = new window['Bloc' + ucfirst(bloc.type)](bloc);
            blocs[object.id] = object;
            return object;
        }
    };
}]);