/*
* A set of helper functions for the super awesome semantic search imps (SASSI) task.
* Author: B.c.McMahan
*/

function make_samplers(){
	/*
	* For this task, we  must have a sampler per item per probability dist time
	* For example, for the remote control, we must have a sampler for likely locations, as well as unlikely and uniform
	* basic pattern for weighted list:
    var somevar = new WeightedList(
	  [[0,1,{room: 'livingroom', loc: 'couch'}],
	   [1,1,{room: 'livingroom',loc:'tv'}],
	   [2,1,{room: 'kitchen',loc:'trash'}],
	   [3,1,{room: 'kitchen',loc:'cabinets'}],
	  ])

	The basic format is [id, count, {dataname:datavalue}]

	you can read more about it at https://github.com/timgilbert/js-weighted-list#

	as a point for quick prototyping, i tried to keep the numbers close to 10
	i.e. to keep the counts close to 10 so it resembled an easily interpretable distribution

	*/

	samplers = {};
      samplers.popping_style = false;


	samplers.sunglasses = {};
	samplers.sunglasses.onehundredcoherency = new WeightedList([
	[2,4,{room: 'living',loc:'table'}],
	[4,3,{room: 'living',loc:'backpack'}],
	[5,2,{room: 'living',loc:'coatrack'}],
	[8,1,{room: 'kitchen',loc:'table'}]]);
	samplers.sunglasses.zerocoherency = new WeightedList([
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[11,3,{room: 'kitchen',loc:'oven'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[10,2,{room: 'kitchen',loc:'microwave'}]]);
	samplers.sunglasses.fiftycoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[11,2,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[4,2,{room: 'living',loc:'backpack'}],
	[5,1,{room: 'living',loc:'coatrack'}]]);



	samplers.wallet = {};
	samplers.wallet.onehundredcoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[4,3,{room: 'living',loc:'backpack'}],
	[5,4,{room: 'living',loc:'coatrack'}],
	[8,1,{room: 'kitchen',loc:'table'}]]);
	samplers.wallet.zerocoherency = new WeightedList([
	[7,2,{room: 'kitchen',loc:'cabinets'}],
	[11,2,{room: 'kitchen',loc:'oven'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[10,2,{room: 'kitchen',loc:'microwave'}]]);
	samplers.wallet.fiftycoherency = new WeightedList([
	[2,1,{room: 'living',loc:'table'}],
	[11,1,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[4,2,{room: 'living',loc:'backpack'}],
	[5,2,{room: 'living',loc:'coatrack'}]]);



	samplers.keys = {};
	samplers.keys.onehundredcoherency = new WeightedList([
	[2,4,{room: 'living',loc:'table'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[5,3,{room: 'living',loc:'coatrack'}],
	[8,2,{room: 'kitchen',loc:'table'}]]);
	samplers.keys.zerocoherency = new WeightedList([
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[11,3,{room: 'kitchen',loc:'oven'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[10,2,{room: 'kitchen',loc:'microwave'}]]);
	samplers.keys.fiftycoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[11,2,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[5,2,{room: 'living',loc:'coatrack'}]]);


	samplers.receipt = {};
	samplers.receipt.onehundredcoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[5,3,{room: 'living',loc:'coatrack'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[6,3,{room: 'kitchen',loc:'trash'}]]);
	samplers.receipt.zerocoherency = new WeightedList([
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[11,3,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'living',loc:'tv'}],
	[9,3,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}]]);
	samplers.receipt.fiftycoherency = new WeightedList([
	[2,1,{room: 'living',loc:'table'}],
	[11,2,{room: 'kitchen',loc:'oven'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[5,2,{room: 'living',loc:'coatrack'}]]);



	samplers.mug = {};
	samplers.mug.onehundredcoherency = new WeightedList([
	[2,1,{room: 'living',loc:'table'}],
	[7,6,{room: 'kitchen',loc:'cabinets'}],
	[8,2,{room: 'kitchen',loc:'table'}],
	[9,1,{room: 'kitchen',loc:'sink'}]]);
	samplers.mug.zerocoherency = new WeightedList([
	[11,1,{room: 'kitchen',loc:'oven'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[4,2,{room: 'living',loc:'backpack'}],
	[3,1,{room: 'living',loc:'bookshelf'}],
	[5,2,{room: 'living',loc:'coatrack'}],
	[0,2,{room: 'living', loc: 'couch'}]]);
	samplers.mug.fiftycoherency = new WeightedList([
	[6,1,{room: 'kitchen',loc:'trash'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[7,5,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[5,1,{room: 'living',loc:'coatrack'}],
	[0,1,{room: 'living', loc: 'couch'}]]);



	samplers.phone = {};
	samplers.phone.onehundredcoherency = new WeightedList([
	[2,3,{room: 'living',loc:'table'}],
	[4,2,{room: 'living',loc:'backpack'}],
	[5,3,{room: 'living',loc:'coatrack'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[0,1,{room: 'living', loc: 'couch'}]]);
	samplers.phone.zerocoherency = new WeightedList([
	[7,2,{room: 'kitchen',loc:'cabinets'}],
	[11,2,{room: 'kitchen',loc:'oven'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[10,2,{room: 'kitchen',loc:'microwave'}]]);
	samplers.phone.fiftycoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[11,1,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[5,2,{room: 'living',loc:'coatrack'}]]);



	samplers.batteries = {};
	samplers.batteries.onehundredcoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[1,3,{room: 'living',loc:'tv'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[7,2,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[3,1,{room: 'living',loc:'bookshelf'}]]);
	samplers.batteries.zerocoherency = new WeightedList([
	[11,3,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}],
	[5,1,{room: 'living',loc:'coatrack'}],
	[0,1,{room: 'living', loc: 'couch'}]]);
	samplers.batteries.fiftycoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[11,3,{room: 'kitchen',loc:'oven'}],
	[1,3,{room: 'living',loc:'tv'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}],
	[7,2,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[3,1,{room: 'living',loc:'bookshelf'}],
	[5,1,{room: 'living',loc:'coatrack'}],
	[0,1,{room: 'living', loc: 'couch'}]]);



	samplers.blicket = {};
	samplers.blicket.onehundredcoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[1,1,{room: 'living',loc:'tv'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[3,1,{room: 'living',loc:'bookshelf'}],
	[5,1,{room: 'living',loc:'coatrack'}],
	[0,1,{room: 'living', loc: 'couch'}]]);
	samplers.blicket.zerocoherency = new WeightedList([
	[11,2,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}],
	[8,1,{room: 'kitchen',loc:'table'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[5,1,{room: 'living',loc:'coatrack'}]]);
	samplers.blicket.fiftycoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[11,2,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'living',loc:'tv'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[7,2,{room: 'kitchen',loc:'cabinets'}],
	[4,2,{room: 'living',loc:'backpack'}],
	[3,1,{room: 'living',loc:'bookshelf'}],
	[5,2,{room: 'living',loc:'coatrack'}],
	[0,1,{room: 'living', loc: 'couch'}]]);



	samplers.lipbalm = {};
	samplers.lipbalm.onehundredcoherency = new WeightedList([
	[2,1,{room: 'living',loc:'table'}],
	[4,6,{room: 'living',loc:'backpack'}],
	[5,3,{room: 'living',loc:'coatrack'}]]);
	samplers.lipbalm.zerocoherency = new WeightedList([
	[11,2,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'living',loc:'tv'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}]]);
	samplers.lipbalm.fiftycoherency = new WeightedList([
	[11,1,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[4,4,{room: 'living',loc:'backpack'}],
	[5,2,{room: 'living',loc:'coatrack'}]]);



	samplers.remote = {};
	samplers.remote.onehundredcoherency = new WeightedList([
	[2,3,{room: 'living',loc:'table'}],
	[1,5,{room: 'living',loc:'tv'}],
	[0,2,{room: 'living', loc: 'couch'}]]);
	samplers.remote.zerocoherency = new WeightedList([
	[11,2,{room: 'kitchen',loc:'oven'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}],
	[7,1,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}],
	[5,1,{room: 'living',loc:'coatrack'}]]);
	samplers.remote.fiftycoherency = new WeightedList([
	[2,2,{room: 'living',loc:'table'}],
	[11,1,{room: 'kitchen',loc:'oven'}],
	[1,4,{room: 'living',loc:'tv'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[10,1,{room: 'kitchen',loc:'microwave'}],
	[0,1,{room: 'living', loc: 'couch'}]]);



	samplers.aspirin = {};
	samplers.aspirin.onehundredcoherency = new WeightedList([
	[7,9,{room: 'kitchen',loc:'cabinets'}],
	[4,1,{room: 'living',loc:'backpack'}]]);
	samplers.aspirin.zerocoherency = new WeightedList([
	[11,2,{room: 'kitchen',loc:'oven'}],
	[1,1,{room: 'living',loc:'tv'}],
	[6,2,{room: 'kitchen',loc:'trash'}],
	[9,2,{room: 'kitchen',loc:'sink'}],
	[10,2,{room: 'kitchen',loc:'microwave'}],
	[0,1,{room: 'living', loc: 'couch'}]]);
	samplers.aspirin.fiftycoherency = new WeightedList([
	[7,6,{room: 'kitchen',loc:'cabinets'}],
	[11,1,{room: 'kitchen',loc:'oven'}],
	[9,1,{room: 'kitchen',loc:'sink'}],
	[6,1,{room: 'kitchen',loc:'trash'}],
	[10,1,{room: 'kitchen',loc:'microwave'}]]);


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
