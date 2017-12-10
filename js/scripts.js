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
	var intervalSlide = 3000;

	function changeSlide(direction) {
		if (!$carouselList.is(':animated')) {
			if (direction === slideDirection.next) {
				moveNext();
			} else {
				movePrev();
			}
		}
	}

	function moveNext(timeMoveSlide) {
		counterForward();
		$carouselList.animate({
			marginLeft: '-=400'
		}, timeMoveSlide, function () {
			var $firstElement = $carouselList.find('li:first');
			var $lastElement = $carouselList.find('li:last');
			$lastElement.after($firstElement);
			$carouselList.css({
				marginLeft: 0
			})

		})
	}

	function movePrev(time) {
		counterBackward();
		var $firstElement = $carouselList.find('li:first');
		var $lastElement = $carouselList.find('li:last');
		$firstElement.before($lastElement);
		$carouselList.css('marginLeft', '-=400').animate({
			marginLeft: 0
		}, time);
	}

	function counterForward() {
		if (indexElement < $quantityElementsList - 1) {
			indexElement++;
		} else {
			indexElement = 0;
		}
		setIndicator();
	}

	function counterBackward() {
		if (indexElement === 0) {
			indexElement = $quantityElementsList - 1;
		} else {
			indexElement--;
		}
		setIndicator();
	}

	function setIndicator() {
		$('li.active').removeClass('active');
		$('li', '.carousel-indicators').eq(indexElement).addClass('active');
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

	$('.indicator').click(function () {
		stopRepeat();

		$('li.active').removeClass('active');
		$(this).addClass('active');

		var indexIndicator = $('.indicator').index($(this));
		var quantityMove = indexIndicator - indexElement;

		if (quantityMove > 0) {
			for (var i = 0; i < quantityMove; i++) {
				moveNext(100);
			}
		} else {
			for (var j = quantityMove; j < 0; j++) {
				movePrev(100);
			}
		}
	});

});
