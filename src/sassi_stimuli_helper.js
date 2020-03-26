
// The messy definition stuff
// ==========================

var STIMULI = STIMULI || {};

STIMULI.rooms = {
    "kitchen": {
        x_y : [0,0],
        width : 3783,
        height : 600,
        load_order: ["sink", "cabinets", "oven","microwave", "table", "trash"],
    },
    "livingroom": {
        x_y : [0,0],
        width : 3484,
        height : 600,
        load_order: ["backpack", "bookshelf", "couch", "coatrack", "table", "tv"],
    },
    "map": {
        x_y : [0,0],
        width: 3296,
        height: 600
    }

}

STIMULI.rooms.map.locations = {
    "button_k": {
        x_y: [225, 258],
        coords: [2401, 0, 87, 84],
        target: "livingroom",
    },
    "button_l": {
        x_y: [492, 258],
        coords: [2401, 84, 87, 84],
        target: "livingroom",
    },
    "mark": {
        x_y: [(225+492)/2, 258],
        coords: [2405, 170, 82, 84],
        target: "",
    }
}


STIMULI.rooms.livingroom.locations = {
    "couch": {
        x_y : [230, 300],
        coords : [
            [802, 247, 358, 152],
            [1166, 247, 358, 152],
            [1528, 247, 358, 152]
        ],
        click_shift : [-200, -250],
    },
    "tv": {
        x_y : [650, 300],
        coords : [
            [1891, 0, 205, 400],
            [2149, 0, 205, 400],
            [2399, 0, 205, 400]
        ],
        click_shift : [-400, -300],
    },
    "table": {
        x_y : [225, 450],
        coords : [
            [804, 428, 362, 140],
            [1165, 428, 362, 140],
            [1525, 428, 362, 140]
        ],
        click_shift : [-200, -300],
    },
    "bookshelf": {
        x_y : [225, 175],
        coords : [
            [803, 0, 355, 240],
            [1160, 0, 355, 240],
            [1517, 0, 360, 240]
        ],
        click_shift : [-200, -75],
    },
    "coatrack": {
        x_y : [70, 272],
        coords : [
            [2617, 0, 99, 308],
            [2717, 0, 93, 308],
            [2811, 0, 99, 308]
        ],
        click_shift : [0, -300],
    },
    "backpack": {
        x_y : [150, 300],
        coords : [
            [2627, 359, 103, 129],
            [2727, 359, 103, 129],
            [2823, 359, 103, 129]
        ],
        click_shift : [-100, -200],
    }
}

STIMULI.rooms.kitchen.locations = {
    "table": {
        x_y : [642, 375],
        coords : [
            [1636, 202, 259, 360],
            [1895, 202, 259, 360],
            [2156, 202, 259, 360]
        ],
        click_shift : [-400, -300],
    },
    "microwave": {
        x_y : [355, 235],
        coords : [
            [812, 395, 130, 63],
            [933, 395, 130, 63],
            [1078, 395, 130, 63]
        ],
        click_shift : [-170, -100],
    },
    "trash": {
        x_y : [-20, 315],
        coords : [
            [2402, 0, 159, 316],
            [2580, 0, 159, 316],
            [2756, 0, 159, 316]
        ],
        click_shift : [0, -250],
    },
    "sink": {
        x_y : [145, 260],
        coords : [
            [1275, 0, 365, 186],
            [1275, 186, 365, 186],
            [1273, 375, 365, 186]
        ],
        click_shift : [-40, -150],
    },
    "cabinets": {
        x_y : [170, 100],
        coords : [
            [801, 1, 474, 124],
            [801, 127, 474, 124],
            [801, 260, 474, 124]
        ],
        click_shift : [-210, -100],
    },
    "oven": {
        x_y : [483, 272],
        coords : [
            [1636, 0, 174, 187],
            [1810, 0, 174, 187],
            [1983, 0, 174, 187]
        ],
        click_shift : [-350, -150],
    },
}

// THE INTERESTING STUFF STARTS NOW


STIMULI.xclick = -1;
STIMULI.yclick = -1;


