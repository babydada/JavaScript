<?php
	session_start();//使用seesion必须条件
	// print_r($_POST);
	$user = $_POST['user'];
	$pwd = $_POST['pwd'];
	include 'db.php';
	//创建对象
	$mydb = new db('users');
	$row = $mydb->find("select * from users where name = '$user' and pwd ='$pwd'");
	
	if ($row['id'] >0 ) {
		// echo "登录成功";
		$_SESSION['admin'] = $row['name'];
		echo '<script>location.replace("index.php")</script>';
	}else{
		// echo "不成功";
		echo '<script>alert("登录失败");location.replace("login.php")</script>';
	}
	
?>
