var health_1 = 100;
var health_2 = 100;

function health_subtract(base, change) {
	if(base == 1) {
	  health_1 -= change;
	  if(health_1 <= 0){
  	  health_1 = 0;
  	  return true
	  }else{
  	  return false;
	  }
  }
  
	if(base == 2) {
	  health_2 -= change;
	  if(health_2 <= 0){
  	  health_2 = 0;
  	  return true
	  }else{
  	  return false;
	  }
  }
	console.log("base: " + base + "; change: " + change);

	update_health();
}