// towers
var tower_list = new Array();
var tower_list_enemy = new Array();

function new_tower(damage, cooldown, radius, figure, xcor, ycor, owner){
	occupied = false;
	tower_list.forEach(function(entry){
		if(entry.xc == xcor && entry.yc == ycor){
			alert('This place is taken!');
			occupied = true;
		}
	});
	
	if(occupied){
		return;
	}
	
	this.damage = damage;
	this.cooldown = cooldown * 1000;
	this.radius = radius * grid_size;
	this.figure = figure;
	this.last_fired = 0;
	this.xc = xcor;
	this.yc = ycor;

	this.owner = owner;

	//console.log(damage);

	if(owner == current_player){
		tower_list.push(this);
		//tower_list_enemy.push(this);
	} else {
		tower_list_enemy.push(this);
	}

	//console.log(xcor, ycor);
	var rad = new Kinetic.Circle({
		x: xcor,
		y: ycor,
		radius: radius*grid_size,
		fill: 'blue',
		opacity: 0.2,
		stroke: 'black',
		strokeWidth: 1
	});

	bf_towers.add(rad);
	bf_towers.draw();

	socket_send("new_tower("+damage+", "+cooldown+", "+radius+", "+figure+", "+xcor+", "+ycor+", "+owner+");");
}

function new_mg_tower(xcor, ycor){
	xcor++;
	ycor++;

	var type = 'mg';
	var damage = 5;
	var cooldown = 1;
	var radius = 5;

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

	var tower = new_tower(damage, cooldown, radius, figure, xcor * grid_size - grid_size/2, ycor * grid_size - grid_size/2, current_player);
}


function is_in_range(xcor, ycor, hp, owner){
	//console.log('Is in range?'+xcor+ycor+hp);
	if(owner == current_player){
		var tlist = tower_list_enemy;
	} else {
		var tlist = tower_list;
	}

	var tcounter = 0;
	//console.log('hp '+hp);
	var unit_hp = hp;

	tlist.forEach(function(entry) {
		//console.log(entry.damage)
		//console.log(entry.xc + ', ' + entry.yc);
		var tmp_distance = Math.round(Math.sqrt(Math.pow(Math.abs(entry.xc - xcor), 2) + Math.pow(Math.abs(entry.yc - ycor), 2)));

		//console.log(tmp_distance + ", "+entry.radius);
		
		if(tmp_distance <= entry.radius){
			var ts = new Date().getTime();

			//console.log((ts - entry.last_fired) + ", " + entry.cooldown)

			if((ts - entry.last_fired) >= entry.cooldown){
				//console.log(tlist[tcounter].last_fired);
				//console.log('uhp: '+unit_hp+', '+entry.damage);
				unit_hp = unit_hp - entry.damage;
				tlist[tcounter].last_fired = ts;
				//console.log("Shoot them down!!! :D "+unit_hp);
			}
		}

		tcounter++;
	});

	return unit_hp;
}