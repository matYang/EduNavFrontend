var Config = {

    urlSeperator: '+',

    locationSeperator: '_',

    defaultCustomDepthIndex: 3,

    //-------------- PersonalView state transfer -------------
    getDefaultPersonalViewState: function () {
        return "history";
    },

    getPossiblePersonalViewStates: function () {
        return ['social', 'message', 'notification', 'history', 'utility'];
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

    //-------------- DMPost state transfer --------------
    getDefaultDMPostState: function () {
        return "step1";
    },

    getPossibleDMPostStates: function () {
        return ['step1', 'step2', 'step3'];
    },

    validateDMPostState: function (postState) {
        var possibleStates = this.getPossibleDMPostStates(), i;

        for ( i = 0; i < possibleStates.length; i++) {
            if (possibleStates[i] === postState) {
                return true;
            }
        }
        return false;
    },

    getPostStateStepIndex: function (postState) {
        var possibleStates = this.getPossibleDMPostStates(), i;

        for ( i = 0; i < possibleStates.length; i++) {
            if (possibleStates[i] === postState) {
                return i + 1;
            }
        }
        Info.warn("Config::getPostStepIndex:: invalid postState, using the default step 1");
        return 1;
    }
    // ,

    // //-------------- Registration state transfer --------------
    // getDefaultRegistrationState: function () {
    //     return "";
    // },

    // getPossibleRegistrationStates: function () {
    //     return ["", "finish"];
    // },

    // validateRegistrationState: function (registrationState) {
    //     var possibleStates = this.getPossibleRegistrationStates(), i;

    //     for ( i = 0; i < possibleStates.length; i++) {
    //         if (possibleStates[i] === registrationState) {
    //             return true;
    //         }
    //     }
    //     return false;
    // },

    // getRegistrationStateStepIndex: function (registrationState) {
    //     var possibleStates = this.getPossibleRegistrationStates(), i;

    //     for ( i = 0; i < possibleStates.length; i++) {
    //         if (possibleStates[i] === registrationState) {
    //             return i + 1;
    //         }
    //     }
    //     Info.warn("Config::getRegistrationStateStepIndex:: invalid postState, using the default step 1");
    //     return 1;
    // }

};