// defining and loading sounds
STIMULI.sound = {
    success: new Audio("audio/chaching.mp3"),
    fail: new Audio("audio/squish.mp3")
}
//console.trace(sc_cost,tc_cost,room_loc,sub_loc);
// VARIABLE DEFINITIONS


STIMULI.layers = [];

STIMULI.clicktime;

// has the target been found yet?
STIMULI.found = 0;

/* arrays to log time (using Date.now(), milliseconds since 00:00 UTC January 1st 1970),
x,y position of mouse when mouse clicks a location (searchable or not), and clicked
locations (furniture, whatever you want to call it) within the room--again, searchable
 or not. */
STIMULI.times = new Array();
STIMULI.mousepos = new Array();
STIMULI.mouseloc = new Array();



// array logs messages about behavior
STIMULI.messages = new Array();

// where the marker should be on the map
STIMULI.last_x='undefined';
STIMULI.goal_room = "";
STIMULI.goal_loc = "";

STIMULI.isFound = function(room, loc) {
    return (room==STIMULI.goal_room && loc==STIMULI.goal_loc);
}



STIMULI.reset = function(location, search_cost) {
    STIMULI.targetloc = location;
    STIMULI.SC = [1,search_cost];
}

STIMULI.doRoomTween = function(that, room, loc,duration){
    STIMULI.not_searching = false;
    tween = new Kinetic.Tween({
            x: that.click_shift[0],
            y: that.click_shift[1],
            node: that.callback.layer,
            duration: (that.callback.cost/2),
            scaleX: 1.5,
            scaleY: 1.5,
            easing: Kinetic.Easings.EasInOut,
            onFinish: function(){
                tween.reverse();
            }
        });
    tween.play();

    function updateSearch(room,loc){
        STIMULI.not_searching = true;
        console.log('checking to see if '+room+','+loc+' is our target');
        if(STIMULI.isFound(room,loc)){
            STIMULI.not_searching = false;
            STIMULI.handleSuccess();
        } else {
            STIMULI.handleFailure();
        }
    }

    setTimeout(function() {updateSearch(room,loc);},(duration*1000));
}


STIMULI.doMapTween = function(xshift, yshift, that, room){
    tween = new Kinetic.Tween({
        x: xshift,
        y: yshift,
        node: that.mark,
        duration: that.cost,
        scaleX: 1,
        scaleY: 1,
        easing: Kinetic.Easings.EaseInOut,
        onFinish: function(){
            STIMULI.load(room);
        }
    });
    tween.play();
}

STIMULI.make_map_sprite = function(x_y, image, coords) {
    return new Kinetic.Sprite({
        x: x_y[0],
        y: x_y[1],
        image: image,
        animation: 'none',
        animations: {
            none: [
                coords[0], coords[1], coords[2], coords[3]
                // note that we are changing the order from 2,3,0,1  to 0,1,2,3
            ],
        },
        frameRate: 0,
        frameIndex: 0
    });
}

STIMULI.make_room_sprite = function(x_y, image, coords) {
    var c1 = coords[0];
    var c2 = coords[1];
    var c3 = coords[2];
    return new Kinetic.Sprite({
        x: x_y[0],
        y: x_y[1],
        image: image,
        animation: 'noglow',
        animations: {
            noglow: c1,
            lowglow: c2,
            higlow: c3,
        },
        frameRate: 0,
        frameIndex: 0
    });
}


STIMULI.proto_location = function(name, sprite_info, image, callback){
    var that = this;
    that.x_y = sprite_info.x_y;
    that.coords = sprite_info.coords;
    that.click_shift = sprite_info.click_shift;
    that.sprite = STIMULI.make_room_sprite(that.x_y, image, that.coords);
    that.is_clickable = true;
    that.is_searchable = true;
    that.callback = callback;
    that.name = name;

    that.reset = function() {
        that.is_clickable = true;
        that.is_searchable = true;
    }

    that.higlow = function() {
        if (that.is_clickable) {
            that.sprite.animation('higlow');
        }
    }

    that.click = function () {
        STIMULI.logger.location_click(callback.name, that.name, that.is_clickable);
        console.log('being clicked: '+that.name);
        if (that.is_clickable) {
            that.sprite.animation('noglow');
        }
        if (that.is_searchable && that.is_clickable) {
            console.log('calling do tween');
            STIMULI.doRoomTween(that, that.callback.name, that.name, that.callback.cost);
        }
        that.is_clickable = false;
        that.is_searchable = false;
    }
}


