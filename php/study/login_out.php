<?php
	//销毁
	session_start();
	unset($_SESSION['admin']);
	echo '<script>location.replace("login.php")</script>';

?>
