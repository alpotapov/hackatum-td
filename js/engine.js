// engine.js
var stage_width = 1000;
var stage_height = 600;

function init_game(){
	var stage = new Kinetic.Stage({
		container: 'battlefield',
		width: stage_width,
		height: stage_height
	});

	var bf_background = new Kinetic.Layer();
	init_grid(bf_background);

	var rect = new Kinetic.Rect({
		x: 239,
		y: 75,
		width: 100,
		height: 50,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 4
	});

	// add the shape to the layer
	bf_background.add(rect);

	// add the layer to the stage
	stage.add(bf_background);
}

function init_grid(layer){
	counter_horizontal = stage_width/10;
	counter_vertical = stage_height/10;

	console.log(counter_vertical);
	console.log(counter_horizontal);

	counter = 0;
	while (counter < counter_vertical){
		var line = new Kinetic.Line({
			points: [0, counter*10, stage_width, counter*10],
			stroke: 'black',
			strokeWidth: 1
		});

		layer.add(line);

		counter++;
	}

	counter = 0;
	while (counter < counter_horizontal){
		var line = new Kinetic.Line({
			points: [counter*10, 0, counter*10, stage_height],
			stroke: 'black',
			strokeWidth: 1
		});

		layer.add(line);

		counter++;
	}
}