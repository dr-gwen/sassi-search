/**
 * Semantic Search for IMPS 2014
 *
 */


(function($) {
    jsPsych['practice'] = (function() {

        var plugin = {};

        plugin.create = function(params) {

            //params = jsPsych.pluginAPI.enforceArray(params, ['costs,sampling,stimuli,data']);
            var trials = new Array(params.stimuli.length);
            for (var i = 0; i < trials.length; i++) {
                trials[i] = {
                	"index": i,
                    "goal": params.goal[i],
					"stimuli": params.stimuli[i],
                    "room": params.room,
				};
            }
			return trials;
        };

        plugin.trial = function(display_element, trial, params) {
            display_element.html('');
			display_element.append($('<div>',{id: 'trial_goal'}));
			$('#trial_goal').append('<center><h1>Click on the '+trial.goal+'</h1></center>');

			display_element.append($('<div>', {id: 'container'}));

			prac_stim = sassi_practice_block(trial);

			jsPsych.data.write({
                view: 'practice_trial_init',
                placed_object: trial.goal,
            });

			prac_stim.finish_trial = function() {
				setTimeout(function(){
					display_element.html(''); // clear the display
					jsPsych.finishTrial();
				}, 100);
			};

			prac_stim.finisher = function() {

				prac_stim.finish_trial();

			};

			setTimeout(function(){prac_stim.handle_new_trial();}, 100);

        };

        return plugin;
    })();
})(jQuery);
