/**
 * Semantic Search for IMPS 2014
 *
 */


(function($) {
    jsPsych['semantic_search'] = (function() {

        var plugin = {};


        plugin.create = function(params) {

            //params = jsPsych.pluginAPI.enforceArray(params, ['costs,sampling,stimuli,data']);

            var trials = new Array(params.stimuli.length);
            for (var i = 0; i < trials.length; i++) {

                trials[i] = {
                	"index": i,
                    "search_cost": params.costs.search,
                    "travel_cost": params.costs.travel,
                    "target": params.stimuli[i],
                    "sampling": params.sampling,
                    "location": params.samplers['get'](params.stimuli[i],params.sampling),
				};
            }
            return trials;
        };

        plugin.trial = function(display_element, trial) {
            SASSI.initialize_trial(display_element, trial);
			window.addEventListener('keypress', SASSI.start_trial, false);
        };

        return plugin;
    })();
})(jQuery);
