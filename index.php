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
	<script type="text/javascript" src="js/game.js"></script>
	<script type="text/javascript" src="js/tower.js"></script>
</head>
<body>
	<div id="battlefield">
	</div>
	
	<div id="towers">
	  <div class="header">Towers</div>
	  <a id="basic" class="tower" onclick="new_tower('basic');"><img src="res/tower1.png"></a>
	  <a id="normal" class="tower" onclick="new_tower('normal');"><img src="res/tower2.png"></a>
	  <a id="advanced" class="tower" onclick="new_tower('advanced');"><img src="res/tower3.png"></a>
	  <a id="superior" class="tower" onclick="new_tower('superior');"><img src="res/tower4.png"></a>
	</div>
</body>
</html>