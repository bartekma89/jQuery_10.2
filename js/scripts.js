$(function ($) {

	$.fn.carousel = function () {

		return this.each(function () {

			var $this = $(this);
			var $prev = $this.find('.arrow-prev');
			var $next = $this.find('.arrow-next');
			var $carouselList = $('.carousel ul');
			var changeSlide = {
				left: 'left',
				right: 'right'
			};
			var interval = setInterval(changeSlide, 3000);

			function changeSlide() {
				$carouselList.animate({
					'marginLeft': -500
				}, 'slow', moveSlide);
			};


			function moveSlide(direction) {
				var firstSlide = $carouselList.find('li:first');
				var lastSlide = $carouselList.find('li:last');

				if (direction === changeSlide.left) {
					lastSlide.after(firstSlide);
				} else {
					firstSlide.before(lastSlide);
				}

				$carouselList.css({
					'marginLeft': 0
				});

			}

			$prev.on('click', function () {
				moveSlide(changeSlide.right);
				clearInterval(interval);
			});

			$next.on('click', function () {
				moveSlide(changeSlide.left);
				clearInterval(interval);
			})
			
		});
		return this;
	}

}(jQuery));


$(function () {

	$('#carousel').carousel();

});
