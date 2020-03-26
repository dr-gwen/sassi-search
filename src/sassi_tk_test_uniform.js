/*
* A set of helper functions for the super awesome semantic search imps (SASSI) task.
* Author: B.c.McMahan

* Modified 6/6/15 by GLR *

*/

function pick_ten(list){
	
	indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

	  return array;
	}
	
	indices = indices.slice(0,10);	
	var temp = new WeightedList();
	for(i = 0; i<10;i++){
		temp.push([i, 1, list[indices[i]]]);
	}
	return temp;
}

function make_samplers(){
	/*
	* For this task, we  must have a sampler per item per probability dist time
	* For example, for the remote control, we must have a sampler for likely locations, as well as unlikely and uniform
	* basic pattern for weighted list:
    var somevar = new WeightedList(
	  [[0,1,{room: 'livingroomroom', loc: 'couch'}],
	   [1,1,{room: 'livingroomroom',loc:'tv'}],
	   [2,1,{room: 'kitchen',loc:'trash'}],
	   [3,1,{room: 'kitchen',loc:'cabinets'}],
	  ])

	The basic format is [id, count, {dataname:datavalue}]

	you can read more about it at https://github.com/timgilbert/js-weighted-list#

	as a point for quick prototyping, i tried to keep the numbers close to 10
	i.e. to keep the counts close to 10 so it resembled an easily interpretable distribution

	*/

	samplers = {};
      samplers.popping_style = true;


	samplers.sunglasses = {};
	samplers.sunglasses.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'table'}],
	[3,1,{room: 'livingroom',loc:'table'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'backpack'}],
	[6,1,{room: 'livingroom',loc:'backpack'}],
	[7,1,{room: 'livingroom',loc:'coatrack'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'kitchen',loc:'table'}]]);
	samplers.sunglasses.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'oven'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[7,1,{room: 'kitchen',loc:'trash'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'kitchen',loc:'microwave'}]]);
	samplers.sunglasses.fiftycoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'oven'}],
	[4,1,{room: 'kitchen',loc:'trash'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'livingroom',loc:'backpack'}],
	[8,1,{room: 'livingroom',loc:'backpack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);



	samplers.wallet = {};
	samplers.wallet.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'backpack'}],
	[3,1,{room: 'livingroom',loc:'backpack'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'livingroom',loc:'coatrack'}],
	[7,1,{room: 'livingroom',loc:'coatrack'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'kitchen',loc:'table'}]]);
	samplers.wallet.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'cabinets'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'oven'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[7,1,{room: 'kitchen',loc:'trash'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'kitchen',loc:'microwave'}]]);
	samplers.wallet.fiftycoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'livingroom',loc:'table'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'kitchen',loc:'oven'}],
	[7,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'microwave'}],
	[10,1,{room: 'livingroom',loc:'bookshelf'}],
	[11,1,{room: 'livingroom',loc:'couch'}]]);

	samplers.keys = {};
	samplers.keys.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'table'}],
	[3,1,{room: 'livingroom',loc:'table'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'livingroom',loc:'coatrack'}],
	[7,1,{room: 'livingroom',loc:'coatrack'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[9,1,{room: 'kitchen',loc:'table'}]]);
	samplers.keys.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'oven'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[7,1,{room: 'kitchen',loc:'trash'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'kitchen',loc:'microwave'}]]);
	samplers.keys.fiftycoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'livingroom',loc:'table'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'kitchen',loc:'oven'}],
	[7,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'microwave'}],
	[10,1,{room: 'livingroom',loc:'bookshelf'}],
	[11,1,{room: 'livingroom',loc:'couch'}]]);
	samplers.keys.fiftycoherency = pick_ten(samplers.keys.fiftycoherency.data);


	samplers.receipt = {};
	samplers.receipt.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'backpack'}],
	[3,1,{room: 'livingroom',loc:'coatrack'}],
	[4,1,{room: 'livingroom',loc:'coatrack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'kitchen',loc:'table'}],
	[7,1,{room: 'kitchen',loc:'trash'}],
	[8,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'trash'}]]);
	samplers.receipt.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'oven'}],
	[4,1,{room: 'livingroom',loc:'tv'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'sink'}],
	[7,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'kitchen',loc:'microwave'}]]);
	samplers.receipt.fiftycoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'trash'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'sink'}],
	[7,1,{room: 'kitchen',loc:'microwave'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);



	samplers.mug = {};
	samplers.mug.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'kitchen',loc:'cabinets'}],
	[2,1,{room: 'kitchen',loc:'cabinets'}],
	[3,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'kitchen',loc:'cabinets'}],
	[5,1,{room: 'kitchen',loc:'cabinets'}],
	[6,1,{room: 'kitchen',loc:'cabinets'}],
	[7,1,{room: 'kitchen',loc:'table'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[9,1,{room: 'kitchen',loc:'sink'}]]);
	samplers.mug.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'trash'}],
	[2,1,{room: 'kitchen',loc:'trash'}],
	[3,1,{room: 'livingroom',loc:'backpack'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'bookshelf'}],
	[6,1,{room: 'livingroom',loc:'coatrack'}],
	[7,1,{room: 'livingroom',loc:'coatrack'}],
	[8,1,{room: 'livingroom', loc: 'couch'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	samplers.mug.fiftycoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'trash'}],
	[1,1,{room: 'kitchen',loc:'table'}],
	[2,1,{room: 'kitchen',loc:'cabinets'}],
	[3,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'kitchen',loc:'cabinets'}],
	[5,1,{room: 'kitchen',loc:'cabinets'}],
	[6,1,{room: 'kitchen',loc:'cabinets'}],
	[7,1,{room: 'livingroom',loc:'backpack'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	samplers.mug.fiftycoherency = pick_ten(samplers.mug.fiftycoherency.data);

	samplers.phone = {};
	samplers.phone.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'table'}],
	[3,1,{room: 'livingroom',loc:'backpack'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'livingroom',loc:'coatrack'}],
	[7,1,{room: 'livingroom',loc:'coatrack'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	samplers.phone.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'cabinets'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'oven'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[7,1,{room: 'kitchen',loc:'trash'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'kitchen',loc:'microwave'}]]);
	samplers.phone.fiftycoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'microwave'}],
	[6,1,{room: 'kitchen',loc:'cabinets'}],
	[7,1,{room: 'livingroom',loc:'backpack'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);

	samplers.batteries = {};
	samplers.batteries.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'livingroom',loc:'tv'}],
	[4,1,{room: 'livingroom',loc:'tv'}],
	[5,1,{room: 'kitchen',loc:'table'}],
	[6,1,{room: 'kitchen',loc:'cabinets'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[8,1,{room: 'livingroom',loc:'backpack'}],
	[9,1,{room: 'livingroom',loc:'bookshelf'}]]);
	samplers.batteries.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'kitchen',loc:'microwave'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	samplers.batteries.fiftycoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'livingroom',loc:'table'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'kitchen',loc:'oven'}],
	[7,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'microwave'}],
	[10,1,{room: 'livingroom',loc:'bookshelf'}],
	[11,1,{room: 'livingroom',loc:'couch'}]]);
	samplers.batteries.fiftycoherency = pick_ten(samplers.batteries.fiftycoherency.data);



	samplers.blicket = {};
	samplers.blicket.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'table'}],
	[6,1,{room: 'kitchen',loc:'cabinets'}],
	[7,1,{room: 'livingroom',loc:'backpack'}],
	[8,1,{room: 'livingroom',loc:'bookshelf'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	samplers.blicket.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'trash'}],
	[3,1,{room: 'kitchen',loc:'sink'}],
	[4,1,{room: 'kitchen',loc:'microwave'}],
	[5,1,{room: 'kitchen',loc:'microwave'}],
	[6,1,{room: 'kitchen',loc:'table'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[8,1,{room: 'livingroom',loc:'backpack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);
	samplers.blicket.fiftycoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'microwave'}],
	[5,1,{room: 'kitchen',loc:'table'}],
	[6,1,{room: 'kitchen',loc:'table'}],
	[7,1,{room: 'livingroom',loc:'backpack'}],
	[8,1,{room: 'livingroom',loc:'bookshelf'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);



	samplers.lipbalm = {};
	samplers.lipbalm.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'backpack'}],
	[2,1,{room: 'livingroom',loc:'backpack'}],
	[3,1,{room: 'livingroom',loc:'backpack'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'backpack'}],
	[6,1,{room: 'livingroom',loc:'backpack'}],
	[7,1,{room: 'livingroom',loc:'coatrack'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);
	samplers.lipbalm.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'trash'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'sink'}],
	[7,1,{room: 'kitchen',loc:'microwave'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'kitchen',loc:'cabinets'}]]);
	samplers.lipbalm.fiftycoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'trash'}],
	[2,1,{room: 'kitchen',loc:'sink'}],
	[3,1,{room: 'kitchen',loc:'microwave'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'backpack'}],
	[6,1,{room: 'livingroom',loc:'backpack'}],
	[7,1,{room: 'livingroom',loc:'backpack'}],
	[8,1,{room: 'livingroom',loc:'coatrack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);



	samplers.remote = {};
	samplers.remote.onehundredcoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'table'}],
	[3,1,{room: 'livingroom',loc:'tv'}],
	[4,1,{room: 'livingroom',loc:'tv'}],
	[5,1,{room: 'livingroom',loc:'tv'}],
	[6,1,{room: 'livingroom',loc:'tv'}],
	[7,1,{room: 'livingroom',loc:'tv'}],
	[8,1,{room: 'livingroom', loc: 'couch'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	samplers.remote.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'kitchen',loc:'trash'}],
	[3,1,{room: 'kitchen',loc:'sink'}],
	[4,1,{room: 'kitchen',loc:'sink'}],
	[5,1,{room: 'kitchen',loc:'microwave'}],
	[6,1,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[8,1,{room: 'livingroom',loc:'backpack'}],
	[9,1,{room: 'livingroom',loc:'coatrack'}]]);
	samplers.remote.fiftycoherency = new WeightedList([
	[0,1,{room: 'livingroom',loc:'table'}],
	[1,1,{room: 'livingroom',loc:'table'}],
	[2,1,{room: 'kitchen',loc:'oven'}],
	[3,1,{room: 'livingroom',loc:'tv'}],
	[4,1,{room: 'livingroom',loc:'tv'}],
	[5,1,{room: 'livingroom',loc:'tv'}],
	[6,1,{room: 'livingroom',loc:'tv'}],
	[7,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);

	samplers.aspirin = {};
	samplers.aspirin.onehundredcoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'cabinets'}],
	[2,1,{room: 'kitchen',loc:'cabinets'}],
	[3,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'kitchen',loc:'cabinets'}],
	[5,1,{room: 'kitchen',loc:'cabinets'}],
	[6,1,{room: 'kitchen',loc:'cabinets'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[8,1,{room: 'kitchen',loc:'cabinets'}],
	[9,1,{room: 'livingroom',loc:'backpack'}]]);
	samplers.aspirin.zerocoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'kitchen',loc:'oven'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'kitchen',loc:'trash'}],
	[4,1,{room: 'kitchen',loc:'trash'}],
	[5,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'sink'}],
	[7,1,{room: 'kitchen',loc:'microwave'}],
	[8,1,{room: 'kitchen',loc:'microwave'}],
	[9,1,{room: 'livingroom', loc: 'couch'}]]);
	// this might not work!!! changing 50/50 coherency to be uniform 
	samplers.aspirin.fiftycoherency = new WeightedList([
	[0,1,{room: 'kitchen',loc:'cabinets'}],
	[1,1,{room: 'kitchen',loc:'table'}],
	[2,1,{room: 'livingroom',loc:'tv'}],
	[3,1,{room: 'livingroom',loc:'table'}],
	[4,1,{room: 'livingroom',loc:'backpack'}],
	[5,1,{room: 'livingroom',loc:'coatrack'}],
	[6,1,{room: 'kitchen',loc:'oven'}],
	[7,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'microwave'}],
	[10,1,{room: 'livingroom',loc:'bookshelf'}],
	[11,1,{room: 'livingroom',loc:'couch'}]]);


      samplers.get = function(object_type, sampling_type) {
        if (samplers.popping_style) {
            return samplers[object_type][sampling_type].pop()[0];
        }
        else {
            return samplers[object_type][sampling_type].peek()[0];
        }
      }

	return samplers;
}

function GetSubjectNumber()
{
    var snum = Math.floor(Math.random() * 1000000000);
    var d = new Date();
   return (d.getMonth()+1).toString()+"_"+(d.getDate()).toString()+"_"+(d.getHours()).toString()+"_"+snum.toString();
}

function saveData(filedata){
   filename = "sassi_data_"+GetSubjectNumber()+".csv";
   $.ajax({
      type:'post',
      cache: false,
      url: 'save_data.php', // this is the path to the above PHP script
      data: {filename: filename, filedata: filedata}
   });
}

function saveDataLocally(optional){
  if (typeof optional === "undefined"){ filename = "sassi_data_"+GetSubjectNumber()+".csv"; }
  else { filename = "sassi_data_"+optional+'_'+GetSubjectNumber()+".csv"; }
  jsPsych.data.localSave(filename,'csv');
}

function savePlacingDataLocal(){
  saveDataLocally("placing");
}

function loadScript(url, callback){
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
