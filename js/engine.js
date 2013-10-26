// engine.js
var stage_width = 1000;
var stage_height = 480;
var grid_size = 40;
var walkingpath = init_walkingpath();

//global vars
var stage;
var bf_background;
var bf_towers;
var bf_units;


function init_game(){
	stage = new Kinetic.Stage({
		container: 'battlefield',
		width: stage_width,
		height: stage_height
	});

	bf_background = new Kinetic.Layer();
	bf_towers = new Kinetic.Layer();
	bf_units = new Kinetic.Layer();
	init_grid(bf_background);
	init_street(bf_background);

	var castle_1 = new Kinetic.Rect({
		x: grid_size*1,
		y: grid_size*4,
		width: grid_size*2,
		height: grid_size*4,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 1
	});
	bf_background.add(castle_1);

	var castle_2 = new Kinetic.Rect({
		x: grid_size*22,
		y: grid_size*4,
		width: grid_size*2,
		height: grid_size*4,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 1
	});

	bf_background.add(castle_2);

	// add the layer to the stage
	stage.add(bf_background);
	stage.add(bf_towers);
	stage.add(bf_units);
}


function init_grid(layer){
	$('#battlefield').on('click', function(evt){
		pos = get_cursor(evt);
		//what to do?
	});

	counter_horizontal = stage_width/grid_size;
	counter_vertical = stage_height/grid_size;

	console.log(counter_vertical);
	console.log(counter_horizontal);

	counter = 0;
	while (counter <= counter_vertical){
		var line = new Kinetic.Line({
			points: [0, counter*grid_size, stage_width, counter*grid_size],
			stroke: 'black',
			strokeWidth: 1,
			alpha: 0.1
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


function init_street(layer){
	points = new Array();
	walkingpath.forEach(function(entry) {
		points.push(entry[0]*(grid_size)+20)
		points.push(entry[1]*(grid_size)+20)
	});

	console.log(points);

	var street = new Kinetic.Line({
		points: points,
		stroke: 'brown',
		strokeWidth: grid_size,
		lineJoin: 'round',
		lineCap: 'square'
	});

	layer.add(street);
}


function init_walkingpath(){
	var wp = new Array();
	wp[0] = new Array(3, 6);
	wp[1] = new Array(wp[0][0]+3, wp[0][1]);
	wp[2] = new Array(wp[1][0], wp[1][1]-3);
	wp[3] = new Array(wp[2][0]+12, wp[2][1]);
	wp[4] = new Array(wp[3][0], wp[3][1]+3);
	wp[5] = new Array(wp[4][0]+3, wp[4][1]);

	return wp;
}


function get_cursor(e){
	var $div = $("#battlefield");
	divPos = {
		left: e.pageX - $div.offset().left,
		top: e.pageY - $div.offset().top
	};

	return divPos;
}