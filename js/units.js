// unit
var unit_walkingpath = get_unit_walkingpath();

function new_unit(p_speed, p_damage, p_object, p_hp){
	var speed = p_speed;
	var damage = p_damage;
	var figure = p_object;
	var hp = p_hp;

	move_through_points(speed, figure, unit_walkingpath, bf_units, 0, hp);
}

function new_soldier(){
	var type = 'soldier';
	var damage = 20;
	var speed = 100;
	var hp = 20;

	var figure = new Kinetic.RegularPolygon({
		x: walkingpath[0][0]*grid_size+grid_size/2,
		y: walkingpath[0][1]*grid_size+grid_size/2,
		sides: 6,
		radius: grid_size/2,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1
	});

	bf_units.add(figure);

	var unit = new_unit(speed, damage, figure, hp);
}


function move_through_points(speed, figure, point, layer, current, hp){
		if(point.length <= current){
			//console.log("movement done");
			return;
		}
	
		var anim = new Kinetic.Animation(function(frame) {
			var velocity = speed;
			var dist = velocity * (frame.timeDiff / 1000);
			var done = {x: false, y: false};

			//console.log(point[current]);
			var new_hp = is_in_range(figure.getX(), figure.getY(), hp);
			if(new_hp <= 0){
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
				move_through_points(speed, figure, point, layer, (current + 1), new_hp);
			}
		}, layer);

		anim.start();
}

function get_unit_walkingpath(){
	var ret = new Array();

	walkingpath.forEach(function(entry) {
		ret.push(new Array(entry[0]*(grid_size)+20, entry[1]*(grid_size)+20))
	});

	return ret;
}