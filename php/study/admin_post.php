<?php
	print_r($_POST);
	$user = $_POST['user'];
	$pwd = $_POST['pwd'];
	$pwd1 = $_POST['pwd1'];
	$hid = $_POST['hid'];
	include 'db.php';

	if ($pwd != $pwd1) {
		echo '<script>alert("不对");location.replace("index.php")</script>';
		exit ;
	}
	if ($user=="" or $pwd =="") {
		echo '<script>alert("用户名或密码不能为空")</script>';
		exit ;
	}
	$admin = new db ('users');
	$data['name'] = $user;
	$data['pwd'] = $pwd; 


	if ($hid>0) {
		$result = $admin ->save($data,"id='$hid'");
	}else{
		$result =  $admin->add($data);
	}
	
	if ($result) {
		echo '<script>alert("添加成功");location.replace("index.php")</script>';
	}else{
		echo '<script>alert("添加失败")</script>';
	}
?>
