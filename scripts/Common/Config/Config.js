var Config = {

    urlSeperator: '+',

    locationSeperator: '_',

    //-------------- PersonalView state transfer -------------
    getDefaultPersonalViewState: function () {
        return "utility";
    },

    getPossiblePersonalViewStates: function () {
        return ['utility'];
    },

    validatePersonalViewState: function (personalViewState) {
        var possibleStates = this.getPossiblePersonalViewStates(), i;
        for ( i = 0; i < possibleStates.length; i++) {
            if (possibleStates[i] === personalViewState) {
                return true;
            }
        }
        return false;
    },


};
