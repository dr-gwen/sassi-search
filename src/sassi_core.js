/*
This is the SASSI Experiment Setup File!

The SASSI namespace is first defined here, and the experiment wide variables
are added.

4.15.2015 bcmcmahan

*/
var SASSI = SASSI || {};


SASSI.costs = {
    travel: 1,
    search: 2,
}

var travel = 1; var low_search = 2; var high_search = 2;
var exper_block = [];

SASSI.images = ['img/SASSI-Kitchen.PNG', 'img/SASSI-LivingRoom.PNG', 'img/batteries-sm.png',
              'img/batteries.png', 'img/icon.ico', 'img/keys-sm.png', 'img/keys.png',
              'img/kitchen-spritemap.png', 'img/living-room-spritemap.png',
              'img/map-spritemap.png', 'img/mug-sm.png', 'img/mug.png',
              'img/remote-sm.png', 'img/remote.png', 'img/targets.png',
              'img/wallet-sm.png', 'img/wallet.png'];

// just for the sake of playing with stuff
SASSI.tell = true;

var sampler_popping = true;


var factors = {
  costs: [SASSI.costs],
  sampling: ['']
}
SASSI.design = jsPsych.randomization.factorial(factors, 1);
SASSI.stimuli = function(i) {
    return jsPsych.randomization.repeat(['batteries','mug','keys'],i);}
SASSI.samplers = make_samplers();
SASSI.score=0;
SASSI.start_score=0;
SASSI.incr_score = function(value) {
    SASSI.score = Math.round(SASSI.score) + Math.round(value);
}


$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    //this.css("font-size",'40px');
    return this;
}

$.fn.center_horiz = function () {
    this.css("margin-left", 'auto');
    this.css("margin-right", 'auto');
    this.css("position",'absolute');
    return this;
}

$.fn.text_only = function() {
    this.css("text-align",'center');
    this.css("position",'absolute');
    this.css("font-size",'24 pt');
    this.css("width",'400px');
    this.css("height",'200px');
    this.css("margin-left",'200');
    this.css("margin-top",'200');
    return this;
}

SASSI.final_score = function() {
    var time = (new Date()).getTime()-SASSI.stimuli.start_time;
    elapsed = Math.floor(time/100)/10;
    cur_prog = Math.max(sassi_stim.max_prog-elapsed,0);
    var points = Math.round(cur_prog);
    var final_score = Math.round(cur_prog);
    return final_score;
}

SASSI.get_practice_blocks = function() {
    make = function(x) { return jsPsych.randomization.repeat(x, 1); }
    livingroom_items = make(['coffee table','couch','tv','bookshelf','coat','backpack']);
    kitchen_items = make(['table','microwave','trash','sink','cabinets','oven']);
    return make([{type: 'practice',
                  goal: livingroom_items,
                  stimuli: livingroom_items,
                  room: 'livingroom'},
                 {type: 'practice',
                  goal: kitchen_items,
                  stimuli: kitchen_items,
                  room: 'kitchen'}]);
}


SASSI.logger = {}
SASSI.logger['init_trial'] = function(trial, score) {
    datum = {
        view: 'trial_init',
        search_cost: trial.search_cost,
        travel_cost: trial.travel_cost,
        sampling_type: trial.sampling,
        score_so_far: score,
        trial_in_block: trial.index+1,
        target_room: trial.location.data.room,
        target_location: trial.location.data.loc,
    };
    jsPsych.data.write(datum);
}

SASSI.logger['timeout'] = function() {
    datum = {
        view: 'trial_timeout',
    };
    jsPsych.data.write(datum);
}

SASSI.logger['map_view'] = function() {
    datum = {
        view: 'gotomap',
        time_clicked: (new Date()).getTime(),
        placed_object: SASSI.target,
    };
    jsPsych.data.write(datum);
}

SASSI.logger['location_click'] = function(room, location, clickable) {
    datum = {
        view: 'inroom',
        room_loc: room,
        item_clicked: location,
        item_clickable: clickable,
        time_clicked: (new Date()).getTime(),
        placed_object: SASSI.target,
    };
    jsPsych.data.write(datum);
}


SASSI.logger['room_click'] = function(room) {
    datum = {
        view: 'inmap',
        item_clicked: room,
        time_clicked: (new Date()).getTime(),
        placed_object: SASSI.target,
    };
    jsPsych.data.write(datum);
}


