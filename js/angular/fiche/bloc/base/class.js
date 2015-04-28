(function () {
    this.BlocBase = Bloc.extend({
        init: function (bloc) {
            //Declare our class defaults
            this.values = [{}, {}, {}];

            //Apply parent class
            this._super( bloc );
        },
        getValuesForBox: function(box){
            return this.values;
        }
    });
})()