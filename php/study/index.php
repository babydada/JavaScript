<?php
	session_start();
	//empty 检查一个变量是否为空
	//变量是空, 返回true 
	//false 
	if (empty($_SESSION['admin'])) {
			echo '<script>location.replace("login.php")</script>';
			exit;
	}
	include 'db.php';
	$admin = new db('users');
	$list= $admin->select("select * from users order by id desc");
	if (!empty($_GET['id'])) {
		$id = $_GET['id'];
		$lab = $admin->find("select * from users where id='$id' limit 1");
	}
	
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		.tab{
			border: 1px solid #000;
			width: 700px;
			padding: 10px;
			text-align: center;
			border-collapse: collapse;
		}
		.tab td{
			border: 1px solid #000;
			line-height: 30px;

		}
	</style>
</head>
<body>
	<h2>首页</h2>
	<p><?php echo $_SESSION['admin'] ?>,欢迎登录</p>
	<a href="login_out.php">退出账号</a>
	<br>
	<table class="tab">
		<thead>
			<tr><th>ID</th><th>Name</th><th>pwd</th><th>操作</th></tr>
		</thead>
		<tbody>
		<?php 
			foreach ($list as $key => $value) {
		?>	
			<tr>
				<td><?php echo $value['id'] ?></td>
				<td><?php echo $value['name'] ?></td>
				<td><?php echo $value['pwd'] ?></td>
				<td>
					<a href="index.php?id=<?php echo $value['id'] ?>">修改</a>
					<a onclick="return confirm('确定删除吗?')" href="admin_del.php?id=<?php echo $value['id'] ?>">删除</a>
				</td>
			</tr>
		<?php
			}
		?>
		</tbody>
	</table>
	<br>
	<br>
	<form action="admin_post.php" method="POST">
			<input type="hidden" name="hid" value="<?php 
			echo !empty($lab['id'])?$lab['id']:"" ?>">
	<table class="tab">
		<tr><th>项目</th><th>内容</th></tr>
		<tr>
			<td>用户名</td>
			<td>
				<input type="text" name="user" value="<?php echo !empty($lab['name'])?$lab['name']:"" ?>">
			</td>
		</tr>
		<tr><td>密码</td><td><input type="password" name="pwd"></td></tr>
		<tr><td>确认密码</td><td><input type="password" name="pwd1"></td></tr>
		<tr><td></td><td><input type="submit" value="保存"></td></tr>
	</table>
	</form>
</body>
</html>