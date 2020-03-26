function nextBlock(task){
	var start = 'search_task_';
	var ext = '.html';
	var page1 = start.concat(task);
	var page = page1.concat(ext);
	window.location = page;
}