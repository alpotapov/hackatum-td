// engine.js
var stage_width = 1000;
var stage_height = 480;
var grid_size = 40;
var walkingpath_ltr = init_walkingpath("ltr");
var walkingpath_rtl = init_walkingpath("rtl");

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

	init_colors();
	init_grid(bf_background);
	init_street(bf_background);
	init_castles();

	// add the layer to the stage
	stage.add(bf_background);
	stage.add(bf_towers);
	stage.add(bf_units);
	stage.add(bf_highlights);
}

function init_colors() {
	var img_1 = new Image(500, 480);
	img_1.src = "res/heart.png";
	var half_1_pic = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: stage_width / 2,
		height: stage_height,
		fillPatternImage: img_1,
	});
	var half_1 = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: stage_width / 2,
		height: stage_height,
		fillPatternImage: img_1,
		fill: 'rgb(255, 120, 120)',
		opacity: 0.2,
	});
	bf_background.add(half_1);
	bf_background.add(half_1_pic);
	
	var half_2 = new Kinetic.Rect({
		x: stage_width / 2,
		y: 0,
		width: stage_width / 2,
		height: stage_height,
		fill: 'rgb(200, 200, 255)',
	});
	bf_background.add(half_2);	
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
				fillPatternImage: img,
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
	walkingpath_ltr.forEach(function(entry) {
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

function init_walkingpath(direction){
	var wp = new Array();
	if(direction == "ltr"){
  	wp[0] = new Array(3, 6);
  	wp[1] = new Array(wp[0][0]+3, wp[0][1]);
  	wp[2] = new Array(wp[1][0], wp[1][1]-3);
  	wp[3] = new Array(wp[2][0]+12, wp[2][1]);
  	wp[4] = new Array(wp[3][0], wp[3][1]+3);
  	wp[5] = new Array(wp[4][0]+3, wp[4][1]);
  }else{
    wp[0] = new Array(21, 6);
    wp[1] = new Array(wp[0][0]-3, wp[0][1]);
    wp[2] = new Array(wp[1][0], wp[1][1]-3);
    wp[3] = new Array(wp[2][0]-12, wp[2][1]);
    wp[4] = new Array(wp[3][0], wp[3][1]+3);
    wp[5] = new Array(wp[4][0]-3, wp[4][1]);
  }

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

function call_new_cannon_tower(){
	new_cannon_tower(click_highlight.getX() / grid_size, click_highlight.getY() / grid_size);
}

function call_new_moerser_tower(){
	new_moerser_tower(click_highlight.getX() / grid_size, click_highlight.getY() / grid_size);
}

function call_new_rocket_tower(){
	new_rocket_tower(click_highlight.getX() / grid_size, click_highlight.getY() / grid_size);
}

// units :D
function call_new_soldier(){
	if(current_player == 1){
		var direction = 'ltr';
	} else {
		var direction = 'rtf';
	}
	new_soldier(direction, current_player);
}

function call_new_tank(){
	if(current_player == 1){
		var direction = 'ltr';
	} else {
		var direction = 'rtf';
	}
	new_tank(direction, current_player);
}

function change_health(base, change) {
	if(base == 1) health_1 -= change;
	if(base == 2) health_2 -= change;
	console.log("base: " + base + "; change: " + change);
	update_health();
}

function update_health(){
	if(current_player == 1){
		$('#health_box').html(health_1);
	}else{
		$('#health_box').html(health_2);
	}
}

function gameover_alert(player){
  alert("Castle of Player " + player + " was DESTROYED!");
  if(player == 1){
    player = 2;
  }else{
    player = 1;
  }
  alert("PLAYER " + player + "WINS!");
}