SASSI.logger['finish_trial'] = function() {
    jsPsych.data.write({view:'trial_end', score:SASSI.score});
}

SASSI.timeout_function = function() {
    if (SASSI.stimuli.not_searching) {
        SASSI.finish();
    }
    else {
        SASSI.stimuli.timeout = true;
    }
}

SASSI.finish = function() {
    if (!(SASSI.timeout)){
        clearInterval(SASSI.progress_bar.counter);
    }
	spec = "";
	spec_pl = "";
	det_v = "";
	if(SASSI.current_trial.location.data.room=="livingroom"){
		spec = "living room";
	} else {
		spec = "kitchen";
	}
	if(SASSI.current_trial.location.data.loc=="coatrack"){
		spec_pl = "coat";
	} else {
		spec_pl = SASSI.current_trial.location.data.loc;
	}
	if(SASSI.current_trial.target=="mug"){
		det_v = "It was";
	} else {
		det_v = "They were";
	}

    SASSI.timeout = true;
    SASSI.logger.finish_trial();
    SASSI.score = Math.round(SASSI.score + SASSI.progress_bar.instance.current_value);
    console.log('sassi score: '+SASSI.score);
    SASSI.stimuli.active_layer.turn_off();
    SASSI.display_element.html('');
    if(SASSI.stimuli.found){
        SASSI.display_element.append($('<div>', {
            id:'end_trial_text',
        }));
        endtext = '<center><h3>You found the '+SASSI.current_trial.target+'! <br /><br />'+det_v+' in the '+spec+', in the '+spec_pl+'.</h3></center>';
    } else {
        SASSI.display_element.append($('<div>', {
            id:'end_trial_text',
        }));
        endtext = '<center><h3>You did not find the '+SASSI.current_trial.target+' in time. <br /><br />'+det_v+' in the '+spec+', in the '+spec_pl+'.</h3></center>';
    }
    $('#end_trial_text').append(endtext);
    $('#end_trial_text').append('<center>' +
      '<span style="font-weight:bold;font-size:40px">' +
     '<img src=\"img/'+SASSI.current_trial.target+'.png"\ \/></span>' +
     '<br /><br /><span style="font-size: 16pt">(Press SPACEBAR to continue)</span></center>');
    $('#end_trial_text').center();
    window.addEventListener('keypress', function temp (){
        SASSI.display_element.html(''); // clear the display
        jsPsych.finishTrial();
        window.removeEventListener('keypress',temp,false);
    }, false);

    //setTimeout(function(){
    //    SASSI.display_element.html(''); // clear the display
    //    jsPsych.finishTrial();
    //}, 1000);
}

SASSI.progress_bar = {}
SASSI.progress_bar.prototype = function(max_value) {
    var that = this
    that.max_value = max_value;
    that.current_value = max_value;
    console.log('initial max value for progressbar'+max_value);

    $('#progressbar').progressbar({
                    max:that.max_value,
                    value:that.max_value,
    });
    $('#progressbar').center_horiz();

    that.update = function() {
        //console.log('updating progress bar with current value='+that.current_value);
        current_time = (new Date()).getTime()-SASSI.stimuli.start_time;
        elapsed_time = Math.floor(current_time/100)/10;
        if (that.current_value > 0) {
            that.current_value = Math.max(that.max_value-elapsed_time, 0);
            $('#progresstext').html('<center>Reward for finding the ' +
                                    SASSI.current_trial.target+': '+
                                    Math.round(that.current_value)+' points' +
                                    '<br />Accumulated points: '+SASSI.score+
                                    '<br /></center>');
            $('#progressbar').progressbar('option','value',that.current_value);
        }
        else {
            clearInterval(SASSI.progress_bar.counter);
            SASSI.timeout = true;
            SASSI.stimuli.timeout = true;
            SASSI.logger.timeout();
            SASSI.stimuli.drawText(SASSI.stimuli.active_layer.layer,
                                   "Out of time.", SASSI.stimuli.stage);
            SASSI.timeout_function();
        }
    };
}

