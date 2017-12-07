$(function () {

	var $carouselList = $('#carousel ul');
	var $next = $('.next');
	var $prev = $('.prev');

	$next.click(changeSlidesNext);

	$prev.click(changeSlidesPrev);
	
	function changeSlidesPrev() {
		$carouselList.animate({
			marginLeft: '0'
		}, "slow", function () {
			var $firstSlide = $carouselList.find('li:first');
			var $lastSlide = $carouselList.find('li:last');

			$firstSlide.before($lastSlide);
			$carouselList.css({
				marginLeft: -400
			});
		});
	}

	//setInterval(changeSlidesNext, 30000);

	function changeSlidesNext() {
		$carouselList.animate({
			marginLeft: '-=400'
		}, "slow", function () {
			var $firstSlide = $carouselList.find('li:first');
			var $lastSlide = $carouselList.find('li:last');

			$lastSlide.after($firstSlide);
			$carouselList.css({
				marginLeft: 0
			});
		});

	}

});
