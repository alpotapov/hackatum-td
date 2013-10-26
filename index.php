<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>TUMdefense</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- vendor css -->
	<link rel="stylesheet" href="css/vendor/bootstrap.min.css">
	<!-- custom css -->
	<link rel="stylesheet" href="css/main.css">
	<!-- vendor js -->
	<script type="text/javascript" src="js/vendor/jquery_min.js"></script>
	<script type="text/javascript" src="js/vendor/kinetic_min.js"></script>
	<!-- custom js -->
	<script type="text/javascript" src="js/money.js"></script>
	<script type="text/javascript" src="js/castle.js"></script>
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

		if(isset($_GET['socket']) && $_GET['socket'] == 1){
			echo '$(document).ready(function(){ init_socket(); });';
		}
		?>
	</script>
</head>
<body>
	<div id="battlefield">
	</div>

	<div class="row">
		<div class="col-md-6 col-md-offset-3">
			<div class="row">
				<div class="col-md-5 menu_box">
	
						<div class="header">Towers</div>
						<a class="tower" onclick="call_new_cannon_tower();"><img src="res/tower1.png"></a>
						<a class="tower" onclick="call_new_mg_tower();"><img src="res/tower2.png"></a>
						<a class="tower" onclick="call_new_moerser_tower();"><img src="res/tower3.png"></a>
						<a class="tower" onclick="call_new_rocket_tower();"><img src="res/tower4.png"></a>

				</div>
				<div class="col-md-4 menu_box">
	
						<div class="header">Units</div>
						<a class="unit" onclick="call_new_soldier();"><img src="res/spawn1.png"></a>
						<a class="unit" onclick="call_new_tank();"><img src="res/spawn2.png"></a>
	
				</div>
				<div class="col-md-3 menu_box">
	
						<div class="header">Stats</div>
						<span>Your money: <span id="money_box"></span></span><br />
						<span>Your health: <span id="health_box"></span></span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>