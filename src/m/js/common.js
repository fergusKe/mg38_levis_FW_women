var Com = (function($) {
	// switchDevice();
	var comObj = {};
	var _loadNum = 0,
			_scrollTop = 0,
			_obj = {}
			_obj.api = {}
			_obj.apiPara = {}
			_obj.apiPara.tagId = Fun.getQueryVariable('tagId')
			_obj.defaultSearchWord = ''
			_obj.apiPath = ''
			_obj.layoutPath = ''
			_obj.mobilePath = ''
			_obj.officailPath = '../'
	$(function() {
		// setPath()
		// loadLayout()
	})

	function setPath() {
		// 測試區不改變路徑，使用自己目錄下的檔案
		if (window.location.pathname.split('/')[1] === '!!levis_demo02') {
			_obj.officailPath = '/!!levis_demo02/'
			// _obj.officailPath = window.location.origin + '/'
			// _obj.mobilePath = _obj.officailPath + 'm/'
			// _obj.officailPath = 'http://www.levi.com.tw/'
			// _obj.mobilePath = 'http://www.levi.com.tw/m/'
			// let pathname = window.location.pathname.split('/')[1]
			// let pathname2 = window.location.pathname.split('/')[2]
			// let pathLength = window.location.pathname.split('/').length - 2
			// let path = '../'
			// for (let i = 0; i < pathLength; i++) {
			// 	_obj.apiPath += path
			// }
			// for (let i = 0; i < pathLength - 1; i++) {
			// 	_obj.layoutPath += path
			// }
		} else {
			_obj.officailPath = '/'
		}

		// _obj.apiPath = _obj.officailPath

		_obj.apiUrl = _obj.officailPath + 'admin/api/getMenu.php'
		_obj.api.search = _obj.officailPath + 'admin/api/postKeyword.php'
		_obj.api.defaultSearchWord = _obj.officailPath + 'admin/api/getKeyword.php?is_home=1'
		// console.log('_obj.apiPath = ', _obj.apiPath)
		console.log('_obj.apiUrl = ', _obj.apiUrl)
	}

	function loadLayout() {
		$('.header').load('layout/header.html', loadNumCount);
		$('.footer').load('layout/footer.html', loadNumCount);
		$('.footer-nav').load('layout/footer-nav.html', loadNumCount);
		$('.popup#menu').load('layout/popup-menu.html', loadNumCount);
		$('.popup#rotation').load('layout/popup-rotation.html', loadNumCount);
	}

	function loadNumCount() {
		_loadNum++;
		if (_loadNum >= 5) {
			getApi();
			comObj.loadLayout = true
		}
	}

	function getApi() {
		// ./js/data/menu.json
		// ./actions/menu.php
		$.get(_obj.apiUrl, function(data) {
			// console.log('data = ', data)
			renderMenu(data.data)
			setPopup();
			setHamburger();
			setButton();
			setHeader();
			alertRotation();
			// accordion();
		}, 'json')

		$.get(_obj.api.defaultSearchWord, function(data) {
			_obj.defaultSearchWord = data.data[0] && data.data[0].hasOwnProperty('keyword') ? data.data[0].keyword : ''
			setSearch()
		}, 'json')
	}


	function setSearch() {
		// 設置預設搜尋關鍵字
		$('.search-input input').attr('placeholder', _obj.defaultSearchWord)

		// 點擊 header 的搜尋按鈕
		$('.header .search-input .search-btn').on('click', function() {
			searchSubmit()
		})

		// 按 enter 執行搜尋
		$('.header .search-input').on('keyup', function(e) {
			if (e.keyCode === 13) {
				searchSubmit()
			}
		})
	}

	function searchSubmit() {
		let searchText = $('.header .search-input input').val().trim()

		if (searchText) {
			// 將搜尋文字 POST 給後端記錄
			$.post(_obj.api.search, {'keyword': searchText }, function(data) {
				window.location.href = `${_obj.officailPath}search.html?searchText=${searchText}`
			}, 'json')
		} else {
			$.post(_obj.api.search, {'keyword': _obj.defaultSearchWord }, function(data) {
				window.location.href = `${_obj.officailPath}search.html?searchText=${_obj.defaultSearchWord}`
			}, 'json')
		}
	}

	function renderMenu(pData) {
		let nav1MenuEle = $('#menu.popup .menu-list')
		let nav1ContEle = $('#menu.popup .popup-main')
		let layer1, layer2, layer3, layer1MenuHtml = '', layer1ContHtml = '', layer2Html = '' , layer3Html = ''
		layer1 = pData.map(function(data, index1, arr1) {
			// if (index1 == 0) {
			// 	nav1ContEle = $('#menu.popup .popup-content.men')
			// } else if (index1 == 1) {
			// 	nav1ContEle = $('#menu.popup .popup-content.women')
			// }

			layer1MenuHtml =  `
				<li megais_ga="popup_${data.type}" class="menu-${data.type}">
          <a href="javascript:;">
            <span></span>
          </a>
        </li>
			`

			if (index1 === pData.length - 1) {
				layer1MenuHtml += `
					<li megais_ga="popup_lookbook" class="menu-lookbook">
						<a href="${_obj.mobilePath}lookbook.html">
							<span></span>
						</a>
					</li>
					<li megais_ga="popup_ask" class="menu-ask">
						<a href="${_obj.mobilePath}ask.html">
							<span></span>
						</a>
					</li>
					<li megais_ga="popup_loop" class="menu-loop">
						<a href="${_obj.mobilePath}loop.html">
							<span></span>
						</a>
					</li>
					<li megais_ga="popup_stories" class="menu-stories">
						<a href="${_obj.mobilePath}stories.html">
							<span></span>
						</a>
					</li>
				`
			}
			// console.log('data = ', data)
			layer1ContHtml =  `
				<div class="popup-content ${data.type}">
					<div class="popup-sub-title">
						<a megais_ga="popup_title_${data.type}" class="popup-sub-title-name" href="${_obj.mobilePath}feature.html?type=${data.type}">${data.name}</a>
						<a class="back-menu-btn" href="javascript:;"></a>
					</div>
					<ul class="accordion-list">

					</ul>
				</div>
			`
			// console.log('layer1MenuHtml = ', layer1MenuHtml)
			nav1MenuEle.append(layer1MenuHtml)
			nav1ContEle.append(layer1ContHtml)

			layer2 = data.category.map(function(data, index2, arr2) {
				let nav2Ele = nav1ContEle.find('.popup-content').eq(index1 + 1).find('.accordion-list')
				// console.log('index2 = ', index2)
				// console.log('nav2Ele = ', nav2Ele)

				layer2Html = `
					<li>
						<a class="list-title" href="javascript:;">
							<div class="list-title-text">
								${data.name}
								<div class="switch-icon"></div>
							</div>
						</a>
						<ul class="list-sub">

						</ul>
					</li>
				`

				nav2Ele.append(layer2Html)
				// console.log('nav2Ele = ', nav2Ele)
				let nav3Ele = nav2Ele.find('> li').eq(index2).find('.list-sub')
				layer3 = data.list.map(function(data, index3, arr3) {
					if (_obj.apiPara.tagId == data.tagId) {
						_obj.apiPara.listItem = data
					}

					// 如果後台沒有設定連結時
					if (!data.link) {
						data.link = 'javascript:;'
					}
					
					layer3Html = `
						<li>
							<a target="_blank" href="${data.link}">
								${data.name}
								<span class="list-sub-arrow"></span>
							</a>
						</li>
					`

					nav3Ele.append(layer3Html)

					// 執行到最後一筆時
					if (index1 == arr1.length -1) {
						if (index2 == arr2.length -1) {
							if (index3 == arr3.length -1) {
								setListHTMLBanner()
								accordion()
								Fun.tracking()
							}
						}
					}
				})
			})
		})
	}

	function setListHTMLBanner() {
		var href = window.location.href,
				params = href.split("?")[1],
				hrefSplit = href.split("?")[0].split("/"),
				page = '',
				url = "./m/";

		page = hrefSplit[hrefSplit.length -1]
		console.log('page = ', page)

		// 只有在list.html才會執行
		if (page != 'list.html') return

		console.log('_obj.apiPara.listItem = ', _obj.apiPara.listItem)
		const kvEle = document.querySelector('.kv')

		// ® 的樣式設定
		_obj.apiPara.listItem.text_en = _obj.apiPara.listItem.text_en.replace(/®/g, '<span class="registered">®</span>')

		let kvHtml = `
			<div class="category-name">
				<div class="zh">${_obj.apiPara.listItem.text}</div>
				<div class="en">${_obj.apiPara.listItem.text_en}</div>
			</div>
			<img src="../upload/ProClass/${_obj.apiPara.listItem.pic_mobile}" />
		`
		console.log('_obj.apiPara.listItem.pic_mobile = ', _obj.apiPara.listItem.pic_mobile)

		kvEle.innerHTML = kvHtml

		if (!_obj.apiPara.listItem.pic_mobile) {
			kvEle.className += ' show-txt'
		}

		// if (page == 'list.htm' || page == 'list.html') {
		// 	const kvEle = $('.kv')
		// 	let kvHtml = `
		// 		<img src="../upload/ProClass/${_obj.apiPara.pic_mobile}" />
		// 	`

		// 	kvEle.html(kvHtml)
		// }
	}

	function accordion() {
    $('.popup#menu .list-title').on('click', function() {
			$(this).parent('li').removeClass('active');
      $(this).parents('.accordion-list').find('.list-sub').slideUp();
      // $(this).parents('.accordion-list').find('.switch-icon').css('backgroundPositionY', 0);

      if ( $(this).next().css('display') == 'none' ) {
				$(this).parent('li').addClass('active').siblings().removeClass('active');
        $(this).next().slideDown();
        // $(this).find('.switch-icon').css('backgroundPositionY', -30);
      }

    });

		$('.footer .list-title').on('click', function() {
			$(this).parent('li').removeClass('active');
      $(this).parents('.accordion-list').find('.list-sub').slideUp();
      // $(this).parents('.accordion-list').find('.switch-icon').css('backgroundPositionY', 0);

      if ( $(this).next().css('display') == 'none' ) {
				$(this).parent('li').addClass('active').siblings().removeClass('active');
        $(this).next().slideDown();
        // $(this).find('.switch-icon').css('backgroundPositionY', -30);
      }

    });
  }

	function alertRotation() {
		var winWidth = $(window).width();
		var imgWidthOriginal = 424;
		var imgheightOriginal = 411;
		var imgWidth = 250;
		var imgHeight = imgheightOriginal / imgWidthOriginal * imgWidth;
		// Fun.popupChange($('.popup#rotation'), true);
		$('.popup#rotation .popup-content').css({
			width: imgWidth,
			height: imgHeight,
			backgroundSize: 'cover'
		});

		window.addEventListener("orientationchange",onOrientationchange ,false);

		onOrientationchange();

		function onOrientationchange() {
			if (window.orientation === 180 || window.orientation === 0) {
				// alert('直式');
				Fun.popupChange($('.popup#rotation'));
				$('.wrap').css({
					filter: 'blur(0)'
				});
			}
			if (window.orientation === 90 || window.orientation === -90 ){
				// alert('橫式');
				Fun.popupChange($('.popup#rotation'), true);
				$('.wrap').css({
					filter: 'blur(10px)'
				});
			}
		}
	}

	function setHeader() {
		var headerHeight = $('.header').height();
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > headerHeight) {
				$('.header .main').css({
					backgroundColor: 'rgba(0, 0, 0, .8)'
				});
			} else {
				$('.header .main').css({
					backgroundColor: 'rgba(0, 0, 0, 1)'
				});
			}
		});
	}

	function setPopup() {
		$('#menu .popup-main').scroll(function() {
			var scrollTop = $(this).scrollTop();
			// console.log(scrollTop);
			$('.logo').css({
				top: -scrollTop
			});
			$('.nav-btn').css({
				top: 21 - scrollTop
			});
		});

		$('.nav-btn').on('click', function() {
			// 關掉搜尋效果
			$('body').removeClass('search-active');

			if ( !$(this).hasClass('active') ) {
				$(this).addClass('active');
				Fun.popupChange($('.popup#menu'), true);
				$('.wrap').css({
					filter: 'blur(10px)'
				});
				$('.header .main').css({
					backgroundColor: 'transparent'
				});
				$('.header .search-icon').hide()

				// menu 初始狀態
				$('#menu .popup-content').css({
					left: 640
				});
				$('#menu .popup-content.options').css({
					left: 0
				});
				$('#menu .accordion-list .list-sub').css({
					display: 'none'
				});
				$('#menu .accordion-list > li').removeClass('active');

			} else {
				$(this).removeClass('active');
				Fun.popupChange($('.popup'), false, function() {

				});

				$('.wrap').css({
					filter: 'blur(0)'
				});
				$('.header .main').css({
					backgroundColor: '#000'
				});
				$('.header .search-icon').show()

				$('.logo').css({
					top: 0
				});
				$('.nav-btn').css({
					top: 21
				});
			}
		});

		// menu 子項目切換
		var j_options = $('#menu .options');
		var j_men = $('#menu .man');
		var j_women = $('#menu .woman');
		var j_accessory = $('#menu .accessory');
		$('#menu').on('click', '.menu-man', function() {
			j_men = $('#menu .man');
			j_options.animate({
				left: -640
			});
			j_men.animate({
				left: 0
			});
		});
		$('#menu').on('click', '.menu-woman', function() {
			j_women = $('#menu .woman');
			j_options.animate({
				left: -640
			});
			j_women.animate({
				left: 0
			});
		});
		$('#menu').on('click', '.menu-accessory', function() {
			j_accessory = $('#menu .accessory');
			j_options.animate({
				left: -640
			});
			j_accessory.animate({
				left: 0
			});
		});

		$('.popup-content').on('click', '.back-menu-btn', function() {
			j_options = $('#menu .options');
			$(this).parents('.popup-content').animate({
				left: 640
			});
			j_options.animate({
				left: 0
			});

		});

	}

	function setHamburger() {
		var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

	    var hamburgers = document.querySelectorAll(".hamburger");
	    if (hamburgers.length > 0) {
	      forEach(hamburgers, function(hamburger) {
	        hamburger.addEventListener("click", function() {
	          this.classList.toggle("is-active");
	        }, false);
	      });
	    }
	}

	function setButton() {
		// 切換顯示/隱藏搜尋區域
    $('.header .search-icon').on('click', function() {
			$('body').toggleClass('search-active');
      // $('.header .search-input').toggleClass('active')
		})

		// $('.header .search-icon').on('click', function() {
		// 	console.log('toggleClass123')
		// 	$('body').toggleClass('search-active');
    //   // $('.header .search-input').toggleClass('active')
		// })

		// $('.header .nav').on('mouseenter', function() {
		// 	$('body').addClass('active');
		// })

		// $('.header .nav').on('mouseleave', function() {
		// 	$('body').removeClass('active');
		// })

		// 在 ask.html 切換到 ask.html#loop 時
		// hash 的項目不會換頁，所以強置 reload
		// $('.footer a').on('click', function(e) {
		// 	let href = $(this).attr('href')
		// 	if (href.indexOf('ask.html') > -1) {
		// 		window.location.reload()
		// 	}
		// })

		$('.footer .top-btn').on('click', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 1000, 'easeInOutQuart');
		});

		// top-nav 找門市按鈕
		$('.top-nav .stores').on('mouseenter', function() {
			$('.stores_title').css({
				width: 0,
				height: 0
			});
			$('.stores_entity, .stores_web').css({
				width: 'auto',
				height: 'auto'
			});
		});
		$('.top-nav .stores').on('mouseleave', function() {
			$('.stores_title').css({
				width: 'auto',
				height: 'auto'
			});
			$('.stores_entity, .stores_web').css({
				width: 0,
				height: 0
			});
		});


		// $('.s3-item-men, .s3-item-women').on('click', function() {
		// 	$('.product_view .popup-content').css({
		// 		width: 750,
		//     height: 750
		// 	})
		// });
		//
		// $('.s5-item').on('click', function() {
		// 	$('.product_view .popup-content').css({
		// 		width: 750,
		//     height: 1060
		// 	})
		// });
		//
		// $('.s6-item-men, .s6-item-women').on('click', function() {
		// 	$('.product_view .popup-content').css({
		// 		width: 720,
		//     height: 885
		// 	})
		// });
	}

	function attentionBtn() {
		var j_attentionBtn = $('.attention-btn');
		var j_attentionBtn_img = j_attentionBtn.find('img');
		var attentionBtnHeight = j_attentionBtn.height();
		var attentionBtnWidth = j_attentionBtn.width();
		var windowHeight = $(window).height();
		var scrollTop = $(window).scrollTop();
		var scrollPosition = windowHeight + scrollTop;
		// console.log('attentionBtnHeight = ', attentionBtnHeight);
		var s1_kv1_top = 100 + 125;
		var s1_kv1_height = $('.s1-item').height();
		// console.log('s1_kv1_top = ', s1_kv1_top);
		// console.log('s1_kv1_height = ', s1_kv1_height);
		var attentionBtn_init_top = (windowHeight - attentionBtnHeight) / 2;
		var attentionPosition;
		if (Fun.detectmobile.isMobile) {
			// console.log('mobile');
			// j_attentionBtn_img.css({width: 208});
			// attentionBtnHeight = j_attentionBtn.height();

			// attentionBtn_init_top = windowHeight - attentionBtnHeight - 50;
			TweenMax.to(j_attentionBtn, 2, {
				top: scrollTop + attentionBtn_init_top,
				autoAlpha: 1,
				ease: Back.easeOut.config(1.1),
				startAt: {
					top: scrollPosition,
					autoAlpha: 0
				}
			});

			$(window).scroll(function() {
				scrollTop = $(window).scrollTop();
				attentionPosition = (scrollTop + attentionBtn_init_top) > 6314 ? 6314 : (scrollTop + attentionBtn_init_top);
				TweenMax.to(j_attentionBtn, .5, {
					top: attentionPosition,
					autoAlpha: 1
				});
			});
		} else {
			// j_attentionBtn.css({
			// 	top: scrollTop + attentionBtn_init_top,
			// 	right: -attentionBtnWidth
			// });
			TweenMax.to(j_attentionBtn, 0, {
				top: scrollTop + attentionBtn_init_top,
				right: -attentionBtnWidth,
				autoAlpha: 1
			});
			TweenMax.to(j_attentionBtn, .5, {
				css: {
					right: -50,
					// right: 0,
					autoAlpha: 1,
					ease: Power2.easeOut
				},
				delay: .5
			});

			// 螢幕縮放時，確保attentionBtn位置不會超過頁面長度
			var maxPosition = 0;
			$(window).resize(function() {
				var bodyHeight = $('body').height();
				var footerHeight = $('.footer').height();
				var attentionHeight = $('.attention-btn').height();
				maxPosition = bodyHeight - footerHeight - attentionHeight;
			}).resize();

			$(window).scroll(function() {
				scrollTop = $(window).scrollTop();
				scrollPosition = windowHeight + scrollTop;
				attentionPosition = scrollTop + attentionBtn_init_top;

				TweenMax.to(j_attentionBtn, .5, {
					top: attentionPosition > maxPosition ? maxPosition : attentionPosition,
					autoAlpha: 1
				});
			});

			// 螢幕大於1400時，attention仍能保持位置
			// var win_w = $(window).width();
			// var win_max_w = 1400;
			// var attention_right_position;
			// $(window).resize(function() {
			// 	win_w = $(window).width();
			// 	attention_right_position = (win_w - win_max_w) / 2;
			// 	if (win_w > win_max_w) {
			// 		j_attentionBtn.css({'right': attention_right_position});
			// 	}
			// }).resize();
		}

		// mouseenter 展開
		j_attentionBtn.on('mouseenter', function() {
			TweenMax.to(j_attentionBtn, .5, {
				right: 0
			});
		});
		j_attentionBtn.on('mouseleave', function() {
			TweenMax.to(j_attentionBtn, .5, {
				right: -50
			});
		});
	}

	function switchDevice() {
		if (!Fun.detectmobile.isMobile) {
    	var href = window.location.href,
					params = href.split("?")[1],
					hrefSplit = href.split("?")[0].split("/"),
					page = '',
      		url = "../";

			if (href.indexOf('.htm') != -1) {
				page = hrefSplit[hrefSplit.length -1];
				url += page;
			}
      if(params){
          url += "?" + params;
      }
      window.location.href = url;
		}
		
		if (location.protocol === 'http:') {
			let url = location.href.split('://')
			url[0] = "https"
			url.join('://')
			let newUrl = url.join('://')
			window.location.href = newUrl
		}
	}

	return comObj
})(jQuery);
