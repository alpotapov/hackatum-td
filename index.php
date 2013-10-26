<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>TUMdefense</title>
	<link rel="stylesheet" href="css/main.css">
	<!-- vendor -->
	<script type="text/javascript" src="js/vendor/jquery_min.js"></script>
	<script type="text/javascript" src="js/vendor/kinetic_min.js"></script>
	<!-- custom -->
	<script type="text/javascript" src="js/engine.js"></script>
	<script type="text/javascript" src="js/towers.js"></script>
	<script type="text/javascript" src="js/units.js"></script>
	<script type="text/javascript" src="js/game.js"></script>
	<script type="text/javascript">
		var current_player = 1;
		var enemy_player = 2;
	</script>
</head>
<body>
	<div id="battlefield">
	</div>
	
	<div id="towers">
	  <div class="header">Towers</div>
	  <a class="tower" onclick="call_new_cannon_tower();"><img src="res/tower1.png"></a>
	  <a class="tower" onclick="call_new_mg_tower();"><img src="res/tower2.png"></a>
	  <a class="tower" onclick="call_new_moeser_tower();"><img src="res/tower3.png"></a>
	  <a class="tower" onclick="call_new_rocket_tower();"><img src="res/tower4.png"></a>
	</div>
</body>
</html>