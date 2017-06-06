<?php
	echo "delete";
	$id = $_GET['id'];
	include 'db.php';
	$admin = new db('users');
	$result= $admin->delete("delete from users where id='$id' limit 1");

	if ($result) {
		echo '<script>alert("删除成功");location.replace("index.php")</script>';
	}else{
		echo '<script>alert("删除失败")</script>';
	}
?>
