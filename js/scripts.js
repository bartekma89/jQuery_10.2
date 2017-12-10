$(function () {

	var $carouselList = $('#carousel ul');
	var $next = $('.next');
	var $prev = $('.prev');
	var slideDirection = {
		next: 'next',
		prev: 'prev'
	};
	var $quantityElementsList = $('.pic', $carouselList).length;
	var indexElement = 0;
	var intervalSlide = 1000;

	function changeSlide(direction) {
		if (!$carouselList.is(':animated')) {
			if (direction === slideDirection.next) {
				moveNext();
			} else {
				movePrev();
			}
		}
	}

	function moveNext() {
		counterForward();
		$carouselList.animate({
			marginLeft: '-=400'
		}, 'slow', function () {
			var $firstElement = $carouselList.find('li:first');
			var $lastElement = $carouselList.find('li:last');
			$lastElement.after($firstElement);
			$carouselList.css({
				marginLeft: 0
			})

		})
	}

	function counterForward() {
		if (indexElement < $quantityElementsList - 1) {
			indexElement++;
		} else {
			indexElement = 0;
		}
		$('li.active').removeClass('active');
		$('li', '.carousel-indicators').eq(indexElement).addClass('active');

	}

	function counterBackward() {
		if (indexElement == 0) {
			indexElement = $quantityElementsList - 1;
		} else {
			indexElement--;
		}
		$('li.active').removeClass('active');
		$('li', '.carousel-indicators').eq(indexElement).addClass('active');
	}

	function movePrev() {
		counterBackward();
		var $firstElement = $carouselList.find('li:first');
		var $lastElement = $carouselList.find('li:last');
		$firstElement.before($lastElement);
		$carouselList.css('marginLeft', '-=400').animate({
			marginLeft: 0
		}, 'slow');
	}

	function repeat() {
		setInterval(function () {
			changeSlide(slideDirection.next)
		}, intervalSlide);
	}

	repeat();

	function stopRepeat() {
		clearInterval(repeat);
	}

	$next.click(function () {
		stopRepeat();
		changeSlide(slideDirection.next)
	});
	$prev.click(function () {
		stopRepeat();
		changeSlide(slideDirection.prev)
	});



	(function () {
		var $indicatorList = $('<ol></ol');
		$indicatorList.addClass('carousel-indicators');
		$carouselList.after($indicatorList);

		var $documentFragment = $(document.createDocumentFragment());

		$carouselList.find('li').each(function () {
			var $this = $(this);

			if ($this.hasClass('pic')) {
				$documentFragment.append('<li></li>');
			}
		})

		$indicatorList.append($documentFragment);
		$indicatorList.find('li:first').addClass('active');
	})();

});
