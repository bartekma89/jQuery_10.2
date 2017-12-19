(function ($) {

	$.fn.carousel = function () {

		return this.each(function () {

			var $carouselList = $('ul', '#carousel');
			var interval;
			var intervalSlideTime = 2000;
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

				$carouselList.animate({'marginLeft': '-=500'}, 'slow', function () {
					$lastElement.after($firstElement);
					$carouselList.css({'marginLeft': 0});
				});
			}

			function moveBackwardSlide() {
				var $firstElement = $carouselList.find('li:first');
				var $lastElement = $carouselList.find('li:last');
				
				$firstElement.before($lastElement);
				$carouselList.css({'marginLeft': '-=500'}).animate({'marginLeft': '0'});
			}
			
			function counterForward() {
				if(indexElement < $quantityElementList - 1){
					indexElement++;
				}
				else
					indexElement = 0;
			}
			
			function counterBackward() {
				if(indexElement === 0) {
					indexElement = $quantityElementList - 1;
				} else {
					indexElement--;
				}
			}
			
			function setIndicator() {
				$('li.active').removeClass('active');
				$('li', '.carousel-indicators').eq(indexElement).addClass('active');
			}

			$('.arrow-next').click(function () {
				changeSlide('left');
			});
			$('.arrow-prev').click(function () {
				changeSlide('right');
			});
			
			function startRepeat() {
				interval = setInterval(function(){
					changeSlide('right');
				}, intervalSlideTime);
			}
			
			function stopRepeat() {
				clearInterval(interval);
			}
			
			startRepeat();
			
		});
	}

}(jQuery));

$(document).ready(function () {

	$('#carousel').carousel();

});
