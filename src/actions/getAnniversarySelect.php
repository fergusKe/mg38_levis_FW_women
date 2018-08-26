<?php
//======================================================================
	// 開啟 session  
	if (!isset($_SESSION)) { session_start(); }  
//連結檔案===============================================================
	include_once("../lib/setting.php");
	include_once("../lib/db_conn.php");
	include_once("../lib/web_class.php");
	include_once("../lib/fun.php");
//======================================================================
	//-----------------------------------
	//-----------------------------------
//======================================================================

// ######################################################################################################################

//程式開始==============================================================
	
	//-----------------------------------
	$web_control = new web_class();
	//-----------------------------------
	
	$return = array();
	$return['msg'] = '';
	$return['data'] = array();
	
	//-----------------------------------
	
	//開始交易
	//-- $web_control->beginTransaction();
	
	//-----------------------------------
	
	$data = array();
	$data['tb'] = DBTB.'2017fw_store';
	$data['datetime'] = date("Y-m-d",time());
	
	$cityAr = array();
	$city_list = $web_control->get_city_list($data);
	for($i=0; $i<count($city_list); $i++){
		$cityAr[] = $city_list[$i]['city'];
	}
	
	
	$data2 = array();
	$data2['tb'] = DBTB.'2017fw_store';
	$data2['datetime'] = date("Y-m-d",time());
	
	$cannelAr = array();
	$cannel_list = $web_control->get_channel_list($data2);
	for($j=0; $j<count($cannel_list); $j++){
		$cannelAr[] = $cannel_list[$j]['channel'];
	}
	
	
	$return['data']['city']=$cityAr;
	$return['data']['channel']=$cannelAr;
	
	exit(json_encode($return));
//======================================================================
?>