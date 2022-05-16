<?php

	$conn = mysqli_connect('localhost','root','','banking');

	if(!$conn){
		die("The connection gave up so early because of --> ".mysqli_connect_error());
	}

?>