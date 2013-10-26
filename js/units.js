// unit
var unit_walkingpath_ltr = get_unit_walkingpath("ltr");
var unit_walkingpath_rtl = get_unit_walkingpath("rtl");

function new_unit(p_speed, p_udamage, p_object, p_hp, direction, owner, p_type){
	this.speed = p_speed;
	this.udamage = p_udamage;
	this.figure = p_object;
	this.hp = p_hp;
	this.owner = owner;
	this.utype = p_type;

	socket_send("new_unit("+p_speed+", "+p_udamage+", "+p_object+", "+p_hp+", "+direction+", "+owner+", "+p_type+");");

	if(direction == "ltr"){
		var walkingpath = unit_walkingpath_ltr;
	}else{
		var walkingpath = unit_walkingpath_rtl;
	}

	move_through_points(speed, figure, walkingpath, bf_units, 0, hp, owner);
}

function new_soldier(direction){
	var type = 'soldier';
	var udamage = 20;
	var speed = 100;
	var hp = 20;
	
	var starting_point = new Array();
	
	if(direction == "ltr"){
  	starting_point[0] = walkingpath_ltr[0][0]*grid_size+grid_size/2;
  	starting_point[1] = walkingpath_ltr[0][1]*grid_size+grid_size/2;
	}else{
  	starting_point[0] = walkingpath_rtl[0][0]*grid_size+grid_size/2;
  	starting_point[1] = walkingpath_rtl[0][1]*grid_size+grid_size/2;
	}

	var figure = new Kinetic.RegularPolygon({
		x: starting_point[0],
		y: starting_point[1],
		sides: 6,
		radius: grid_size/2,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1
	});

	bf_units.add(figure);

	var unit = new_unit(speed, udamage, figure, hp, direction, current_player, type);
}


function move_through_points(speed, figure, point, layer, current, hp, owner){
		if(point.length <= current){
			//console.log("movement done");
			return;
		}
	
		var anim = new Kinetic.Animation(function(frame) {
			var velocity = speed;
			var dist = velocity * (frame.timeDiff / 1000);
			var done = {x: false, y: false};
			hp = is_in_range(figure.getX(), figure.getY(), hp, owner);
			if(hp <= 0){
				console.log("Unit killed!");
				this.stop();
				figure.remove();
				bf_units.draw();
			}

			var dist_diff = {x: point[current][0] - figure.getX(), y: point[current][1] - figure.getY()};
			
			if(dist_diff.x < 0){
				distx = -dist;
			} else {
				distx = dist;
			}

			if(dist_diff.y < 0){
				disty = -dist;
			} else {
				disty = dist;
			}

			if(dist_diff.x < 2 && dist_diff.x > -2){
				figure.setX(point[current][0]);
				done.x = true;
			} else {
				figure.move(distx, 0);
			}

			if(dist_diff.y < 2 && dist_diff.y > -2){
				figure.setY(point[current][1]);
				done.y = true;
			}else{
				figure.move(0, disty);
			}

			if(done.x == true && done.y == true){
				this.stop();
				move_through_points(speed, figure, point, layer, (current + 1), hp, owner);
			}
		}, layer);

		anim.start();
}

function get_unit_walkingpath(direction){
	var ret = new Array();
  
  if(direction == "ltr"){
    var walkingpath = walkingpath_ltr;
  }else{
    var walkingpath = walkingpath_rtl;
  }
  
	walkingpath.forEach(function(entry) {
		ret.push(new Array(entry[0]*(grid_size)+20, entry[1]*(grid_size)+20))
	});

	return ret;
}