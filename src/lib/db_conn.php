<?php
##################################################
//error_reporting(0);
//ini_set('display_errors',1);
ini_set("memory_limit", "512M");
ini_set("max_execution_time", "60000000000");
set_time_limit(1000000000);
##################################################
$host = $_SERVER["SERVER_NAME"];
if($host == 'localhost'){
	//資料庫主機
	define('DBHOST','localhost');
	//資料庫
	define('DBDB','levicomt_levis_2017FW');
	//DB使用者帳號
	define('DBUSER','root');
	//使用者密碼
	define('DBPW','123456');
	
	define('DBTB','');
}else{
	$_web_path = $_SERVER['PHP_SELF'];
	$_webpath_parts = pathinfo($_web_path);
	$_web_dirname = $_webpath_parts['dirname'];
	$_web_path_arr = explode("/",$_web_dirname);
	if($_web_path_arr[1] == '!!levis_demo02'){
		define('DBTB','_demo_');
	}else{
		define('DBTB','');
	}
	//資料庫主機
	define('DBHOST','localhost');
	//資料庫
	define('DBDB','levicomt_levis_2017FW');
	//DB使用者帳號
	define('DBUSER','levicomt_2017fw');
	//使用者密碼
	define('DBPW','1qaz7ujm4rfv2wsx');
}
##################################################
class dbConnect{
	var $_Link;
	function __construct() {
		$dbConnString = "mysql:host=" . DBHOST . "; dbname=" .DBDB;
		$dbh = new PDO($dbConnString, DBUSER, DBPW);
		if(! $dbh ){
			echo "Database connection error\n";
		}
		$dbh->query("SET NAMES 'utf8'");
		$this->_Link = $dbh;
	}
}
##################################################
?>