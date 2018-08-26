(function($) {
	var popupType = '',
			_sliderObj = {},
			_youtubeObj = {options:{}},
			_loadNum = 0;
	$(function() {
		_sliderObj.imgArr = [];
		_sliderObj.imgLoadArr = [];

		_sliderObj.imgMenArr = [];
		_sliderObj.imgWomenArr = [];
		_sliderObj.imgS5Arr = [];
		_sliderObj.imgOrangeMenArr = [];
		_sliderObj.imgOrangeWomenArr = [];
		_sliderObj.imgCatalogueArr = [];
		_sliderObj.imgRedtag2017fwArr = [];
		_sliderObj.imgLmc2017fwArr = [];
		_sliderObj.imgLvc2017fwArr = [];
		_sliderObj.s1Item5ImgArr = [];
		_sliderObj.s1Item6ImgArr = [];
		_sliderObj.s1Item7ImgArr = [];
		_sliderObj.s1Item8ImgArr = [];
		

		_sliderObj.imgMenLoadArr = [];
		_sliderObj.imgWomenLoadArr = [];
		_sliderObj.imgS5LoadArr = [];
		_sliderObj.imgOrangeMenLoadArr = [];
		_sliderObj.imgOrangeWomenLoadArr = [];
		_sliderObj.imgCatalogueLoadArr = [];
		_sliderObj.imgRedtag2017fwLoadArr = [];
		_sliderObj.imgLmc2017fwLoadArr = [];
		_sliderObj.imgLvc2017fwLoadArr = [];
		_sliderObj.s1Item5ImgLoadArr = [];
		_sliderObj.s1Item6ImgLoadArr = [];
		_sliderObj.s1Item7ImgLoadArr = [];
		_sliderObj.s1Item8ImgLoadArr = [];

		popupSlider();

	});


	function popupSlider() {
    let menUrl = [
			'images/s7/MEN/1_56573-0002.jpg',
			'images/s7/MEN/2_56573-0001.jpg',
			'images/s7/MEN/3_22491-0424.jpg',
			'images/s7/MEN/4_22491-0425.jpg',
			'images/s7/MEN/5_29814-0023.jpg',

			'images/s7/MEN/6_22489-0118.jpg',
			'images/s7/MEN/7_22489-0139.jpg',
			'images/s7/MEN/8_29554-0033.jpg',
			'images/s7/MEN/9_22489-0119.jpg',
			'images/s7/MEN/10_39636-0000.jpg',

			'images/s7/MEN/11_39636-0002.jpg',
			'images/s7/MEN/12_22491-0428.jpg',
			'images/s7/MEN/13_22491-0430.jpg',
			'images/s7/MEN/14_22491-0444.jpg',
			'images/s7/MEN/15_22491-0445.jpg',

			'images/s7/MEN/16_17783-0137.jpg',
			'images/s7/MEN/17_17783-0138.jpg',
			'images/s7/MEN/18_17783-0139.jpg',
			'images/s7/MEN/19_22491-0420.jpg',
			'images/s7/MEN/20_22491-0421.jpg',

			'images/s7/MEN/21_22491-0449.jpg',
			'images/s7/MEN/22_22491-0450.jpg',
			'images/s7/MEN/23_29813-0064.jpg',
			'images/s7/MEN/24_39803-0004.jpg',
			'images/s7/MEN/25_17783-0106.jpg',

			'images/s7/MEN/26_17783-0103.jpg',
			'images/s7/MEN/27_17783-0140.jpg'
		]
		let womenUrl = [
			'images/s7/WOMEN/1_29674-0008.jpg',
			'images/s7/WOMEN/2_17369-0386.jpg',
			'images/s7/WOMEN/3_56580-0011.jpg',
			'images/s7/WOMEN/4_17369-0053.jpg',
			'images/s7/WOMEN/5_57650-0000.jpg',

			'images/s7/WOMEN/6_39389-0028.jpg',
			'images/s7/WOMEN/7_17369-0370.jpg',
			'images/s7/WOMEN/8_17369-0385.jpg',
			'images/s7/WOMEN/9_29674-0007.jpg',
			'images/s7/WOMEN/10_17369-0297.jpg',

			'images/s7/WOMEN/11_17369-0387.jpg',
			'images/s7/WOMEN/12_17369-0201.jpg'
		]
		let imgUrl = '';
    for (var i = 1; i <= 12; i++) {
			imgUrl = 'images/product_men/men_Jeans_roll/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.imgMenArr.push(imgUrl);
			_sliderObj.imgMenLoadArr.push(false);
		}

		for (var i = 1; i <= 6; i++) {
			imgUrl = 'images/product_men/men_Jeans_stacked/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.imgWomenArr.push(imgUrl);
			_sliderObj.imgWomenLoadArr.push(false);
		}

		for (var i = 1; i <= 16; i++) {
			imgUrl = 'images/product_men/men_top/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.imgS5Arr.push(imgUrl);
			_sliderObj.imgS5LoadArr.push(false);
		}
		

		for (var i = 1; i <= 4; i++) {
        imgUrl = 'images/s2/look-03/list' + i + '.jpg';
        _sliderObj.imgOrangeMenArr.push(imgUrl);
        _sliderObj.imgOrangeMenLoadArr.push(false);
    }
		for (var i = 1; i <= 3; i++) {
        imgUrl = 'images/s2/look-04/list' + i + '.jpg';
        _sliderObj.imgOrangeWomenArr.push(imgUrl);
        _sliderObj.imgOrangeWomenLoadArr.push(false);
	}

	for (var i = 1; i <= 39; i++) {
        imgUrl = 'images/s3/banner01/' + Fun.str_pad(i, 2, "0") + '.jpg';
        _sliderObj.imgRedtag2017fwArr.push(imgUrl);
        _sliderObj.imgRedtag2017fwLoadArr.push(false);
    }

		for (var i = 1; i <= 11; i++) {
        imgUrl = 'images/s5/gallery/' + i + '.jpg';
        _sliderObj.imgLmc2017fwArr.push(imgUrl);
        _sliderObj.imgLmc2017fwLoadArr.push(false);
    }

		for (var i = 1; i <= 66; i++) {
        imgUrl = 'images/lookbook/Catalogue7/page-' + Fun.str_pad(i, 2, "0") + '.jpg';
        _sliderObj.imgLvc2017fwArr.push(imgUrl);
        _sliderObj.imgLvc2017fwLoadArr.push(false);
		}
		
		for (var i = 1; i <= 3; i++) {
			imgUrl = 'images/s1/05/product/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.s1Item5ImgArr.push(imgUrl);
			_sliderObj.s1Item5ImgLoadArr.push(false);
		}

		for (var i = 1; i <= 1; i++) {
			imgUrl = 'images/s1/06/product/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.s1Item6ImgArr.push(imgUrl);
			_sliderObj.s1Item6ImgLoadArr.push(false);
		}

		for (var i = 1; i <= 3; i++) {
			imgUrl = 'images/s1/07/product/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.s1Item7ImgArr.push(imgUrl);
			_sliderObj.s1Item7ImgLoadArr.push(false);
		}

		for (var i = 1; i <= 1; i++) {
			imgUrl = 'images/s1/08/product/' + Fun.str_pad(i, 2, "0") + '.jpg';
			_sliderObj.s1Item8ImgArr.push(imgUrl);
			_sliderObj.s1Item8ImgLoadArr.push(false);
		}

    // _sliderObj.imgMenArr = getRandomArr(_sliderObj.imgMenArr);
    // _sliderObj.imgWomenArr = getRandomArr(_sliderObj.imgWomenArr);
		// _sliderObj.imgOrangeMenArr = getRandomArr(_sliderObj.imgOrangeMenArr);
    // _sliderObj.imgOrangeWomenArr = getRandomArr(_sliderObj.imgOrangeWomenArr);

		if (Fun.detectmobile.isMobile) {
				$('body').addClass('mobile');
				orientation();
		}

		$(window).on('orientationchange resize', orientation);

		function orientation() {
				if(window.innerWidth > window.innerHeight){
				$('.product_view').addClass('horizontal');
				} else {
						$('.product_view').removeClass('horizontal');
				}
		}

		var j_product_view = $('.product_view .product_bigImg'),
				startX,
				endX,
				moveX;

		j_product_view.on("touchstart", touchStart);
		j_product_view.on("touchend", touchEnd);

		function touchStart() {
				// event.preventDefault();
				startX = event.targetTouches[0].pageX;
		}

		function touchEnd() {
				// event.preventDefault();
				endX = event.changedTouches[0].pageX;
				moveX = endX - startX;

				if( moveX > 70 ){
						$('.leftBtn').click();
				}

				if( moveX < -70 ){
						$('.rightBtn').click();
				}
		}


    function getRandomArr(pArr) {
        var random, spliceItem, newArr = [];
        for (var i = pArr.length; i > 0; i--) {
            random = Math.floor(Math.random() * i);
            spliceItem = pArr.splice(random, 1).toString();
            newArr.push(spliceItem);
        }
        return newArr;
    }

    $('.s3 .roll-btn').on('click', function() {
			_sliderObj.type = 's3-roll-btn';
			_sliderObj.imgArr = _sliderObj.imgMenArr;
			_sliderObj.imgLoadArr = _sliderObj.imgMenLoadArr;
			_sliderObj.nowProductNum = 0;
			changeProductPhoto();
			setPage();
			$('.product_view').fadeIn();
		});
		$('.s3 .stack-btn').on('click', function() {
				_sliderObj.type = 's3-stack-btn';
        _sliderObj.imgArr = _sliderObj.imgWomenArr;
        _sliderObj.imgLoadArr = _sliderObj.imgWomenLoadArr;
				_sliderObj.nowProductNum = 0;
				changeProductPhoto();
				setPage();
				$('.product_view').fadeIn();
		});
		$('.s5 .more-btn').on('click', function() {
			_sliderObj.type = 's5-more-btn';
			_sliderObj.imgArr = _sliderObj.imgS5Arr;
			_sliderObj.imgLoadArr = _sliderObj.imgS5LoadArr;
			_sliderObj.nowProductNum = 0;
			changeProductPhoto();
			setPage();
			console.log('s5 btn');
			$('.product_view').fadeIn();
	});
		// $('.s2-item3 .tag').on('click', function() {
		// 		var index = $(this).index();
		// 		_sliderObj.type = 's2-item3';
    //     _sliderObj.imgArr = _sliderObj.imgOrangeMenArr;
    //     _sliderObj.imgLoadArr = _sliderObj.imgOrangeMenLoadArr;
		// 		_sliderObj.nowProductNum = index;
    //     changeProductPhoto();
		// 		setPage();
		// 		$('.product_view').fadeIn();
		// });
		// $('.s2-item4 .tag').on('click', function() {
		// 		var index = $(this).index();
		// 		_sliderObj.type = 's2-item4';
    //     _sliderObj.imgArr = _sliderObj.imgOrangeWomenArr;
    //     _sliderObj.imgLoadArr = _sliderObj.imgOrangeWomenLoadArr;
		// 		_sliderObj.nowProductNum = index;
    //     changeProductPhoto();
		// 		setPage();
		// 		$('.product_view').fadeIn();
		// });

		// $('.s1-item5 .img').on('click', function() {
		// 	var index = $(this).index();
		// 	_sliderObj.type = 's1-item5';
		// 	_sliderObj.imgArr = _sliderObj.s1Item5ImgArr;
		// 	_sliderObj.imgLoadArr = _sliderObj.s1Item5ImgLoadArr;
		// 	_sliderObj.nowProductNum = index;
		// 	changeProductPhoto();
		// 	setPage();
		// 	$('.product_view').fadeIn();
		// });
		// $('.s1-item6 .img').on('click', function() {
		// 	var index = $(this).index();
		// 	_sliderObj.type = 's1-item6';
		// 	_sliderObj.imgArr = _sliderObj.s1Item6ImgArr;
		// 	_sliderObj.imgLoadArr = _sliderObj.s1Item6ImgLoadArr;
		// 	_sliderObj.nowProductNum = index;
		// 	changeProductPhoto();
		// 	setPage();
		// 	$('.product_view').fadeIn();
		// });
		// $('.s1-item7 .img').on('click', function() {
		// 	var index = $(this).index();
		// 	_sliderObj.type = 's1-item7';
		// 	_sliderObj.imgArr = _sliderObj.s1Item7ImgArr;
		// 	_sliderObj.imgLoadArr = _sliderObj.s1Item7ImgLoadArr;
		// 	_sliderObj.nowProductNum = index;
		// 	changeProductPhoto();
		// 	setPage();
		// 	$('.product_view').fadeIn();
		// });
		// $('.s1-item8 .img').on('click', function() {
		// 	var index = $(this).index();
		// 	_sliderObj.type = 's1-item8';
		// 	_sliderObj.imgArr = _sliderObj.s1Item8ImgArr;
		// 	_sliderObj.imgLoadArr = _sliderObj.s1Item8ImgLoadArr;
		// 	_sliderObj.nowProductNum = index;
		// 	changeProductPhoto();
		// 	setPage();
		// 	$('.product_view').fadeIn();
		// });


		// $('.s3-banner-1').on('click', function() {
		// 		_sliderObj.type = 's3-banner-1';
		// 		_sliderObj.imgArr = _sliderObj.imgRedtag2017fwArr;
		// 		_sliderObj.imgLoadArr = _sliderObj.imgRedtag2017fwLoadArr;
		// 		_sliderObj.nowProductNum = 0;
		// 		changeProductPhoto();
		// 		setPage();
		// 		$('.product_view').fadeIn();
		// });
		// $('.s3-banner-2').on('click', function() {
		// 		_sliderObj.type = 's3-banner-2';
		// 		_sliderObj.imgArr = _sliderObj.imgLmc2017fwArr;
		// 		_sliderObj.imgLoadArr = _sliderObj.imgLmc2017fwLoadArr;
		// 		_sliderObj.nowProductNum = 0;
		// 		changeProductPhoto();
		// 		setPage();
		// 		$('.product_view').fadeIn();
		// });
		// $('.lookbook-7 .catalog').on('click', function() {
		// 		_sliderObj.type = 'lookbook-7';
		// 		_sliderObj.imgArr = _sliderObj.imgLvc2017fwArr;
		// 		_sliderObj.imgLoadArr = _sliderObj.imgLvc2017fwLoadArr;
		// 		_sliderObj.nowProductNum = 0;
		// 		changeProductPhoto();
		// 		setPage();
		// 		$('.product_view').fadeIn();
		// });

    $('.product_view .leftBtn').on('click', function(e){
        e.preventDefault();
        _sliderObj.productChangeType = "prev";
        _sliderObj.nowProductNum--;
        //_sliderObj.nowClickNum++;
        changeProductPhoto();
				setPage();
    });

    $('.product_view .rightBtn').on('click', function(e){
        e.preventDefault();
        _sliderObj.productChangeType = "next";
        _sliderObj.nowProductNum++;
        //_sliderObj.nowClickNum++;
        changeProductPhoto();
				setPage();
    });

    $('.product_view .closebtn, .popup-bg').on('click', function(e){
        e.preventDefault();
        $('.product_view').fadeOut(500, function() {
            $('.product_view .product_bigImg img').attr('src', '');
        });
        $('body').css({
            'overflow': 'auto'
        });

				$('.mobile .product_view .popup-content').css({height: ''});
    });
	}

	function setPage() {
		var pageEle = $('.product_view .page');
		var linkEle = $('.product_view .link-btn');
		var type = _sliderObj.type;
		var length = _sliderObj.imgArr.length;
		var num = _sliderObj.nowProductNum;
		var storeLink = 'http://www.levi.com.tw/storelocator.html';
		var productNum = _sliderObj.imgArr[num].split('/').pop().split('_').pop().replace(/.jpg/, '')
		pageEle.text((num + 1) + '/' + length);
		linkEle.text(productNum)

		// 設置連結
		// if (type === 's2-item1') {
		// 	linkEle.css({
		// 		background: "url('./images/btn-store.png') no-repeat"
		// 	})
		// 	linkEle.find('a').attr('href', storeLink)
		// 	linkEle.show();
		// } else if (type === 's2-item2') {
		// 	if (num === 1) {
		// 		linkEle.css({
		// 			background: "url('./images/btn-buy.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', 'http://www.levis.com.tw/SalePage/Index/3964898')
		// 	} else if (num === 2) {
		// 		linkEle.css({
		// 			background: "url('./images/btn-buy.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', 'http://www.levis.com.tw/SalePage/Index/3922962')
		// 	} else {
		// 		linkEle.css({
		// 			background: "url('./images/btn-store.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', storeLink)
		// 	}
		// 	linkEle.show();
		// } else if (type === 's2-item3') {
		// 	if (num === 1) {
		// 		linkEle.css({
		// 			background: "url('./images/btn-buy.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', 'http://www.levis.com.tw/SalePage/Index/3922970')
		// 	} else {
		// 		linkEle.css({
		// 			background: "url('./images/btn-store.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', storeLink)
		// 	}
		// 	linkEle.show();
		// } else if (type === 's2-item4') {
		// 	if (num === 0) {
		// 		linkEle.css({
		// 			background: "url('./images/btn-buy.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', 'http://www.levis.com.tw/SalePage/Index/3922977')
		// 	} else if (num === 2) {
		// 		linkEle.css({
		// 			background: "url('./images/btn-buy.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', 'http://www.levis.com.tw/SalePage/Index/3922959')
		// 	} else {
		// 		linkEle.css({
		// 			background: "url('./images/btn-store.png') no-repeat"
		// 		})
		// 		linkEle.find('a').attr('href', storeLink)
		// 	}
		// 	linkEle.show();
		// } else {
		// 	linkEle.hide();
		// }

		// 設置GA事件
		var GaObj = {
			's2-item1': [
				's3_store_復古街潮_衣服',
				's3_store_復古街潮_背心',
				's3_store_復古街潮_褲子'
			],
			's2-item2': [
				's3_store_日系男紳_衣服',
				's3_store_日系男紳_外套',
				's3_store_日系男紳_褲子'
			],
			's2-item3': [
				's3_store_硬派男孩_衣服',
				's3_store_硬派男孩_外套',
				's3_store_硬派男孩_襯衫',
				's3_store_硬派男孩_褲子'
			],
			's2-item4': [
				's3_store_質感休閒_衣服',
				's3_store_質感休閒_外套',
				's3_store_質感休閒_褲子'
			]
		}

		var GaEvent = GaObj[type]
		if (GaEvent) {
			linkEle.attr('megais_ga', GaEvent[num])
		} else {
			linkEle.attr('megais_ga', '')
		}

		// console.log('num = ', num)
		// console.log('GaObj = ', GaObj)
		// console.log('GaEvent[num] = ', GaEvent[num])
	}

	function strTsObj(pStr){
    var tmpObj = {};
    if(pStr == undefined){
      return tmpObj
    }
    var tmpArr = pStr.replace(/\s/g, '');
    tmpArr = tmpArr.split(';');
    $(tmpArr).each(function(){
      var attributeArr = this.split(':');
      if(attributeArr[0] != ""){
        tmpObj[attributeArr[0]] = attributeArr[1];
      }
    });
    return tmpObj;
  };

	function scrollAnimate() {
		$(window).scroll(function(){
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var scrollPosition = scrollTop + windowHeight;
      var index = 0;
      $(".animate").each(function(i, element) {
          var j_this = $(this);
          if ( scrollPosition > j_this.offset().top + 200) {
              index = i;
              j_this.not(".show").addClass("show");
          }
      });

      if ($('.s1-kv1').hasClass('show')) {
				$('.s1-kv1-btn-box').addClass("show");
      }
      if ($('.s2-item1').hasClass('show')) {
      	$('.s2-item2, .s2-item3, .s2-item4').addClass("show");
      }
      if ($('.s3-title').hasClass('show')) {
      	$('.s3-item').addClass("show");
      }
			if ($('.s4-item').hasClass('show')) {
      	$('.s4-item-men, .s4-item-women').addClass("show");
      }

	  }).scroll();
	}

	function paramsPopup() {
		var params = location.href.split("?")[1];
		if (!params) return;

		var paramsArr, popupVal;
		paramsArr = params.split("&");

		for (var i = 0; i < paramsArr.length; i++) {
			if (paramsArr[i].indexOf('popup') >= 0) {
				popupVal = paramsArr[i];
				break;
			}
		}

		popupVal = popupVal.split("=")[1];
		if (popupVal == 'true') {
			Fun.popupChange($('.popup#jshop'), true);
			$('.pop-close-btn-box').fadeIn();
			$('.img-mask').show();
		}

	}

	//===========
	function clickCheck(){
			var downStr = "mousedown",
					upStr = "mouseup",
					moveStr = "mouseup";
			//if ('ontouchstart' in document.documentElement) {
			if(Fun.detectmobile.isMobile){
					downStr = "touchstart",
					upStr = "touchend",
					moveStr = "touchmove";
					FastClick.attach(document.body);
			}
			$(document).on(downStr, function(e) {
					_sliderObj.downBol = true;
					_sliderObj.prevPosition = {};
					_sliderObj.prevPosition.x = e.pageX;
					_sliderObj.prevPosition.y = e.pageY;
					if (_sliderObj.prevPosition.x == undefined) {
							_sliderObj.prevPosition.x = e.originalEvent.changedTouches[0].pageX;
							_sliderObj.prevPosition.y = e.originalEvent.changedTouches[0].pageY;
					}
					setClickTimer();
			})/*.on(upStr, function(e) {
					if (checkClick()) {
							clearClickTimer();
							_settings.onClickCallback(e);
					}
			})*/.on(moveStr, function(e){
					if(_sliderObj.downBol){
							_sliderObj.nowPosition = {};
							_sliderObj.nowPosition.x = e.pageX;
							_sliderObj.nowPosition.y = e.pageY;
							if (_sliderObj.nowPosition.x == undefined) {
									_sliderObj.nowPosition.x = e.originalEvent.changedTouches[0].pageX;
									_sliderObj.nowPosition.y = e.originalEvent.changedTouches[0].pageY;
							}
							var disNum = parseInt(Math.sqrt(Math.pow(_sliderObj.prevPosition.x - _sliderObj.nowPosition.x, 2) + Math.pow(_sliderObj.prevPosition.y - _sliderObj.nowPosition.y, 2)));
							if (disNum > 20) {
									clearClickTimer();
							}
					}
			})

			function setClickTimer() {
					clearClickTimer();
					_sliderObj.downBol = true;
					_sliderObj.clickTimer = window.setTimeout(clearClickTimer, 300);
			}

			function clearClickTimer() {
					if (_sliderObj.clickTimer) {
							window.clearTimeout(_sliderObj.clickTimer);
					}
					delete _sliderObj.downBol;
			}
	}

    var url = "";

    function changeProductPhoto() {
        var changeEle = $('.product_view .product_bigImg img'),
            // url = "images/501/",
            // url = "",
            pageNum = "#slider__num1_ .btnProduct_num2_",
            masterSlider;
        // 避免看ProductPhoto時，後面的頁面滑動
        $('body').css({
            'overflow': 'hidden'
        });

        _sliderObj.nowProductArr = _sliderObj.imgArr;
        _sliderObj.nowLoadProductArr = _sliderObj.imgLoadArr;
        _sliderObj.nowImagePhotoArr = _sliderObj.adImgArr;



        if (_sliderObj.nowProductArr.length == 1) {
            // $('.leftBtn, .rightBtn').hide();
        } else {
            // $('.leftBtn, .rightBtn').show();
        }

        // 展示形象圖
        if (_sliderObj.nowClickNum % _sliderObj.imageRandom == 0 && _sliderObj.nowClickNum != 0 && _sliderObj.nowImagePhotoArr != undefined) {
            if (_sliderObj.nowImageNum > _sliderObj.nowImagePhotoArr.length - 1) {
                _sliderObj.nowImageNum = 0;
            }
            url = _sliderObj.nowImagePhotoArr[_sliderObj.nowImageNum];
            _sliderObj.imageRandom = 2 + Math.floor(Math.random() * 3);
            _sliderObj.nowClickNum = 0;
            _sliderObj.nowImageNum++;
            _sliderObj.nowProductNum--;
        } else {
            if (_sliderObj.nowProductNum < 0) {
                _sliderObj.nowProductNum = _sliderObj.nowProductArr.length - 1;
            }

            if (_sliderObj.nowProductNum >= _sliderObj.nowProductArr.length) {
                _sliderObj.nowProductNum = 0;
            }
            url = _sliderObj.nowProductArr[_sliderObj.nowProductNum];
				}

        if (!_sliderObj.nowLoadProductArr[_sliderObj.nowProductNum - 1]) {
            // _sliderObj.nowProductArr[_sliderObj.nowProductNum -1] = url;
            Fun.loadingChange(true);
            Fun.loadImg(url, productCallback);
            // console.log('url_true = ', url);
        } else {
            //changeEle.attr('src', url);
            // productChangeShow(url);
            // console.log('url = ', url);
        }
				// productChangeShow(url);
    }

    function productCallback(pBol) {
        pBol = pBol || false;
        Fun.loadingChange(false);
        // console.log("productCallback");
        if (pBol) {
            //$('.product_view .product_bigImg img').attr("src", _sliderObj.nowProductArr[_sliderObj.nowProductNum -1]);
            // productChangeShow(_sliderObj.nowProductArr[_sliderObj.nowProductNum -1]);
            productChangeShow(url);

        } else {

        }
    }

    function productChangeShow(pSrc) {
				// console.log(pSrc);
        var nowImgEle = $('.product_view .product_bigImg img');
        if (_sliderObj.productChangeType) {
            var newEle = '<img src="_src_">';
            newEle = newEle.replace("_src_", pSrc);
            newEle = $(newEle);
            $('.product_view .product_bigImg').append(newEle);
            setProductTMX(nowImgEle, false);
            setProductTMX(newEle, true);
        } else {
            nowImgEle.attr("src", pSrc);
        }
    }

    function setProductTMX(pEle, pBol) {
        pBol = pBol || false;
        var strMove = {},
            endMove = {},
            moveNum = 300;
        if (pBol) {
            if (_sliderObj.productChangeType == "prev") {
                strMove.left = -moveNum
            } else if (_sliderObj.productChangeType == "next") {
                strMove.left = moveNum;
            }
            strMove.alpha = 0;
            endMove.left = 0;
            endMove.alpha = 1;
            endMove.ease = Circ.easeOut;
        } else {
            if (_sliderObj.productChangeType == "prev") {
                endMove.left = moveNum;
            } else if (_sliderObj.productChangeType == "next") {
                endMove.left = -moveNum;
            }
            endMove.alpha = 0;
            endMove.onComplete = setProductComplete;
            endMove.onCompleteParams = [pEle, pBol];
            endMove.ease = Circ.easeOut;
        }
        TweenMax.fromTo(pEle, 1, strMove, endMove);
    }

    function setProductComplete(pEle, pBol) {
        if (pBol) {
            pEle.show();
        } else {
            pEle.hide();
            pEle.remove();
        }
    }

    //window fun
    window.productClick = function(pId) {
        delete _sliderObj.productChangeType;
        // console.log(_sliderObj.downBol);
        if (!_sliderObj.downBol) return;
        $('.product_view').fadeIn(500);
        _sliderObj.nowProductNum = parseInt(pId, 10);
        changeProductPhoto();
    }

    //PhotoBanner
    function PhotoBanner(pEle, pW) {
        var _moveObj = {};
        _moveObj.nowNum = 0;
        _moveObj.w = pW;
        _moveObj.photos = pEle.children();
        _moveObj.photosLength = _moveObj.photos.length;
        _moveObj.nowEle = _moveObj.photos.eq(_moveObj.nowNum);
        _moveObj.delayTimer = parseInt(Math.random() * 3);
        _moveObj.timerNum = parseInt((3 + Math.random() * 3) * 1000);
        _moveObj.photos.hide().eq(0).show();

        function loop() {
            stopTimer();
            _moveObj.nowNum++;
            if (_moveObj.nowNum >= _moveObj.photos.length) _moveObj.nowNum = 0;
            setTMX(_moveObj.nowEle, false);
            _moveObj.nowEle = _moveObj.photos.eq(_moveObj.nowNum)
            setTMX(_moveObj.nowEle, true);
            _moveObj.delayTimer = 0;
        };

        function startTimer() {
            _moveObj.loopTimer = window.setTimeout(loop, _moveObj.timerNum);
        }

        function stopTimer() {
            if (_moveObj.loopTimer) {
                window.clearTimeout(_moveObj.loopTimer);
                delete _moveObj.loopTimer
            }
        }

        function setTMX(pEle, pBol) {
            pBol = pBol || false;
            var strMove = {},
                endMove = {};
            if (pBol) {
                strMove.left = _moveObj.w;
                strMove.onStart = complete;
                strMove.onStartParams = [pEle, pBol];
                endMove.left = 0;
            } else {
                strMove.left = 0;
                endMove.left = -_moveObj.w;
                endMove.onComplete = complete;
                endMove.onCompleteParams = [pEle, pBol];
            }

            TweenMax.fromTo(pEle, 1, strMove, endMove);
        }

        function complete(pEle, pBol) {
            if (pBol) {
                pEle.show();
            } else {
                pEle.hide();
                startTimer();
            }
        }
        startTimer();
    }

})(jQuery)
