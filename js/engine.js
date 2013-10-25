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
var bf_highlights;

function init_game(){
	stage = new Kinetic.Stage({
		container: 'battlefield',
		width: stage_width,
		height: stage_height
	});

	bf_background = new Kinetic.Layer();
	bf_towers = new Kinetic.Layer();
	bf_units = new Kinetic.Layer();
	bf_highlights = new Kinetic.Layer();
	
	$('#battlefield').on('click', function(evt) {
		var pos = get_cursor(evt);
		highlight(pos, true);
	});
	
	$('#battlefield').on('mousemove', function(evt) {
		var pos = get_cursor(evt);
		highlight(pos, false);
	});

	init_grid(bf_background);
	init_street(bf_background);
	init_castles();

	// add the layer to the stage
	stage.add(bf_background);
	stage.add(bf_towers);
	stage.add(bf_units);
	stage.add(bf_highlights);
}

function init_castles() {
	var c1_img = new Image(80, 120);
	c1_img.src = "res/base1.png";
	var castle_1 = new Kinetic.Rect({
		x: grid_size*1,
		y: grid_size*5,
		width: grid_size*2,
		height: grid_size*3,
		fillPatternImage: c1_img,
		// fill: 'blue',
	});
	bf_background.add(castle_1);


	var c2_img = new Image(80, 120);
	c2_img.src = "res/base2.png";
	var castle_2 = new Kinetic.Rect({
		x: grid_size*22,
		y: grid_size*5,
		width: grid_size*2,
		height: grid_size*3,
		fillPatternImage: c2_img,
		//fill: 'green',
	});
	bf_background.add(castle_2);
}


function init_grid(layer){
	counter_horizontal = stage_width/grid_size;
	counter_vertical = stage_height/grid_size;

	var counter = 0;
	var inner = 0;
	while (counter <= counter_horizontal) {
		while(inner <= stage_height / 100) {
			var rnd = 1 + Math.floor(Math.random() * 3);
			var img = new Image(4, 100);
			img.src = "res/line" + rnd + "_v.png";
			var rect = new Kinetic.Rect({
				x: counter * grid_size - 2,
				y: inner * 100,
				width: 4,
				height: 100,
				fillPatternImage: img
			});
			bf_background.add(rect);
			inner++;
		}
		inner = 0;
		counter++;
	}

	counter = 0;
	inner = 0;
	while (counter <= counter_vertical) {
		while(inner <= stage_width / 100) {
			var rnd = 1 + Math.floor(Math.random() * 3);
			var img = new Image(100, 4);
			img.src = "res/line" + rnd + "_h.png";
			var rect = new Kinetic.Rect({
				x: inner * 100,
				y: counter * grid_size - 2,
				width: 100,
				height: 4,
				fillPatternImage: img
			});
			bf_background.add(rect);
			inner++;
		}
		inner = 0;
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
		stroke: 'rgb(180, 20, 20)',
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
		x: e.pageX - $div.offset().left,
		y: e.pageY - $div.offset().top
	};

	return divPos;
}


var click_highlight = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: grid_size,
	height: grid_size,
	fill: 'rgb(122, 122, 122)',
	opacity: 0.3,
});

var click_outline = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: grid_size - 2,
	height: grid_size - 2,
	stroke: 'black',
	strokeWidth: 3
});

var o_highlight = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: grid_size,
	height: grid_size,
	fill: 'rgb(122, 122, 122)',
	opacity: 0.3,
	stroke: 'black',
	strokeWidth: 1
});

function highlight(pos, click) {
	var gridX = Math.floor(pos.x / grid_size) * grid_size;
	var gridY = Math.floor(pos.y / grid_size) * grid_size;

	o_highlight.remove();
	if(click) {
		click_highlight.remove();
		click_outline.remove();
		click_highlight.setX(gridX);
		click_highlight.setY(gridY);
		click_outline.setX(gridX + 1);
		click_outline.setY(gridY + 1);
		
		bf_highlights.add(click_highlight);
		bf_highlights.add(click_outline);
	} else {
		o_highlight.setX(gridX);
		o_highlight.setY(gridY);
		bf_highlights.add(o_highlight);
	}
	bf_highlights.draw();
}

function call_new_mg_tower(){
  new_mg_tower(click_highlight.getX() / grid_size, click_highlight.getY() / grid_size);
}