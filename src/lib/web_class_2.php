<?php
class web_class{

	var $dbh;

	function __construct(){
		$dbh = new dbConnect();
		$this->dbh = $dbh->_Link;
	}
	##################################################
	##################################################
	##################################################
	//啟用交易
	function beginTransaction(){
		$this->dbh->beginTransaction();
	}
	//還原
	function rollBack(){
		$this->dbh->rollBack();
	}
	//完成交易
	function commit(){
		$this->dbh->commit();
	}
	##################################################
	##################################################
	##################################################
		
		function get_city_list($data){
			$tb = $data['tb'];
			unset($data['tb']);
			
			$sqlstr = "SELECT * FROM(";
			$sqlstr .= "SELECT A.`city`,B.`sort` FROM `{$tb}` AS A, `".DBTB."2017fw_store_city` AS B WHERE A.`city`=B.`city`";
			$sqlstr .= " AND A.`show_status`='1' ";
			//-- $sqlstr .= " AND ( (A.`end_time`>='".$data['datetime']."') OR (A.`start_time`='' AND A.`end_time`='') ) ";
			$sqlstr .= " ORDER BY B.`sort` ) AS AA";
			$sqlstr .= " GROUP BY AA.`sort` ";
			
			$stmt=$this->dbh->prepare($sqlstr);
			
			$stmt->execute();
			$result= $stmt->fetchAll(PDO::FETCH_ASSOC);
			if($stmt->errorCode()=="0000"){
				return $result;
			}else{
				return FALSE;
			}
		}
		
		function get_channel_list($data){
			$tb = $data['tb'];
			unset($data['tb']);
			
			$sqlstr = "SELECT * FROM(";
			$sqlstr .= "SELECT A.`channel`,B.`sort` FROM `{$tb}` AS A, `".DBTB."2017fw_store_channel` AS B WHERE A.`channel`=B.`channel`";
			$sqlstr .= " AND A.`show_status`='1' ";
			//-- $sqlstr .= " AND ( (A.`end_time`>='".$data['datetime']."') OR (A.`start_time`='' AND A.`end_time`='') ) ";
			$sqlstr .= " ORDER BY B.`sort` ) AS AA";
			$sqlstr .= " GROUP BY AA.`sort` ";
			
			$stmt=$this->dbh->prepare($sqlstr);
			
			$stmt->execute();
			$result= $stmt->fetchAll(PDO::FETCH_ASSOC);
			if($stmt->errorCode()=="0000"){
				return $result;
			}else{
				return FALSE;
			}
		}
		
		
	##################################################
	##################################################
	##################################################
		
		function get_store_list($data){
			
			$tb = $data['tb'];
			unset($data['tb']);
			
			$sqlstr = "SELECT A.* FROM `{$tb}` AS A, `".DBTB."2017fw_store_city` AS B WHERE A.`city`=B.`city` ";
			$sqlstr .= " AND A.`show_status`='1' ";
			$sqlstr .= " AND A.`end_time`>='".$data['datetime']."' ";
			$sqlstr .= " AND A.`month`>0 AND A.`start_time`!='0000-00-00' AND A.`end_time`!='0000-00-00' ";
			
			if(!empty($data['city']) && $data['city']!='all' && $data['city']!=''
				&& !empty($data['channel']) && $data['channel']!='all' && $data['channel']!=''){
				$sqlstr.=" AND (A.`city` = :city OR A.`channel` = :channel)";
			}else{
				if(!empty($data['city']) && $data['city']!='all' && $data['city']!=''){
					$sqlstr.=" AND A.`city` = :city ";
				}
				
				if(!empty($data['channel']) && $data['channel']!='all' && $data['channel']!=''){
					$sqlstr.=" AND A.`channel` = :channel ";
				}
			}
			$sqlstr .= " ORDER BY A.`start_time` ASC, A.`month` ASC, B.`sort` ASC, A.`end_time` ASC, A.`address` ASC ";
			
			$stmt=$this->dbh->prepare($sqlstr);
			
			if(!empty($data['city']) && $data['city']!='all' && $data['city']!=''
				&& !empty($data['channel']) && $data['channel']!='all' && $data['channel']!=''){
				$stmt->bindParam(':city',$data['city'],PDO::PARAM_STR);
				$stmt->bindParam(':channel',$data['channel'],PDO::PARAM_STR);
			}else{
				if(!empty($data['city']) && $data['city']!='all' && $data['city']!=''){
					$stmt->bindParam(':city',$data['city'],PDO::PARAM_STR);
				}
				
				if(!empty($data['channel']) && $data['channel']!='all' && $data['channel']!=''){
					$stmt->bindParam(':channel',$data['channel'],PDO::PARAM_STR);
				}
			}
			
			
			
			$stmt->execute();
			$result= $stmt->fetchAll(PDO::FETCH_ASSOC);
			if($stmt->errorCode()=="0000"){
				return $result;
			}else{
				return FALSE;
			}
			
		}
		
	##################################################
	##################################################
	##################################################
	
		//IP
		function IP(){
			if(!empty($_SERVER['HTTP_CLIENT_IP'])){
			   $ip = $_SERVER['HTTP_CLIENT_IP'];
			}else if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
			   $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
			}else{
			   $ip= $_SERVER['REMOTE_ADDR'];
			}
			return $ip;
		}
	
	##################################################
	##################################################
	##################################################
	
	##################################################
	##################################################
	##################################################
	
	##################################################
	##################################################
	##################################################
	
	##################################################
	##################################################
	##################################################

	//------------------------------------------------------------------------------------------------------------------------------
}
?>