SASSI['initialize_trial'] = function(display_element, trial) {
    SASSI.display_element = display_element;
    SASSI.current_trial = trial;
    SASSI.target = trial.target;
    display_element.append($('<div>', {
        id:'begin_trial_text',
    }));
    $('#begin_trial_text').append('<center>' +
          '<span style="font-weight:bold;font-size:40px">' +
          'Trial '+(trial.index+1) +
         ' <br><br>Find the '+SASSI.current_trial.target+'<br><br>' +
         '<img src=\"img/'+SASSI.current_trial.target+'.png"/></span>' +
         '<br /><br /><span style="font-size: 16pt">(Press SPACEBAR to continue)</span></center>');
    $('#begin_trial_text').center();
}



SASSI['start_trial'] = function(event) {
    if (event.keyCode != 32) {
        return;
    }
    window.removeEventListener('keypress', SASSI.start_trial);

    //SASSI.score = SASSI.start_score;
    SASSI.timeout = false;
    var max_value = (6 * SASSI.current_trial.travel_cost +
                        12 * SASSI.current_trial.search_cost);
    SASSI.max_value = max_value;
    SASSI.display_element.html('');

    SASSI.logger.init_trial(SASSI.current_trial, SASSI.score);



    //SASSI.display_element.center_horiz();
    SASSI.display_element.append('<center>' +
                            '<h3>Trial '+(SASSI.current_trial.index+1)   +
                                ': Find the '+SASSI.current_trial.target +
                            '<img src=\"img/'+SASSI.current_trial.target +'-sm.png"/>' +
                             '</h3></center>');


    SASSI.display_element.append($('<div>',{
        id: 'progresstext',
        html: '<center>Current reward for finding '+SASSI.current_trial.target +
              ': 30 points. <br>Accumulated points: '+SASSI.score+'</center>'
    }));

    SASSI.display_element.append($('<div>',{
        id: 'progressbar',
        width: 500,
    }));

    SASSI.progress_bar.instance = new SASSI.progress_bar.prototype(max_value);
    $('#progressbar').progressbar('option','value',max_value);


    SASSI.display_element.append($('<div>', {
        html:'<center>'+
        '<button style="padding:10px; border-radius:10px; font-size:30px;"'+
        'onclick=SASSI.stimuli.mapclick()>Go To Map</button></center>',
    }));

    SASSI.display_element.append($('<div>', {id: 'container'}));

    SASSI.display_element.append('<center><br>For experimenter use (Please Ignore):' +
                            '<br><button onclick=savePlacingDataLocal()>Save Data</button>' +
                            '</center>');


    SASSI.stimuli = make_sassi_stimuli([SASSI.current_trial.search_cost,
                                            SASSI.current_trial.travel_cost],
                                       [SASSI.current_trial.location.data.room,
                                            SASSI.current_trial.location.data.loc],
                                        SASSI);

    SASSI.stimuli.mapclick = function() {
        SASSI.logger.map_view();
        SASSI.stimuli.load('map');
    }

    SASSI.stimuli.logger = SASSI.logger;

    setTimeout(function() {
        SASSI.stimuli.run(SASSI);
    }, 200);
}


/*
SASSI['finish_trial'] = function() {
    SASSI.logger.finish_trial();
    $('#progressbar').progressbar('option','value', SASSI.max_value);

    SASSI.display_element.html('')

    if(SASSI.stimuli.found){
        SASSI.display_element.append($('<div>', {
            id:'end_trial_text',
        }));
        endtext = '<center><h3>You found the '+SASSI.current_trial.target+'!</h3></center>';
    } else {
        SASSI.display_element.append($('<div>', {
            id:'end_trial_text',
        }));
        endtext = '<center><h3>You did not find the '+SASSI.current_trial.target+' in time.</h3></center>';
    }
    $('#end_trial_text').append(endtext);
    $('#end_trial_text').center_horiz();
    $('#end_trial_text').append('<center>' +
          '<span style="font-weight:bold;font-size:40px">' +
         '<img src=\"img/'+SASSI.current_trial.target+'.png"\ \/></span>' +
         '<br /><br /><span style="font-size: 16pt">(Press SPACEBAR to continue)</span></center>');
    $('#begin_trial_text').center_horiz();
    window.addEventListener('keypress', function temp (){
        display_element.html(''); // clear the display
        jsPsych.finishTrial();
        window.removeEventListener('keypress',temp,false);
    }, false);

}


*/

/*
backing up various code snippets... just in case

    get_score: function(){return running_score;},
    set_score: function(new_score){running_score=running_score+new_score;},
*/
