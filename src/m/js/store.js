(function($) {
	
	var _sendObj = {};
	var _ps = {};
	_sendObj.city = '';
	_sendObj.channel = '';
	
	var _store_list_obj = {};
	
	var _anniversary_month = 
		'<div class="result-title"> \
			<p><span class="month">{_month_}</span>月週年慶</p> \
		</div>';
	
	var _anniversary_store = 
		'<div class="result"> \
			<div class="name"> \
				<p><span class="place">{_storeName_}</span><span class="triangle"></span>週年慶期間 <span class="start">{_stime_}</span> - <span class="end">{_etime_}</span></p>  \
			</div> \
			<div class="contact"> \
				<p><span class="tel">{_tel_}</span> / <span class="address">{_address_}</span><a href="{_addressUrl_}" target="_blank" class="map"><img src="images/s7/icon-location.png" width="24" height="35"></a></p> \
			</div> \
			<div class="add"><span class="calendar" storeid="{_id_}"></span></div> \
		</div>';
	var _url = '';
	
	$(function() {
		
		var pname = window.location.pathname.split('/')[1];
		if(pname=='!!levis_demo02'){
			_url = window.location.hostname+'/!!levis_demo02/2018fw_women_collection/';
		}else{
			_url = window.location.hostname+'/2018fw_women_collection/';
		}
		
		// --- 周年慶據點 ---
		anniversary_function();

		_ps = new PerfectScrollbar('#store_list', {
			suppressScrollX: true,  // 不要顯示 x 軸
			minScrollbarLength: 89,
			maxScrollbarLength : 89
    });
		// _ps.update();
		
	});
	
	// --- 周年慶據點 ---
	function anniversary_function(){
		getAnniversarySelect();
		get_anniversary_store();
		
		$(".search_btn").on("click",function(e){
			_sendObj.city = $("select#city").val();
			_sendObj.channel = $("select#channel").val();
			get_anniversary_store();
		});
	}
	
	function getAnniversarySelect(){
		$.ajax({
			url: '../actions/getAnniversarySelect.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: {},
			success: function(response) {
					console.log(response);
					var selectdata = response['data'];
					if(selectdata){
						var cityObj = selectdata['city'];
						if(cityObj){
							var city_html = '';
							for(var key in cityObj){
								city_html += '<option value="'+cityObj[key]+'">'+cityObj[key]+'</option>';
							}
							$("select#city").append(city_html);
						}
						
						var channelObj = selectdata['channel'];
						if(channelObj){
							var channel_html = '';
							for(var key2 in channelObj){
								channel_html += '<option value="'+channelObj[key2]+'">'+channelObj[key2]+'</option>';
							}
							$("select#channel").append(channel_html);
						}
					}else{
						alert(response['msg']);
					}
				},
			error:function(){
				console.log("error");
			}
		});
	}
	
	function get_anniversary_store(){
		$(".store-list-box").html('');
		$(".calendar").off("click");
		$(".map").off("click");
		_store_list_obj = {};
		
		$.ajax({
			url: '../actions/getAnniversaryStore.php',
			cache: false,
			dataType: 'json',
			type:'POST',
			data: _sendObj,
			success: function(response) {
					console.log(response);
					if(response['result']){
						var datalist = response['data'];
						if(datalist){
							for(var _mm in datalist){
								var month_html = _anniversary_month;
								month_html = month_html.replace( '{_month_}', _mm );
								// $("#store_list").append(month_html);
								$(".store-list-box").append(month_html);
								
								for(var key in datalist[_mm]){
									var store_html = _anniversary_store;
									store_html = store_html.replace( '{_storeName_}', datalist[_mm][key]['list']['storeName'] );
									store_html = store_html.replace( '{_stime_}', datalist[_mm][key]['list']['time']['stime'] );
									store_html = store_html.replace( '{_etime_}', datalist[_mm][key]['list']['time']['etime'] );
									store_html = store_html.replace( '{_tel_}', datalist[_mm][key]['list']['tel'] );
									store_html = store_html.replace( '{_address_}', datalist[_mm][key]['list']['address'] );
									store_html = store_html.replace( '{_addressUrl_}', 'https://www.google.com.tw/maps/place/'+datalist[_mm][key]['list']['address'] );
									
									store_html = store_html.replace( '{_id_}', datalist[_mm][key]['list']['id'] );
									
									_store_list_obj[datalist[_mm][key]['list']['id']]={};
									_store_list_obj[datalist[_mm][key]['list']['id']]['sdate'] = datalist[_mm][key]['list']['time']['sdate'];
									_store_list_obj[datalist[_mm][key]['list']['id']]['edate2'] = datalist[_mm][key]['list']['time']['edate2'];
									_store_list_obj[datalist[_mm][key]['list']['id']]['txt'] = datalist[_mm][key]['list']['txt'];
									
									// $("#store_list").append(store_html);
									$(".store-list-box").append(store_html);
									
								}
							}
							
							// scroll
							// $('.search-result .con').perfectScrollbar('update');
							_ps.update();
							
							store_calendar();
						}
						
					}else{
						// alert(response['msg']);
						$('.store-list-box').html(response['msg']);
						console.log(response['msg']);
					}
					
				},
			error:function(){
				console.log("error");
			}
		});
	}
	
	function store_calendar(){
		$(".calendar").on("click", function(){
			// window.trackingEvent("Skinny_Jeans_calendar","click");
			var storeId = $(this).attr("storeid");
			console.log(_store_list_obj[storeId]);
			
			var icsEvent = 'webcal://'+_url+'calendar/levis_calendar.php?txt=_txt_&sd=_sd_&ed=_ed_';
			icsEvent = icsEvent.replace('_sd_', _store_list_obj[storeId]['sdate']);
			icsEvent = icsEvent.replace('_ed_', _store_list_obj[storeId]['edate2']);
			icsEvent = icsEvent.replace('_txt_', _store_list_obj[storeId]['txt']);
			location.href=icsEvent;
			
		});
		$(".map").on("click", function(){
			// window.trackingEvent("Skinny_Jeans_map","click");
		});
	}
	
	
//-----------------------------------	
})(jQuery);
