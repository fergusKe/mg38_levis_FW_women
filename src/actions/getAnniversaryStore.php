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
	$return['result'] = false;
	$return['msg'] = '';
	$return['data'] = array();
	
	//-----------------------------------
	
	//開始交易
	//-- $web_control->beginTransaction();
	
	//-----------------------------------
		$data = array();
		$data['tb'] = DBTB.'2017fw_store';
		$data['datetime'] = date("Y-m-d",time());
		$data['city'] = trim($_POST['city']);
		$data['channel'] = trim($_POST['channel']);
		//-- $data['city'] = '台北市';
		//-- $data['channel'] = 'SOGO百貨';
	//-----------------------------------
		$get_list = $web_control->get_store_list($data);
		if($get_list){
			$storeAr = array();
			for($i=0; $i<count($get_list); $i++){
				$arr = array();
				$arr['month'] = $get_list[$i]['month'];
				$arr['list']['id'] = $get_list[$i]['id'];
				$arr['list']['storeName'] = $get_list[$i]['store_name'];
				$arr['list']['time']['stime'] = date( "n/d", strtotime($get_list[$i]['start_time']) );
				$arr['list']['time']['etime'] = date( "n/d", strtotime($get_list[$i]['end_time']) );
				$arr['list']['time']['sdate'] = date( "Ymd", strtotime($get_list[$i]['start_time']) );
				$arr['list']['time']['edate'] = date( "Ymd", strtotime($get_list[$i]['end_time']) );
				$arr['list']['time']['edate2'] = date( "Ymd", strtotime("+1 day", strtotime($get_list[$i]['end_time'])) );
				$arr['list']['time']['sdatetime'] = date( "Ymd", strtotime($get_list[$i]['start_time']) )."T"."000000";
				$arr['list']['time']['edatetime'] = date( "Ymd", strtotime($get_list[$i]['end_time']) )."T"."200000";
				$arr['list']['tel'] = $get_list[$i]['tel'];
				$arr['list']['address'] = $get_list[$i]['address'];
				$arr['list']['txt'] = "【Levis】".$get_list[$i]['store_name'].':週年慶期間 '.$arr['list']['time']['stime'].' - '.$arr['list']['time']['etime'];
				
				$storeAr[$get_list[$i]['month']][] = $arr;
				
				//--  $return['calendar'][$get_list[$i]['id']]['stime']=date( "n/d", strtotime($get_list[$i]['start_time']) );
				//--  $return['calendar'][$get_list[$i]['id']]['etime']=date( "n/d", strtotime($get_list[$i]['end_time']) );
				//--  $return['calendar'][$get_list[$i]['id']]['sdate']=date( "Ymd", strtotime($get_list[$i]['start_time']) );
				//--  $return['calendar'][$get_list[$i]['id']]['edate']=date( "Ymd", strtotime($get_list[$i]['end_time']) );
				//--  $return['calendar'][$get_list[$i]['id']]['edate2']=date( "Ymd", strtotime("+1 day", strtotime($get_list[$i]['end_time'])) );
				//--  $return['calendar'][$get_list[$i]['id']]['sdatetime']=date( "Ymd", strtotime($get_list[$i]['start_time']) )."T"."000000";
				//--  $return['calendar'][$get_list[$i]['id']]['edatetime']=date( "Ymd", strtotime($get_list[$i]['end_time']) )."T"."200000";
				//--  $return['calendar'][$get_list[$i]['id']]['txt']="【Levis】".$get_list[$i]['store_name'].':週年慶期間 '.$arr['list']['time']['stime'].' - '.$arr['list']['time']['etime'];
				
			}
			$return['result'] = true;
			$return['data'] = $storeAr;
		}else{
			$return['msg'] = '沒有符合搜尋條件資料';
			//$return['msg'] = '活動已結束';
		}
	//-----------------------------------
	
	exit(json_encode($return));
	
//======================================================================
?>
