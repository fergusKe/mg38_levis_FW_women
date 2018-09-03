(function ($) {
	let accessToken =
    '?access_token=1824265323.e05d78c.fa56b78736c641e586cd39f188214073';
  $(function () {
    loading()
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

				checkHashtag();
        setButton();
				eventListener();
				slider();
				setIg();
      }
    });
	}

	function setIg() {
		$.get(
      'https://api.instagram.com/v1/users/self/media/recent/' + accessToken,
      function (data) {
        data.data.map(function (item) {
          let img = document.createElement('img');
          img.src = item.images.low_resolution.url;
          let html = `
            <div class="swiper-slide bg-cover" style="background-image: url(${
              item.images.standard_resolution.url
            })">
              <a megais_ga="m_event2018fw_women_s8_ig_photo" href="${item.link}" target="_blank"></a>
            </div>
          `;
          $('.s8-slider .swiper-wrapper').append(html);
				});

        let s8slider = new Swiper('.s8-slider', {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
				});
				
				Fun.tracking()
      },
      'json'
    );
	}

	function checkHashtag() {
		if (location.hash === '#anniversary') {
			goToAnniversary();
			let $ani = $('.ani');
			$ani.addClass('active');
			animate($ani);
		}
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
	
	function goToAnniversary() {
		let headerH = 72;

		$('html, body').animate({
			scrollTop: $('.s7').offset().top - headerH - 20
		}, 500);
	}

  function eventListener() {
		// 讓手機版一進來就看的到 s1, s2
		$('.s1.ani, .s2 .ani').addClass('active');
		animate($('.s1.ani, .s2 .ani'));

    $(window).scroll(function () {
			let $window = $(window);
			let windowHeight = $window.height();
			let scrollTop = $window.scrollTop();
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
