<?php
	//--  include_once("setting.php");
//--------------------------------------------------
	// ----- 檢查-活動結束日期 ----- 
	function check_event_active(){
		$now = strtotime(date('Y-m-d H:i:s'));
		$event_stauts = ($now <= strtotime(END_TIME)) ? TRUE : FALSE ;
		return $event_stauts;
	}
//--------------------------------------------------
	// ----- 檢查-身份證字號 ----- 
	function check_user_pid($pid){
		$iPidLen = strlen($pid);
		if(!preg_match("/^[A-Z][1-2][0-9]{8}$/",$pid) && $iPidLen != 10){
			return FALSE;
		}
		//--  $head = array(
		//--  	"A"=>1,"B"=>10,"C"=>19,"D"=>28,"E"=>37,"F"=>46,"G"=>55,
		//--  	"H"=>64,"I"=>39,"J"=>73,"K"=>82,"M"=>11,"N"=>20,"O"=>48,"P"=>29,
		//--  	"Q"=>38,"T"=>65,"U"=>74,"V"=>83,"W"=>21,"X"=>3,"Z"=>30,"L"=>2,"R"=>47,"S"=>56,"Y"=>12);
		//--  $pid  = strtoupper($pid);
		//--  $iSum  = 0;
		//--  for($i=0;$i<$iPidLen;$i++){
		//--  	$sIndex = substr($pid,$i,1);
		//--  	$iSum   += (empty($i)) ? $head[$sIndex ] : intval($sIndex) * abs( 9 - base_convert($i,10,9) );
		//--  }
		//--  return ( $iSum  % 10 == 0 ) ? TRUE:FALSE;
		
		return TRUE;
	}
//--------------------------------------------------
	// ----- 檢查-電話 ----- 
	function check_phone($phone){
		$iPidLen = strlen($phone);
		if(!preg_match("/^[0][1-9][0-9]{8}$/",$phone) && $iPidLen != 10){
			return FALSE;
		}
		return TRUE;
	}
//--------------------------------------------------
	// ----- 檢查-Email ----- 
	function check_email($txt){
		if (preg_match('/^([.0-9a-z]+)@([0-9a-z]+).([.0-9a-z]+)$/i',$txt) == true) {
			return TRUE;
		}else{
			return FALSE;
		}
	}
//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
	/**

     * 根据预设宽度让文字自动换行

     * @param $fontsize   字体大小

     * @param $ttfpath    字体名称

     * @param $str    字符串

     * @param $width    预设宽度

     * @param $fontangle  角度

     * @param $charset    编码

     */

    function autowrap($fontsize,$ttfpath,$str,$width,$height,$fontangle=0,$charset='utf-8'){

        $_string = "";
		$return = array();

        $_width  = 0;
        $_height  = 0;
		$_h = 1;
		$i=1;

        $temp    = chararray($str);

        foreach ($temp[0] as $k=>$v){

            $war = charwidth($fontsize,$fontangle,$ttfpath,$v);//print_r($war);
			$w=$war['w'];
			$h=$war['h'];
			
            $_width += intval($w);

            if ((($_width-15) > $width) && ($v !== "")){
				
				$_height += intval($h);
				if (($_height > $height) && ($v !== "")){
					//$_height -= intval($h);
					$_string .= '...';
					break;
				}
				
                $_string .= PHP_EOL;//php內建換行

                $_width = 0;

            }

            $_string .= $v;

            $w = 0;
			$h = 0;
			$i++;

        }
		$return['str'] = $_string;
		$return['w'] = $_width;
		$return['h'] = $_height;

        //$_string = mb_convert_encoding($_string, "html-entities","utf-8" );

        return $return;

    }
//--------------------------------------------------
	
	/**

     *  返回一个字符的数组

     * @param $str 文字

     * @param $charset 字符编码

     */

    function chararray($str,$charset="utf-8"){

        $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";

        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";

        $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";

        $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";

        preg_match_all($re[$charset], $str, $match);

        return $match;

    }

//--------------------------------------------------
		/**

     * 返回一个字符串在图片中所占的宽度

     * @param $fontsize  字体大小

     * @param $fontangle 角度

     * @param $ttfpath   字体文件

     * @param $char      字符

     */

    function charwidth($fontsize,$fontangle,$ttfpath,$char){

        $box = @imagettfbbox($fontsize,$fontangle,$ttfpath,$char);
		
        $word['w'] = max($box[2], $box[4]) - min($box[0], $box[6]);
        $word['h'] = max($box[3], $box[1]) - min($box[5], $box[7]);

        return $word;

    }
//--------------------------------------------------
function str_split_utf8($str) {
    // place each character of the string into and array
    $split = 1;
    $array = array(); $len = strlen($str);
    for ( $i = 0; $i < $len; ){
        $value = ord($str[$i]);
        if($value > 0x7F){
            if($value >= 0xC0 && $value <= 0xDF)
                $split = 2;
            elseif($value >= 0xE0 && $value <= 0xEF)
                $split = 3;
            elseif($value >= 0xF0 && $value <= 0xF7)
                $split = 4;
            elseif($value >= 0xF8 && $value <= 0xFB)
                $split = 5;
            elseif($value >= 0xFC)
                $split = 6;
                 
        } else {
            $split = 1;
        }
        $key = '';
        for ( $j = 0; $j < $split; ++$j, ++$i ) {
            $key .= $str[$i];
        }
        $array[] = $key;
    }
    return $array;
}
//--------------------------------------------------
//裁切字串
	/*	function cut_content($a,$b){
			$a = strip_tags($a); //去除HTML標籤
			$sub_content = mb_substr($a, 0, $b, 'UTF-8'); //擷取子字串
			//echo $sub_content;  //顯示處理後的摘要文字
			//顯示 "......"
			//if (strlen($a) > strlen($sub_content)) echo "...";
			if (strlen($a) > strlen($sub_content)) return true;
			
			return false;
		}
		 
		//以上程式已經包裝起來,您可存放在例如:function.php網頁
		//往後只要使用include("function.php");
		//加上 cut_content($a,$b);即可,不需每次撰寫.
		//$a代表欲裁切內容.
		//$b代表欲裁切字數(字元數)
	*/
//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
?>