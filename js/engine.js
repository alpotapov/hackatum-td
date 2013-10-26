// engine.js
function init_game(){
	var stage = new Kinetic.Stage({
		container: 'battlefield',
		width: 1000,
		height: 600
	});

	var bf_background = new Kinetic.Layer();

	counter = 0;
	while (counter != 100){
		var redLine = new Kinetic.Line({
			points: [73, 70, 340, 23, 450, 60, 500, 20],
			stroke: 'red',
			strokeWidth: 15,
			lineCap: 'round',
			lineJoin: 'round'
		});
	}

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

function init_grid(){

}