STIMULI.proto_room = function(name, cost, image_loc) {
    var that = this;
    that.name = name;
    that.cost = cost;
    that.layer = new Kinetic.Layer();
    that.image = new Image();
    that.locations = []
    that.is_on = false;

    var loc_info = STIMULI.rooms[name].locations;
    console.log(name);

    that.reset = function() {
        for (loci in that.locations) {
            (function(loc) {
                that.locations[loc].reset();
            })(loci);
        }
    }

    that.turn_on = function(active_room, callback) {
        if (!(that.is_on)) {
            console.log('starting to turn on '+that.name);
            for (loci in that.locations) {
                (function(loc) {
                    that.locations[loc].higlow();
                    that.locations[loc].sprite.on('click', function(evt) {
                        console.log('click from room level: '+loc);
                        if (STIMULI.not_searching) {
                            console.log('room is letting it call the loc click handler');
                            clicktime = (new Date()).getTime();
                            //STIMULI.logger.loc_click(['room', that.name,
                            //                          that.locations[loc].name,
                            //                          clicktime, evt.pageX, evt.pageY]);
                            that.locations[loc].click();
                        }
                    });
                    that.locations[loc].sprite.start();
                })(loci);
            }
            callback.stage.add(that.layer);
        }

        //that.layer.setZIndex(10);
        that.is_on = true;
    }

    that.turn_off = function(callback) {
        if (that.is_on) {
            for (loc in that.locations) {
                that.locations[loc].sprite.off('click');
                that.locations[loc].sprite.stop();
            }
            that.layer.remove();
        }

        //that.layer.setZIndex(1);
        that.is_on = false;
    }

    that.image.onload = function(){
        console.log('in the loading of '+that.name);
        that.room_image = new Kinetic.Image({
            x: STIMULI.rooms[name].x_y[0],
            y: STIMULI.rooms[name].x_y[1],
            image: that.image,
            width: STIMULI.rooms[name].x_y.width,
            height: STIMULI.rooms[name].x_y.height
        });

        that.layer.add(that.room_image);

        for (order_i in STIMULI.rooms[that.name].load_order) {
            var loc_name = STIMULI.rooms[that.name].load_order[order_i];
            console.log('trying to on image load things' + loc_name);
            indiv_loc_info = loc_info[loc_name]
            new_loc = new STIMULI.proto_location(loc_name, indiv_loc_info,
                                                            that.image, that);
            that.layer.add(new_loc.sprite);
            that.locations.push(new_loc);
        }

    }

    that.image.src = image_loc;

}

