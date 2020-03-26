


var make_sassi_stimuli = function(costs, location, callback) {
    console.log('costs: '+costs);

    $(document).mousemove(function(event){
        STIMULI.xclick = event.pageX;
        STIMULI.yclick = event.pageY;
    });

    STIMULI.goal_room = location[0];
    STIMULI.goal_loc = location[1];

    //******************** DEPRECATED
    /*********************
    STIMULI.canvas=document.createElement("canvas");
    STIMULI.ctx=STIMULI.canvas.getContext("2d");
    STIMULI.canvas.width=800;
    STIMULI.canvas.height=600;
    ***********************/

    STIMULI.timeout = false;
    STIMULI.found = false;
    STIMULI.not_searching = true;

    STIMULI.finish = callback.finish;
    STIMULI.callback = callback;


    STIMULI.run = function(callback) {

        STIMULI.stage = new Kinetic.Stage({
            container: 'container',
            width: 800,
            height: 600
        });

        if (STIMULI.layers.length == 0) {
            STIMULI.layers = {
                "map": new STIMULI.map_prototype('map', costs[1],
                                          'img/map-spritemap.png'),
                "livingroom": new STIMULI.proto_room("livingroom", costs[0],
                                                 "img/living-room-spritemap.png"),
                "kitchen": new STIMULI.proto_room("kitchen", costs[0],
                                              "img/kitchen-spritemap.png"),
            }
        }
        else{
            for (layername in STIMULI.layers) {
                STIMULI.layers[layername].reset();
            }
        }


        setTimeout(function(){
            for (room in STIMULI.layers) {
                console.log(STIMULI.layers[room].layer)
                //STIMULI.stage.add(STIMULI.layers[room].layer)
             }
            STIMULI.not_searching = true;
            STIMULI.load('map');
            STIMULI.start_time = (new Date()).getTime();
            callback.progress_bar.counter = setInterval(callback.progress_bar.instance.update,1000);
           console.log('spoiler: its in the '+callback.current_trial.location.data.loc);
        }, 300);
    }

    return STIMULI;
}
