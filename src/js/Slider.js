var Slider = function( cfg ) {
	var _youtubeObj = {options:{}};
	var index = 0,
			// j_nav_btn = $('.nav-btn'),
			j_slider = $(cfg.name),
			j_normalize = j_slider.find('.slider-normalize'),
			j_ul = j_slider.find('.slider-content'),
			j_li = j_ul.find('li'),
			zoom = document.getElementById("zoom"),
			j_zoom = $('#zoom'),
			j_zoom_btn = $('.zoom-btn'),
			j_zoom_img = j_zoom.find('.product_bigImg img'),
			j_pinch_zoom = $('.pinch-zoom'),
			j_zoom_hint_icon = j_zoom.find('.hint-icon'),
			j_zoom_close_btn = j_zoom.find('.closebtn'),
			window_height = $(window).height(),
			header_height = 72,
			zoom_img_width = 655,
			zoom_img_height = 655,
			j_li_width = j_li.width(),
			j_li_length = j_li.length,
			addCloneItem = 1,
			j_normalize_position = j_li_width * addCloneItem,
			autoPlay, intervalId, interval, startX, endX,
			touches = [], changedTouches = [],
			initDistance, t1, t2, distance = 0,
			scaleRatio = 0.01, imgScaleVal, initImgScaleVal = 1,
			touchTimeout,
			positionX, positionY, moveX = 0, moveY = 0,
			imgPositionX_gutter, imgPositionY_gutter,
			imgScaleWidth, imgScaleHeight,
			imgPositionX_min, imgPositionX_max, imgPositionY_min, imgPositionY_max,
			playerArr = [];

	$('.slider-content li').each(function(i) {
		if ($(this).hasClass('video')) {
			var youtubeId = $(this).attr('youtubeId');
			// console.log('youtubeId = ', youtubeId);
			// player = videojs(document.getElementById(videoId));
			_youtubeObj.movieArr = [];
			_youtubeObj.movieArr.push(youtubeId);
		}

		playerArr[i] = youtubeId;
	});

	// initYoutube();

	function initYoutube(){
		// _youtubeObj.movieArr = playerArr;
		// console.log('_youtubeObj.movieArr = ', _youtubeObj.movieArr);
    // _youtubeObj.movieArr = [];
    // _youtubeObj.movieArr.push("XLcrPoN7dlk");
    _youtubeObj.options.id = 'youtube';
    _youtubeObj.options.width = 640;
    _youtubeObj.options.height = 360;
    _youtubeObj.options.autoplay = 1;
    _youtubeObj.options.onComplete = youtubeComplete;
    changeYoutube(0);
  }
	function changeYoutube(pNum){
      _youtubeObj.videoNum = pNum;
      // _youtubeObj.options.url = _youtubeObj.movieArr[_youtubeObj.videoNum];
      $('.video-cont').html("<div id='youtube'></div>");
      if(_youtubeObj.api){
          _youtubeObj.api.changeOptions(_youtubeObj.options);
      }else{
          _youtubeObj.api = new YoutubeApi(_youtubeObj.options);
      }
			// console.log('_youtubeObj.options = ', _youtubeObj.options);
  }
  function youtubeComplete(){
    _youtubeObj.videoNum++;
    if(_youtubeObj.videoNum >= _youtubeObj.movieArr.length){
        _youtubeObj.videoNum = 0;
    }
    changeYoutube(_youtubeObj.videoNum);
  }
  function getYoutubeUrl(pID){
  	var url = "https://www.youtube.com/embed/_id_?rel=0&autoplay=1";
  	url = url.replace("_id_", pID);
  	return url;
  }
	// console.log('_youtubeObj = ', _youtubeObj);

	if (cfg.random) {
		randomSlide();
	}
	if (cfg.dotNav) {
		j_slider.append('<ul class="dotNav"></ul>');
		var j_dotNav = j_slider.find('.dotNav');
		var dotNamesArr = ['Orange Tab', '501®Skinny', '511™& 711男女窄管', '505™C復刻丹寧'];
		for (i = 0; i < j_li_length; i++){
			j_dotNav.append('<li></li>');
		}

		var j_dotNav_li = j_dotNav.find('li');
		j_dotNav_li.eq(index).addClass('active');
		j_dotNav_li.on('click touchstart', function(){
			index = $(this).index();
			j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
			j_dotNav_li.removeClass('active').eq(index).addClass('active');
		});

		if (j_li_length < 2) {

			j_dotNav.css({
				display: 'none'
			})
			// console.log('j_li_length = ', j_li_length)
		}

		// 調整位置
		// var sliderHight = 623;
		// var dotNav = j_dotNav.height();
		// j_dotNav.css({
		// 	top: ( sliderHight - dotNav ) / 2
		// });


	}
	if (cfg.list) {
		// $('.s6 .cont').append('<ul class="list"></ul>');
		var j_List = $('.s6 .cont').find('.list');
		for (i = 1; i <= j_li_length; i++){
				j_List.append('<li style="background: url(images/s6/s6-' + Fun.str_pad(i, 2, "0") + '.jpg);background-size: cover;"><a href=\"javascript:;\"><div class=\"mask\"></div></a></li>');
		}

		var j_List_li = j_List.find('li');
		j_List_li.eq(index).addClass('active');
		j_List_li.click(function(){
			index = $(this).index();
			j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
			j_List_li.removeClass('active').eq(index).addClass('active');
			clearInterval(intervalId);
			intervalId = setInterval(autoPlay, interval);
			if (!Fun.detectmobile.isMobile) {
				var s6_slider_top = $('.slider-content').offset().top;
				TweenLite.to(window, .8, {scrollTo: s6_slider_top});
			}
		});
	}
	if (cfg.arrowBtn) {
		var arrowBtn = "",
				j_nextBtn,
				j_prevBtn;
		arrowBtn += "<div class=\"btn prev-btn\">";
		arrowBtn += "<a href=\"javascript:;\"></a>";
		arrowBtn += "<\/div>";
		arrowBtn += "<div class=\"btn next-btn\">";
		arrowBtn += "<a href=\"javascript:;\"></a>";
		arrowBtn += "</div>";
		j_slider.append(arrowBtn);
		j_nextBtn = j_slider.find('.next-btn');
		j_prevBtn = j_slider.find('.prev-btn');

		j_nextBtn.click(function() {
			changeSlide(1);
		});
		j_prevBtn.click(function() {
			changeSlide(-1);
		});
	}
	if (cfg.thumbnail) {
		var idx = 0;
		var j_thumbnail = j_slider.find('.Thumbnail');
		var j_thumbnail_ul = j_thumbnail.find('ul');
		var j_thumbnail_li = j_thumbnail_ul.find('li');
		var j_thumbnail_li_length = j_thumbnail_li.length;
		var j_thumbnail_width = 123;
		var j_thumbnail_left_btn = j_thumbnail.find('.Thumbnail-left-btn');
		var j_thumbnail_right_btn = j_thumbnail.find('.Thumbnail-right-btn');
		// console.log('j_thumbnail_li = ', j_thumbnail_li);
		j_thumbnail_li.eq(index).addClass('active');
		j_thumbnail_li.click(function(){
			index = $(this).index();
			j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
			$(this).addClass('active').siblings('li').removeClass('active');
		});
		j_thumbnail_left_btn.click(function() {
			idx--;
			if (idx < 0) {
				idx = 0;
				return
			}
			j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
		});
		j_thumbnail_right_btn.click(function() {
			idx++;
			if (idx > 3) {
				idx = 3;
				return
			}
			j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
		});
	}

	j_ul.width( j_li_width * (j_li_length + (addCloneItem * 2)) );
	for (var i = 0; i < addCloneItem; i++) {
		j_ul.append(j_li.eq(i).clone());
		j_ul.prepend(j_li.eq(j_li_length - i -1).clone());
	}

	j_normalize.css({'left': -j_normalize_position});

	if (j_li_length > 1) {
		j_slider.on("touchstart", touchStart);
		j_slider.on("touchend", touchEnd);
	}



	j_zoom_btn.on('click', function() {
		if (j_li.eq(index).hasClass('video')) {
			j_li.eq(index).find('.vjs-fullscreen-control').click();
		} else {
			zoomShow();
		}
	});
	j_zoom_close_btn.on('click', function() {
		zoomHide();
	});

	function zoomShow() {
		$('#zoom .product_bigImg').css({
			left: 0,
			top: 0
		});

		var zoom_img_url = j_li.eq(index).attr('big-img');
		j_zoom_img = j_zoom.find('.product_bigImg img');
		j_zoom_img.attr('src', zoom_img_url);

		imgScaleVal = 1;
		// console.log('imgScaleVal = ', imgScaleVal);
		// setScaleImg();
		// j_pinch_zoom.css({height: $(window).height() - 72});



		$('.nav-btn').hide();
		j_zoom_hint_icon.show();
		Fun.popupChange($('.popup#zoom'), true);
		//停用頁面捲動功能
		// document.body.addEventListener('touchmove', function (e) {
		// 	e.preventDefault();
		// }, false);

		zoom.addEventListener("touchstart", function(e) {
			touches = e.touches;
			// touchScreen();
			setTouchTimeout();
			j_zoom_hint_icon.hide();
		});
		zoom.addEventListener("touchmove", function(e) {
				touches = e.touches;
				changedTouches = e.changedTouches;
				// touchScreen();
				// touchTimeout();
		});
		zoom.addEventListener("touchend", function(e) {
				touches = e.touches;
				changedTouches = [];
				initDistance = undefined;
				positionX = undefined;
				positionY = undefined;
				if (imgScaleVal) {
					initImgScaleVal = imgScaleVal;
				}
				clearTimeout(touchTimeout);
				// console.log('touchend');
		});
	}

	function setTouchTimeout() {
		if (touchTimeout) {
			clearTimeout(touchTimeout);
			touchTimeout = null;
		}
		touchScreen();
		touchTimeout = setTimeout(setTouchTimeout, 1000/30);
	}

	function touchScreen() {
		if (touches.length >= 2) {
			for (var i = 0; i < touches.length; i++) {
				t1 = touches[0];
				t2 = touches[1];
			}

			if (!initDistance) {
				initDistance = Math.ceil(Math.sqrt( (t1.pageX - t2.pageX) * (t1.pageX - t2.pageX) + (t1.pageY - t2.pageY) * (t1.pageY - t2.pageY) ));
			}
			// if (!imgScaleVal) {
			// 	initImgScaleVal = imgScaleVal;
			// }


			scaleImg();
			// console.log('initDistance = ', initDistance);
		} else {
			t1 = touches[0];
			moveImg();
		}
	}

	function scaleImg() {
		distance = Math.ceil(Math.sqrt( (t1.pageX - t2.pageX) * (t1.pageX - t2.pageX) + (t1.pageY - t2.pageY) * (t1.pageY - t2.pageY) ));
		imgScaleVal = initImgScaleVal + ((distance - initDistance) * scaleRatio);
		if (imgScaleVal < 1) {
			imgScaleVal = 1;
		} else if (imgScaleVal > 3) {
			imgScaleVal = 3;
		}
		setScaleImg();
		limitPosition();
	}

	function setScaleImg() {
		// $('.product_bigImg').css({
		// 	width: (640 * imgScaleVal)
		// });
		j_zoom_img.css({
			transform: 'scale(' + imgScaleVal + ')'
		});
	}

	function moveImg() {
		limitPosition();
	}

	function limitPosition() {
		if (!positionX) {
			positionX = t1.pageX - moveX;
		}
		if (!positionY) {
			positionY = t1.pageY - moveY;
		}

		moveX = t1.pageX - positionX;
		moveY = t1.pageY - positionY;
		console.log('positionX = ', positionX);

		imgScaleWidth = zoom_img_width * imgScaleVal;
		imgPositionX_gutter = ((imgScaleWidth - zoom_img_width) / 2);
		imgPositionX_max = imgPositionX_gutter;
		imgPositionX_min = -imgPositionX_gutter;
		imgScaleHeight = zoom_img_height * imgScaleVal;
		imgPositionY_gutter = ((imgScaleHeight - zoom_img_height) / 2);
		imgPositionY_max = imgPositionY_gutter;
		if (imgScaleHeight > (window_height - header_height)) {
			imgPositionY_min = -(imgScaleHeight - window_height) / 2 + header_height;
		} else {
			imgPositionY_min = imgPositionY_gutter;
		}

		if (moveX > imgPositionX_max) moveX = imgPositionX_max;
		if (moveX < imgPositionX_min) moveX = imgPositionX_min;
		if (moveY > imgPositionY_max) moveY = imgPositionY_max;
		if (moveY < imgPositionY_min) moveY = imgPositionY_min;

		$('#zoom .product_bigImg').css({
			left: moveX,
			top: moveY
		});
	}

	function zoomHide() {
		$('.nav-btn').show();
		imgScaleVal = 1;
		moveX = 0;
		moveY = 0;
		Fun.popupChange($('.popup#zoom'), false, function() {
			setScaleImg();
			$('#zoom .product_bigImg').css({
				left: 0,
				top: 0,
				transform: 'scale(1)'
			});
			$('#zoom .product_bigImg img').attr('src', '');
		});
	}

  function touchStart() {
      // event.preventDefault();
      startX = event.targetTouches[0].pageX;
  }

  function touchEnd() {
      // event.preventDefault();
      endX = event.changedTouches[0].pageX;
      moveX = endX - startX;

      if( moveX > 50 ){
				// j_prevBtn.click();
        changeSlide(-1);
				// _youtubeObj.api.pauseVideo();
				// console.log('_youtubeObj = ', _youtubeObj);
				$.each(playerArr, function(i, pObj) {
					if (pObj) {
						if (i == index) {
							// _youtubeObj.api.playVideo();
							j_zoom_btn.hide();
						} else {
							j_zoom_btn.show();
							_youtubeObj.api.pauseVideo();
						}
					}
				});
      }

      if( moveX < -50 ){
				// j_nextBtn.click();
        changeSlide(1);
				// _youtubeObj.api.pauseVideo();
				$.each(playerArr, function(i, pObj) {
					if (pObj) {
						if (i == index) {
							// _youtubeObj.api.playVideo();
							j_zoom_btn.hide();
						} else {
							j_zoom_btn.show();
							_youtubeObj.api.pauseVideo();
						}
					}
				});
      }
  }

	function changeSlide(pIndex) {
		index += pIndex;
		if (cfg.thumbnail) {
			// console.log('j_slider = ', j_slider)
			// console.log('j_li_length = ', j_li_length);
			if (j_li_length <= 6) {
				if (index >= j_li_length) {
					index = 0;
					j_ul.css({left: j_normalize_position});
				} else if (index < 0) {
					index = j_li_length - 1;
					j_ul.css({left: -j_li_length * j_li_width });
				}
			} else {
				if (index >= j_li_length) {
					index = 0;
					idx = 0;
					j_ul.css({left: j_normalize_position});
					j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
				} else if (index < 0) {
					index = j_li_length - 1;
					idx = 3;
					j_ul.css({left: -j_li_length * j_li_width });
					j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
				}

				// 等同click切換
				if (pIndex > 0) {
					if (index == 6) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 7) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 8) {
						idx = 3;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				}

				if (pIndex < 0) {
					if (index == 2) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 1) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 0) {
						idx = 0;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				}

				j_nextBtn.click(function() {
					if (index == 6) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 7) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 8) {
						idx = 3;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				});
				j_prevBtn.click(function() {
					if (index == 2) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 1) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 0) {
						idx = 0;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				});
			}
			// console.log('idx = ', idx);
		} else {
			if (index >= j_li_length) {
				index = 0;
				j_ul.css({left: j_normalize_position});
			} else if (index < 0) {
				index = j_li_length - 1;
				j_ul.css({left: -j_li_length * j_li_width });
			}
		}

		clearInterval(intervalId);
		intervalId = setInterval(autoPlay, interval);

		j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
		if (cfg.dotNav) {
			j_dotNav_li.removeClass('active').eq(index).addClass('active');
		}
		if (cfg.thumbnail) {
			j_thumbnail_li.removeClass('active').eq(index).addClass('active');
		}
		if (cfg.list) {
			j_List_li.removeClass('active').eq(index).addClass('active');
		}

		console.log('index = ', index);
		if ($('.slider.popslider li').eq(index + 1).hasClass('video-cont')) {
			var youtubeId = $(this).attr('youtubeId');
			changeYoutube(youtubeId);
		}

		// 切換 tailorshop 的文字
		if (cfg.data) {
			console.log('text')
			$('.slider .slider-title').text(cfg.data[index].name)
			$('.slider .txt-p').html(cfg.data[index].txt)

			var page = `${index + 1} / ${j_li_length}`
			$('.slider .page').text(page)
		}
	}

	function randomSlide() {
		var allImgArr = [];
		var imgUrl = "";
		for (var i = 0; i < j_li_length; i++) {
        imgUrl = j_li.eq(i).find('img').attr('src');
        allImgArr.push(imgUrl);
    }
    var getRandomArr = function (pArr) {
        var random, spliceItem, newArr = [];
        for(var i = pArr.length; i > 0; i--) {
            random = Math.floor( Math.random() * i );
            spliceItem = pArr.splice(random, 1).toString();
            newArr.push(spliceItem);
        }
        return newArr;
    }
    allImgArr = getRandomArr(allImgArr);
    for (var i = 0; i < j_li_length; i++) {
			j_li.eq(i).find('img').attr('src', allImgArr[i]);
    }
   //  var randomLi = "";
   //  for (var i = 0; i < j_li_length; i++) {
   //  	randomLi += "<li>";
   //  	randomLi += "<a href=\"javascript:;\">";
			// randomLi += "<img src=\"" + allImgArr[i] + "\" />";
			// randomLi += "</a>";
			// randomLi += "</li>";
   //  }
   //  j_ul.append(randomLi);
	}

	if (cfg.autoPlay) {
		autoPlay = function autoPlayfunc() {
			changeSlide(1);
		}
		// var intervalId, interval;
		interval = cfg.duration || 3000;
		intervalId = setInterval(autoPlay, interval);

		if (cfg.arrowBtn) {
			j_nextBtn.on('click', function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
			j_prevBtn.click(function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
		}
		if (cfg.thumbnail) {
			j_thumbnail_li.click(function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
		}
		if (cfg.dotNav) {
			j_dotNav_li.click(function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
		}
	}
}
