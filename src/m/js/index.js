(function ($) {
  $(function () {
    loading()
		// ® 的樣式設定
		// _obj.apiPara.listItem.text_en = _obj.apiPara.listItem.text_en.replace(/®/g, '<span class="registered">®</span>')
	});

  function loading() {
    $('body').css({
      overflowY: 'hidden'
    })

		// let imgsEle = $('img');
		let imgsEle = $('.s1 img, .s2 img, .s3 img');
    let imgsArr = imgsEle.map(function (idx, item) {
      let src = $(item).attr('src');
      return src;
    });

    imgsArr.push('images/bg.jpg');

    let index = 0,
      len = imgsArr.length,
      $progress = $('.loading-percent span');

    $.preload(imgsArr, {
      each: function (count) {
        $progress.html(Math.round((count + 1) / len * 100) + '%');
      },
      all: function () {
        $('#preLoading').addClass('hideLoading');
        $('body').css({
          overflowY: 'auto'
        });

        setButton();
				eventListener();
				slider();
      }
    });
	}

	function slider() {
		const s3Slider = new Swiper('.s3-slider', {
			loop: true,
      pagination: {
        el: '.s3 .swiper-pagination',
        type: 'fraction',
      }
		});
		
		const s5Slider = new Swiper('.s5-slider', {
			loop: true,
      pagination: {
				el: '.s5 .swiper-pagination',
				clickable: true,
      }
    });
	}

  function setButton() {
    TweenMax.set($('.ani'), {
      alpha: 0,
      y: 50
		});
		
  }

  function eventListener() {
		// 讓手機版一進來就看的到 s1, s2
		$('.s1.ani, .s2.ani').addClass('active');
		animate($('.s1.ani, .s2.ani'));

    $(window).scroll(function () {
			let windowHeight = $(window).height();
			let scrollTop = $(window).scrollTop();
			let scrollPosition = scrollTop + windowHeight;
			let distance = 200;

			$('.ani:not(.active)').each(function (i, element) {
				let $this = $(this);
				if (scrollPosition > $this.offset().top + distance) {
					$this.addClass('active');
					animate($this);
				}
			});
		}).scroll();
  }

  function animate(element) {
    TweenMax.to($(element), 0.7, {
      alpha: 1,
      y: 0,
      ease: Power3.easeNone
    });
  }

})(jQuery);
