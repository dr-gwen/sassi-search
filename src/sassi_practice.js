var sassi_practice_block = function(trial){

		var success_snd = new Audio("audio/chaching.mp3");
		var fail_snd = new Audio("audio/squish.mp3");

		var prac = {};
		var redo = [];

		var canvas=document.createElement("canvas");
		var ctx=canvas.getContext("2d");
		canvas.width=800;
		canvas.height=600;
		var winrar = [];
		var clicked = [];
		clicked = [0,0,0,0,0,0];


		function clickcheck(trial,redo,node,winrar,id,goal,furniture,clicked,prac,stage){
			if(clicked[furniture.indexOf(id)]==0 && goal==id){
				clicked[furniture.indexOf(id)] = 1;
				winrar.push(goal);
				furniture.splice(furniture.indexOf(goal),1);
				drawText(node,'Correct!',stage);
				setTimeout(function() {prac.finish_trial();},1250);
				success_snd.play();
			} else {
				drawText(node,'Incorrect!',stage);
				fail_snd.play();
				console.trace(redo,winrar,id,goal,furniture,clicked);
			}
		}

		function drawText(layer,text,stage){
			var txt = new Kinetic.Text({
				x: stage.width()/2,
				y: 30,
				text: text,
				fontSize: 30,
				fontFamily: 'Verdana',
				fill: 'red'
			});
			txt.offsetX(txt.width()/2);
			layer.add(txt);
			txt.moveToTop();
			layer.draw();

			function shuffleText(txt){
				txt.moveToBottom();
				layer.draw();
			}

			setTimeout(function() {shuffleText(txt);},1000);
		}

		ctx.fillStyle='#FFFFFF';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		prac.load_room = {};
		prac.load_room['kitchen'] = function(trial) {
				var furniture = ['table','microwave','trash','sink','cabinets','oven'];

				var stage = new Kinetic.Stage({
					container: 'container',
					width: 800,
					height: 600
				});

				var layer = new Kinetic.Layer();

				var tab = [642,375,259,360,2156,202]; //table
				var cab = [170,100,474,124,801,260]; //cabinets
				var mic = [355,235,130,63,1078,395]; //microwave
				var si = [145,260,365,186,1273,375]; //sink
				var can = [-20,315,159,316,2756,0]; //trash can
				var ov = [483,272,174,187,1983,0]; //oven

				// define the spritemap and sprites
				var spritemap = new Image();
				spritemap.onload = function(){
					var cabinets = new Kinetic.Sprite({
						x: cab[0],
						y: cab[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								cab[4], cab[5], cab[2], cab[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var sink = new Kinetic.Sprite({
						x: si[0],
						y: si[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								si[4], si[5], si[2], si[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var oven = new Kinetic.Sprite({
						x: ov[0],
						y: ov[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								ov[4], ov[5], ov[2], ov[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var microwave = new Kinetic.Sprite({
						x: mic[0],
						y: mic[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								mic[4], mic[5], mic[2], mic[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var trash = new Kinetic.Sprite({
						x: can[0],
						y: can[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								can[4], can[5], can[2], can[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var table = new Kinetic.Sprite({
						x: tab[0],
						y: tab[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								tab[4], tab[5], tab[2], tab[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var kitch = new Kinetic.Image({
						x: 0,
						y: 0,
						image: spritemap,
						width: 3783,
						height: 600
					});

					function events(){
						// add event listeners to locations in scene
						microwave.on('click', function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','kitchen','microwave',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'microwave',trial.goal,furniture,clicked,prac,stage);
						});

						trash.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','kitchen','trash',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'trash',trial.goal,furniture,clicked,prac,stage);
						});

						sink.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','kitchen','sink',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'sink',trial.goal,furniture,clicked,prac,stage);
						});

						oven.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','kitchen','oven',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'oven',trial.goal,furniture,clicked,prac,stage);
						});

						table.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','kitchen','table',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'table',trial.goal,furniture,clicked,prac,stage);
						});

						cabinets.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','kitchen','cabinets',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'cabinets',trial.goal,furniture,clicked,prac,stage);
						});
					}

					layer.add(kitch,sink,cabinets,oven,microwave,table,trash);
					stage.add(layer);

					table.start();
					cabinets.start();
					sink.start();
					microwave.start();
					oven.start();
					trash.start();

					events();
				};
				spritemap.src = 'img/kitchen-spritemap.png';
			}
		prac.load_room['livingroom'] = function(trial) {
				var furniture = ['coffee table','couch','tv','bookshelf','coat','backpack'];

				var stage = new Kinetic.Stage({
					container: 'container',
					width: 800,
					height: 600
				});

				var layer = new Kinetic.Layer();

				// make arrays with relative coordinates for each location in the room

				var tab = [225,450,362,140,1525,428];//table
				var ent = [650,300,205,400,2399,0];//tv/entertainment center
				var cou = [230,300,358,152,1528,247];//couch
				var book = [225,175,360,240,1517,0];//bookshelf
				var coat = [70,272,99,308,2811,0];
				var back = [150,300,103,129,2823,360];

				var spritemap = new Image();
				spritemap.onload = function(){
					var bookshelf = new Kinetic.Sprite({
						x: book[0],
						y: book[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								book[4], book[5], book[2], book[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var couch = new Kinetic.Sprite({
						x: cou[0],
						y: cou[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								cou[4], cou[5], cou[2], cou[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var tv = new Kinetic.Sprite({
						x: ent[0],
						y: ent[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								ent[4], ent[5], ent[2], ent[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var table = new Kinetic.Sprite({
						x: tab[0],
						y: tab[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								tab[4], tab[5], tab[2], tab[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var coatrack = new Kinetic.Sprite({
						x: coat[0],
						y: coat[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								coat[4], coat[5], coat[2], coat[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var backpack = new Kinetic.Sprite({
						x: back[0],
						y: back[1],
						image: spritemap,
						animation: 'noglow',
						animations: {
							noglow: [
								back[4],back[5],back[2],back[3]
							],
						},
						frameRate: 0,
						frameIndex: 0
					});

					var liv = new Kinetic.Image({
						x: 0,
						y: 0,
						image: spritemap,
						width: 3484,
						height: 600
					});

					function events(){
						couch.on('click', function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','living','couch',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'couch',trial.goal,furniture,clicked,prac,stage);
						});

						tv.on('click', function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','living','tv',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'tv',trial.goal,furniture,clicked,prac,stage);
						});

						bookshelf.on('click', function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','living','bookshelf',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'bookshelf',trial.goal,furniture,clicked,prac,stage);
						});

						table.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','living','coffee table',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'coffee table',trial.goal,furniture,clicked,prac,stage);
						});

						backpack.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','living','backpack',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'backpack',trial.goal,furniture,clicked,prac,stage);
						});

						coatrack.on('click',function(evt){
							clicktime = (new Date()).getTime();
							prac.push_data(['room','living','coat',clicktime,trial.goal]);
							clickcheck(trial,redo,layer,winrar,'coat',trial.goal,furniture,clicked,prac,stage);
						});
					}

					layer.add(liv,backpack,bookshelf,couch,coatrack,table,tv);
					stage.add(layer);

					table.start();
					tv.start();
					couch.start();
					bookshelf.start();
					coatrack.start();
					backpack.start();

					events();
				};
				spritemap.src = 'img/living-room-spritemap.png';
		}

		prac.load = function(trial){
			prac.load_room[trial.room](trial);
		}


		prac.push_data = function(data_info){
			var datum = {};
			datum.view = 'practice';
			datum.room_loc = data_info[1];
			datum.item_clicked = data_info[2];
			datum.time_clicked = data_info[3];
			datum.goal = data_info[4];
			jsPsych.data.write(datum);
		};

		prac.handle_new_trial = function(){
			prac.start_time = (new Date()).getTime();
			prac.push_data(['practice trial',(new Date()).getTime()]);
			prac.load(trial);
		};

		prac.canvas = canvas;
		return prac;
}
