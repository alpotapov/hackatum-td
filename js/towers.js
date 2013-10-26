// towers
var tower_list = new Array();


function new_tower(damage, cooldown, radius, figure, xcor, ycor){
	this.damage = damage;
	this.cooldown = cooldown * 1000;
	this.radius = radius  * grid_size;
	this.figure = figure;
	this.last_fired = 0;
	this.xc = xcor;
	this.yc = ycor;

	tower_list.push(this);
}

function new_mg_tower(xcor, ycor){
	xcor++;
	ycor++;

	var type = 'mg';
	var damage = 5;
	var cooldown = 1;
	var radius = 10;

	var figure = new Kinetic.Circle({
		x: xcor * grid_size - grid_size/2,
		y: ycor * grid_size - grid_size/2,
		radius: grid_size/2,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 1
	});

	bf_towers.add(figure);
	bf_towers.draw();

	var tower = new_tower(damage, cooldown, radius, figure, xcor, ycor);
}


function is_in_range(xcor, ycor, hp){
	//console.log('Is in range?'+xcor+ycor+hp);

	var tcounter = 0;
	var unit_hp = hp;

	tower_list.forEach(function(entry) {
		var tmp_distance = Math.round(Math.sqrt(Math.pow(Math.abs(entry.xc - xcor), 2) + Math.pow(Math.abs(entry.yc - ycor), 2)));

		//console.log(tmp_distance + ", "+entry.radius);
		
		if(tmp_distance <= entry.radius){
			var ts = new Date().getTime();

			//console.log((ts - entry.last_fired) + ", " + entry.cooldown)

			if((ts - entry.last_fired) >= entry.cooldown){
				//console.log(tower_list[tcounter].last_fired);
				unit_hp = unit_hp - entry.damage;
				tower_list[tcounter].last_fired = ts;
				console.log("Shoot them down!!! :D "+unit_hp);
			}
		}

		tcounter++;
	});

	return unit_hp;
}