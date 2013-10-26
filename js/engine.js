// engine.js
var stage_width = 1000;
var stage_height = 480;
var grid_size = 40;

var castle_1_origin = {x: 100, y: 300}
var temp_turning_points = [{x: 300, y: 300}, {x: 300, y: 60}, {x:380, y: 60}]

function init_game(){
	var stage = new Kinetic.Stage({
		container: 'battlefield',
		width: stage_width,
		height: stage_height
	});

	var bf_background = new Kinetic.Layer();
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
	
  /*Temporary - Circle Declaration */
	circle = new Kinetic.Circle({
  	x: castle_1_origin.x,
    y: castle_1_origin.y,
    radius: 20,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 1
	});
	
	bf_background.add(circle);
	/* /Temp */
	
	// add the layer to the stage
	stage.add(bf_background);
  
  move_through_points(circle, temp_turning_points, bf_background, 0);
}

function move_through_points(object, point, layer, current){
  if(point.length <= current){
    console.log("movement done");
    return;
  }
  
  var anim = new Kinetic.Animation(function(frame) {
    var velocity = 200;
    var dist = velocity * (frame.timeDiff / 1000);
    var done = {x: false, y: false};
    
    var dist_diff = {x: point[current].x - object.getX(), y: point[current].y - object.getY()};
    if(dist_diff.x < 0){
      distx = -dist;
    }else{
      distx = dist;
    }
    if(dist_diff.y < 0){
      disty = -dist;
    }else{
      disty = dist;
    }
    
    if(dist_diff.x < 2 && dist_diff.x > -2){
      object.setX(point[current].x);
      done.x = true;
    }else{
      object.move(distx, 0);
    }
    
    if(dist_diff.y < 2 && dist_diff.y > -2){
      object.setY(point[current].y);
      done.y = true;
    }else{
      object.move(0, disty);
    }
    
    if(done.x == true && done.y == true){
      this.stop();
      move_through_points(object, point, layer, (current + 1));
    }
    
  }, layer);
  
  anim.start();
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

function init_street(layer){
	
}





