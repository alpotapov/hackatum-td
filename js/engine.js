// engine.js
var stage_width = 1000;
var stage_height = 480;
var grid_size = 40;

function init_game(){
	var stage = new Kinetic.Stage({
		container: 'battlefield',
		width: stage_width,
		height: stage_height
	});

	var bf_background = new Kinetic.Layer();
	init_grid(bf_background);

	var castle_1 = new Kinetic.Rect({
		x: grid_size*1,
		y: grid_size*6,
		width: grid_size*2,
		height: grid_size*3,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 1
	});
	bf_background.add(castle_1);

	var castle_2 = new Kinetic.Rect({
		x: grid_size*22,
		y: grid_size*6,
		width: grid_size*2,
		height: grid_size*3,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 1
	});
	bf_background.add(castle_2);


	// add the layer to the stage
	stage.add(bf_background);
}

function init_grid(layer){
	counter_horizontal = stage_width/grid_size;
	counter_vertical = stage_height/grid_size;

	console.log(counter_vertical);
	console.log(counter_horizontal);

	counter = 0;
	while (counter <= counter_vertical){
		var line = new Kinetic.Line({
			points: [0, counter*grid_size, stage_width, counter*grid_size],
			stroke: 'black',
			strokeWidth: 1
		});

		layer.add(line);

		counter++;
	}

	counter = 0;
	while (counter <= counter_horizontal){
		var line = new Kinetic.Line({
			points: [counter*grid_size, 0, counter*grid_size, stage_height],
			stroke: 'black',
			strokeWidth: 1
		});

		layer.add(line);

		counter++;
	}
}