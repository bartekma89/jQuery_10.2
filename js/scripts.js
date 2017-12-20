(function ($) {

	$.fn.carousel = function (options) {

		var options = $.extend({
			animateTime: 3000,
			duration: 'slow',
			easing: 'swing',
			auto: false,
			direction: 'left'
		}, options);

		return this.each(function () {
			$this = $(this);

			var $carouselList = $this.find('ul');
			var $next = $this.find('.arrow-next');
			var $prev = $this.find('.arrow-prev');
			var interval = null;
			var intervalSlideTime = options.animateTime;
			var $quantityElementList = $carouselList.find('li').length;
			var indexElement = 0;

			function changeSlide(direction) {
				stopRepeat();
				if (!$carouselList.is(':animated')) {
					if (direction === 'left') {
						counterForward();
						moveForwardSlide();
						setIndicator();
					} else {
						counterBackward();
						moveBackwardSlide();
						setIndicator();
					}
				}
				startRepeat();
			}

			function moveForwardSlide() {
				var $firstElement = $carouselList.find('li:first');
				var $lastElement = $carouselList.find('li:last');

				$carouselList.animate({
					'marginLeft': '-=500'
				}, options.duration, options.easing, function () {
					$lastElement.after($firstElement);
					$carouselList.css({
						'marginLeft': 0
					});
				});
			}

			function moveBackwardSlide() {
				var $firstElement = $carouselList.find('li:first');
				var $lastElement = $carouselList.find('li:last');

				$firstElement.before($lastElement);
				$carouselList.css({
					'marginLeft': '-=500'
				}).animate({
					'marginLeft': '0'
				}, options.duration, options.easing);
			}

			function counterForward() {
				if (indexElement < $quantityElementList - 1) {
					indexElement++;
				} else
					indexElement = 0;
			}

			function counterBackward() {
				if (indexElement === 0) {
					indexElement = $quantityElementList - 1;
				} else {
					indexElement--;
				}
			}

			function setIndicator() {
				$this.find('li.active').removeClass('active');
				$this.find('.carousel-indicators li').eq(indexElement).addClass('active');
			}

			$next.click(function () {
				changeSlide('left');
			});
			$prev.click(function () {
				changeSlide('right');
			});

			function startRepeat() {
				if (options.auto) {
					interval = setInterval(function () {
						changeSlide(options.direction);
					}, intervalSlideTime);
				}
			}

			function stopRepeat() {
				clearInterval(interval);
			}

			startRepeat();

		});
	}

}(jQuery));

$(document).ready(function () {

	$('#wrapper1').carousel({
		auto: true,
		direction: 'left'
	});
	
	$('#wrapper2').carousel({
		auto: true,
		duration: 'fast',
		animateTime: 5000,
		direction: 'right'
	});

});
