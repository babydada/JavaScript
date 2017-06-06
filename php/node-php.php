<?php 
	header("Content-Type:text/html;charset=utf-8");
	echo('<h1>查看用户</h1>');
	session_start();
	if (empty($_SESSION['admin'])) {
			echo '<script>location.replace("login.php")</script>';
			exit;
	}
	include 'db.php';
	$admin = new db('info');
	$list= $admin->select("select * from info order by id desc");
	if (!empty($_GET['id'])) {
		$id = $_GET['id'];
		$lab = $admin->find("select * from info where id='$id' limit 1");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
		table{
			width: 30%;
			height: 30%;
		}
		tr:nth-child(odd){
			background-color: rgba(0, 220, 220, 0.5);
		}
		th{
			background-color: rgba(220, 0, 220, 0.5);
		}
		body{
			color: #555;
			font-size: 12px;
		}
	</style>
</head>
<body>
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>name</th>
				<th>pwd</th>
				<th>操作</th>
			</tr>
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
</body>
</html>