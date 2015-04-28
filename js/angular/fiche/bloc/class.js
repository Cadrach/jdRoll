(function () {
    this.Bloc = Class.extend({
        init: function (bloc) {
            //We apply default + all of the object property to our new object
            _.extend(this, {
                numberOfValuesPerLine: 2
            }, bloc);
        },
        getValuesForBox: function(box){
            return [];
        },
        getTemplateDisplay: function () {
            return 'js/angular/fiche/bloc/' + this.type + '/display.html'
        },
        getTemplateConfigBloc: function () {
            return 'js/angular/fiche/bloc/' + this.type + '/config-bloc.html'
        },
        getTemplateConfigBox: function () {
            return 'js/angular/fiche/bloc/' + this.type + '/config-box.html'
        }
    });
})();