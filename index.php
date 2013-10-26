<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>TUMdefense</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- vendor css -->
	<!-- custom css -->
	<link rel="stylesheet" href="css/main.css">
	<!-- vendor js -->
	<script type="text/javascript" src="js/vendor/jquery_min.js"></script>
	<script type="text/javascript" src="js/vendor/kinetic_min.js"></script>
	<!-- custom js -->
	<script type="text/javascript" src="js/engine.js"></script>
	<script type="text/javascript" src="js/towers.js"></script>
	<script type="text/javascript" src="js/units.js"></script>
	<script type="text/javascript" src="js/game.js"></script>
	<script type="text/javascript" src="js/socket.js"></script>
	<script type="text/javascript">
		<?php
		if($_GET['player'] == 1){
			echo 'var current_player = 1;';
			echo 'var enemy_player = 2;';
		} elseif($_GET['player'] == 2) {
			echo 'var current_player = 2;';
			echo 'var enemy_player = 1;';
		} else {
			exit('U noob?');
		}
		?>
	</script>
</head>
<body>
	<div id="battlefield">
	</div>
  <div class="container">
  	<div id="towers">
  	  <div class="header">Towers</div>
  	  <a class="tower" onclick="call_new_cannon_tower();"><img src="res/tower1.png"></a>
  	  <a class="tower" onclick="call_new_mg_tower();"><img src="res/tower2.png"></a>
  	  <a class="tower" onclick="call_new_moeser_tower();"><img src="res/tower3.png"></a>
  	  <a class="tower" onclick="call_new_rocket_tower();"><img src="res/tower4.png"></a>
  	</div>
  </div>
</body>
</html>