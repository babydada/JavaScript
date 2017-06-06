<?php
header("Content-type:text/html;charset=utf-8");
class db{
	public $name = null;
	public $num = 10;
	public $conn = null;
	public $table = null;
	//构造函数 , 当new db 创建对象, 构造函数就开始执行了
	//准备工作                 users
	public function __construct($table){
		$this->table = $table;
		$this->conn = mysqli_connect("localhost","root","123","news");
		mysqli_query($this->conn,"set names utf8");
	}

	//1.查询多条语句
	public function select($sql){
		$result = mysqli_query($this->conn,$sql);
		while ($row=mysqli_fetch_assoc($result)) {
			$list[] = $row;
		}
		//关闭数据库
		// mysqli_close($this->conn);
		return $list;
	}
	//2.查询一条语句
	public function find($sql){
		$result = mysqli_query($this->conn,$sql);
		$row=mysqli_fetch_assoc($result);
		return $row;
		// print_r($row);
		//关闭数据库
		// mysqli_close($this->conn);
	}
	//3.添加
	public function add($data){
		// insert into users set name="hanyingbo",pwd="123";
		// $result = mysqli_query($this->conn,$sql);
		// $data['name'] = hanyingbo
		// $data['pwd'] =123 ;
		$sql = "insert into $this->table set ";
		foreach ($data as $key => $value) {
			$sql .="$key='$value',";
		}
		// echo (substr($sql, 0,strlen($sql)-1));
		$sql = substr($sql, 0,strlen($sql)-1);
		$result = mysqli_query($this->conn,$sql);
		return $result;
	}
	//4.修改 
	public function save($data,$where){
		// update users set pwd="666" where user ="zhangsan"
		$sql = "update $this->table set ";
		foreach ($data as $key => $value) {
			$sql .="$key='$value',";
		}
		$sql = substr($sql, 0,strlen($sql)-1);
		$sql .=" where $where";
		$result = mysqli_query($this->conn,$sql);
		return $result;
	}
	//5.删除
	public function delete($sql){
		// delete from users where id=1 limit 1
		$result = mysqli_query($this->conn,$sql);
		return $result;
	}
}
?>
