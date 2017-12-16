$(function () {

	var $carouselList = $('#carousel ul');
	var $indicatorsList = $('.indicator');
	var $next = $('.arrow-next');
	var $prev = $('.arrow-prev');
	var slideDirection = {
		next: 'left',
		prev: 'right'
	};
	var $quantityElementsList = $('.pic', $carouselList).length;
	var interval;
	var indexElement = 0;
	var intervalSlideTime = 3000;
	

	//FUNCTIONS

	function changeSlide(direction) {
		stopRepeat();
		if (!$carouselList.is(':animated')) {
			if (direction === slideDirection.next) {
				counterForward();
				moveNextSlide('ease-out');
				setIndicator();
			} else {
				counterBackward();
				movePrevSlide('ease-out');
				setIndicator();
			}
		}
		startRepeat();
	}

	function moveNextSlide(timeMoveSlide) {
		$carouselList.animate({
			marginLeft: '-=500'
		}, timeMoveSlide, function () {
			var $firstElement = $carouselList.find('li:first');
			var $lastElement = $carouselList.find('li:last');
			$lastElement.after($firstElement);
			$carouselList.css({
				marginLeft: 0
			});
		});
	}

	function movePrevSlide(timeMoveSlide) {
		var $firstElement = $carouselList.find('li:first');
		var $lastElement = $carouselList.find('li:last');
		$firstElement.before($lastElement);
		$carouselList.css('marginLeft', '-=500').animate({
			marginLeft: 0
		}, timeMoveSlide);
	}

	function counterForward() {
		if (indexElement < $quantityElementsList - 1) {
			indexElement++;
		} else {
			indexElement = 0;
		}
	}

	function counterBackward() {
		if (indexElement === 0) {
			indexElement = $quantityElementsList - 1;
		} else {
			indexElement--;
		}
	}

	function setIndicator() {
		$('li.active').removeClass('active');
		$('li', '.carousel-indicators').eq(indexElement).addClass('active');
	}

	function startRepeat() {
		interval = setInterval(function () {
			changeSlide(slideDirection.next);
		}, intervalSlideTime);
	}

	function stopRepeat() {
		clearInterval(interval);
	}

	//EVENTS

	$next.click(function () {
		changeSlide('left');
	});

	$prev.click(function () {
		changeSlide('right');
	});


	//change indicators
	$indicatorsList.click(function () {
		var $this = $(this);
		var $getIndexIndicator = $('.indicator').index($this);

		$('li.active').removeClass('active');
		$this.addClass('active');

		moveSlideByIndicator($getIndexIndicator - indexElement);

		indexElement = $getIndexIndicator;
	});

	function moveSlideByIndicator(quantityMove) {
		stopRepeat();
		if (quantityMove > 0) {
			for (var i = 0; i < quantityMove; i++) {
				moveNextSlide(75);
			}
		} else {
			for (var j = quantityMove; j < 0; j++) {
				movePrevSlide(75);
			}
		}
		startRepeat();
	}

	//EXECUTE

	startRepeat();

});
