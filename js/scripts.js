$(function () {

	var $carouselList = $('#carousel ul');
	var $next = $('.next');
	var $prev = $('.prev');

	$next.click(changeSlidesNext);

	$prev.click(changeSlidesPrev);
	
	function changeSlidesPrev() {
		$carouselList.animate({
			marginLeft: '0'
		}, 500, function () {
			var $firstSlide = $carouselList.find('li:first');
			var $lastSlide = $carouselList.find('li:last');

			$firstSlide.before($lastSlide);
			$carouselList.css({
				marginLeft: -400
			});
		});
	}

	setInterval(changeSlidesPrev, 5000);

	function changeSlidesNext() {
		$carouselList.animate({
			marginLeft: '-=400'
		}, 500, function () {
			var $firstSlide = $carouselList.find('li:first');
			var $lastSlide = $carouselList.find('li:last');

			$lastSlide.after($firstSlide);
			$carouselList.css({
				marginLeft: 0
			});
		});

	}

});