STIMULI.map_prototype = function(name, cost, image_loc,callback) {
    var that = this;
    that.name = name;
    that.cost = cost;
    that.layer = new Kinetic.Layer();
    that.image = new Image();
    that.locations = []
    that.is_on = false;

    var loc_info = STIMULI.rooms[name].locations;

    that.reset = function() {
        that.mark.setX(loc_info['mark'].x_y[0]);
        that.mark.setY(loc_info['mark'].x_y[1]);
    }

    that.turn_on = function(active_room, callback) {
        console.log('turning map buttons on');
        if (!(that.is_on)) {
            STIMULI.map_free = true;
            that.button_l.on('click', function(evt) {
                if (STIMULI.map_free) {
                    STIMULI.map_free = false;
                    STIMULI.logger.room_click('livingroom');
                    STIMULI.doMapTween(loc_info['button_l'].x_y[0],
                                                   loc_info['button_l'].x_y[1],
                                                   that,
                                                   'livingroom');
                }
            });
            that.button_k.on('click', function(evt) {
                if (STIMULI.map_free) {
                    STIMULI.map_free = false;
                    STIMULI.logger.room_click('kitchen');
                    STIMULI.doMapTween(loc_info['button_k'].x_y[0],
                                                   loc_info['button_k'].x_y[1],
                                                   that,
                                                   'kitchen');
                }
            });
            that.mark.on('click', function(evt) {
                if (active_room == "") {
                    return;
                }
                else {
                    if (STIMULI.map_free) {
                        STIMULI.logger.room_click(active_room);
                        STIMULI.map_free = false;
                        STIMULI.load(active_room);
                    }
                }
            });
            that.button_l.start();
            that.button_k.start();
            that.mark.start();
        }
        callback.stage.add(that.layer);
        //that.layer.setZIndex(10);
        that.is_on = true;
    }

    that.turn_off = function(callback) {
        if (that.is_on) {
            that.button_l.off('click');
            that.button_k.off('click');
            that.mark.off('click');
            that.button_l.stop();
            that.button_k.stop();
            that.mark.stop();
            that.layer.remove();
        }

        //that.layer.setZIndex(1);

        that.is_on = false;
    }

    that.image.onload = function(){
        console.log("in the onload of the map");
        that.room_image = new Kinetic.Image({
            x: STIMULI.rooms[name].x_y[0],
            y: STIMULI.rooms[name].x_y[1],
            image: that.image,
            width: STIMULI.rooms[name].x_y.width,
            height: STIMULI.rooms[name].x_y.height
        });

        that.mark = STIMULI.make_map_sprite(loc_info['mark'].x_y, that.image,
                                            loc_info['mark'].coords);

        that.button_k = STIMULI.make_map_sprite(loc_info['button_k'].x_y, that.image,
                                                loc_info['button_k'].coords);

        that.button_l = STIMULI.make_map_sprite(loc_info['button_l'].x_y, that.image,
                                                loc_info['button_l'].coords);


        that.layer.add(that.room_image);
        that.layer.add(that.button_k);
        that.layer.add(that.button_l);
        that.layer.add(that.mark);
        /*
        that.tweens = {
            "livingroom": STIMULI.makeMapTween(loc_info['button_l'].x_y[0],
                                               loc_info['button_l'].x_y[1],
                                               that.mark,
                                               that.cost,
                                               'livingroom'),

            "kitchen": STIMULI.makeMapTween(loc_info['button_k'].x_y[0],
                                               loc_info['button_k'].x_y[1],
                                               that.mark,
                                               that.cost,
                                               'kitchen'),
        }
        */
    };
    that.image.src = image_loc;

}

STIMULI.handleSuccess = function() {
    console.log('in the handle succes');
    if (STIMULI.timeout) {
        console.log('but we have timed out. bummer');
        STIMULI.handleFailure(true);
    }
    else {
        STIMULI.found = true;
        STIMULI.sound.success.play()
        STIMULI.drawText(STIMULI.active_layer.layer, 'Found!', STIMULI.stage);
        setTimeout(function(){STIMULI.finish();}, 1000);
    }
}

STIMULI.handleFailure = function(timedout) {
    if (timedout || STIMULI.timeout) {
        STIMULI.sound.fail.play();
        //STIMULI.drawText(STIMULI.active_layer.layer, "Out of time.", STIMULI.stage);
        setTimeout(function(){STIMULI.finish();},1000);
    }
    else{
        STIMULI.sound.fail.play();
        STIMULI.drawText(STIMULI.active_layer.layer, "Nothing here.", STIMULI.stage);
    }
}


STIMULI.drawText = function(layer,text,stage){
    var txt = new Kinetic.Text({
        x: stage.width()/2,
        y: 15,
        text: text,
        fontSize: 30,
        fontFamily: 'Verdana',
        fill: 'red'
    });
    txt.offsetX(txt.width()/2);
    layer.add(txt);
    txt.moveToTop();
    layer.draw();

    function removeText(txt){
        txt.remove();
    }

    setTimeout(function() {removeText(txt);},900);
}

STIMULI.load = function(active_room) {

    for (room in STIMULI.layers) {
        if (room == active_room) {
            STIMULI.layers[room].turn_on(STIMULI.active_room, STIMULI);
            STIMULI.active_layer = STIMULI.layers[room];
            STIMULI.active_room = room;
        }
        else {
            STIMULI.layers[room].turn_off(STIMULI);
        }
    }
}


