<?

//-- header('Content-type: text/calendar; charset=utf-8');
//-- header('Content-Disposition: attachment; filename=event_'.time().'.ics');

echo "BEGIN:VCALENDAR\n";
echo "Content-Type : text/calendar; charset=utf-8\n";
echo "Content-Disposition: inline; filename=event_".time().".ics\n";
echo "VERSION:2.0\n";
echo "PRODID:-//Levis//CN\n";		//echo "PRODID:-//hacksw/handcal//NONSGML v1.0//CN\n";

echo "CALSCALE:GREGORIAN\n";
echo "METHOD:PUBLISH\n";
echo "X-WR-CALNAME:".$_GET['txt']."\n";
echo "X-WR-TIMEZONE:Asia/Taipei\n";
echo "X-WR-CALDESC:建立者:Levis \n https://levi.com.tw \n";

echo "BEGIN:VEVENT\n";
echo "UID:levi.com.tw\n";			//echo "UID:uid1@example.com\n";
echo "SUMMARY:".$_GET['txt']."\n";//標題
echo "DTSTART;VALUE=DATE:".$_GET['sd']."\n";//開始日期時間
//echo "DTEND;VALUE=DATE:". date("Ymd",strtotime("+1 day", strtotime($_GET['ed'])))."\n";//結束日期時間
echo "DTEND;VALUE=DATE:".$_GET['ed']."\n";//結束日期時間
echo "DTSTAMP:".date("Ymd")."T".date("His")."Z\n";

//echo "CREATED:".date("Ymd")."T".date("His")."Z\n";
//echo "DESCRIPTION:\n";
//echo "LAST-MODIFIED:".date("Ymd")."T".date("His")."Z\n";
//echo "ORGANIZER;CN=Levis:MAILTO:candy@megais.com\n";

//--echo "DTSTART:".$_GET['sdt']."\n";//開始日期時間
//--echo "DTEND:".$_GET['edt']."\n";//結束日期時間

echo "LOCATION:\n";
echo "SEQUENCE:0\n";
echo "STATUS:CONFIRMED\n";

echo "TRANSP:TRANSPARENT\n";
echo "END:VEVENT\n";
echo "END:VCALENDAR\n";  





//--   header('Content-type: text/calendar; charset=utf-8');
//--   header('Content-Disposition: attachment; filename=event_'.time().'.ics');
//--   
//--   echo "BEGIN:VCALENDAR\n";
//--   echo "Content-Type : text/calendar; charset=utf-8\n";
//--   echo "Content-Disposition: inline; filename=event_".time().".ics\n";
//--   echo "VERSION:2.0\n";
//--   //echo "PRODID:-//hacksw/handcal//NONSGML v1.0//CN\n";
//--   echo "PRODID:Levis\n";
//--   echo "BEGIN:VEVENT\n";
//--   //echo "UID:uid1@example.com\n";
//--   echo "UID:levi.com.tw\n";
//--   
//--   echo "CALSCALE:GREGORIAN\n";
//--   echo "METHOD:PUBLISH\n";
//--   echo "X-WR-CALNAME:".$_GET['txt']."\n";
//--   echo "X-WR-TIMEZONE:Asia/Taipei\n";
//--   echo "X-WR-CALDESC:建立者:Levis\nhttps://levi.com.tw\n";
//--   
//--   echo "DTSTAMP:".date("Ymd")."T".date("His")."\n";
//--   //echo "ORGANIZER;CN=Levis:MAILTO:candy@megais.com\n";
//--   echo "DTSTART:".$_GET['sdt']."\n";//開始日期時間
//--   echo "DTEND:".$_GET['edt']."\n";//結束日期時間
//--   echo "SUMMARY:".$_GET['txt']."\n";//標題
//--   echo "END:VEVENT\n";
//--   echo "END:VCALENDAR\n";  