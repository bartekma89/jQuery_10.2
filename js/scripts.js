$(function () {

	var $carouselList = $('#carousel ul');
	var $next = $('.next');
	var $prev = $('.prev');

	$next.click(changeSlides);

	$prev.click(function () {
		$carouselList.animate({
			marginLeft: '+=400'
		}, 500, function () {
			var $firstSlide = $carouselList.find('li:first');
			var $lastSlide = $carouselList.find('li:last');

			$firstSlide.before($lastSlide);
			$carouselList.css({
				marginLeft: 0
			});
		});
	});

	setInterval(changeSlides, 10000);

	function changeSlides() {
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
