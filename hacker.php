<?php 
	$speed = $_GET['s'];
	$hackStart = $_GET['hs'];
	$hackDiff = $_GET['hd'];
	if (!ctype_digit( $speed . $hackStart . $hackDiff )) {
		echo 'Quit hacking n00b';
		return;
	};
?>

<!DOCTYPE HTML> 

<html lang="en"> 

<!--
*(c) Copyright 2011 Simone Masiero. Some Rights Reserved. 
*This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
-->


	<head> 

		<meta charset="utf-8"> 

		<title>Hacker</title>

		<link href="style.css" rel="stylesheet" type="text/css" /> 

		<script src='jquery.js' type='text/javascript'></script> 
		<script src='jquery.scrollTo.min.js' type='text/javascript'></script> 
		<script src='script.js' type='text/javascript'></script> 

		<script type='text/javascript'>
			Typer.speed=<?php echo $speed; ?>;
			Typer.antiHackStart=<?php echo $hackStart; ?>;
			Typer.antiHackDifficulty=<?php echo $hackDiff; ?>;

			Typer.file='kernel.txt';

			Typer.init();

		</script>

	</head> 

	<body>
		<div id='console'></div>

		<div id='compilewrap'>
			<h2>Compiling...</h2>
			<div id="compile"></div>
		</div>

		<div class="progresswrap">
			<div class="spacer"></div>
				<div class="progressborder">
					<div id="progressbar"></div>
				</div>
			<div class="spacer"></div>
		</div>

		<div class="access"></div>

		<iframe src="//giphy.com/embed/MfLZdaDjjTxaU?hideSocial=true" frameborder="0" id="giphy" allowfullscreen=""></iframe>
	</body>

</html>
