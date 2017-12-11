$(function () {

	var $carouselList = $('#carousel ul');
	var $indicatorsList = $('.indicator');
	var $next = $('.next');
	var $prev = $('.prev');
	var slideDirection = {
		next: 'left',
		prev: 'right'
	};
	var $quantityElementsList = $('.pic', $carouselList).length;
	var indexElement = 0;
	var intervalSlide = 3000;

	//FUNCTIONS

	function changeSlide(direction) {
		if (!$carouselList.is(':animated')) {
			if (direction === slideDirection.next) {
				counterForward();
				moveNext('slow');
			} else {
				counterBackward();
				movePrev('slow');
			}
		}
	}

	function moveNext(timeMoveSlide) {
		//counterForward();
		$carouselList.animate({
			marginLeft: '-=400'
		}, timeMoveSlide, function () {
			var $firstElement = $carouselList.find('li:first');
			var $lastElement = $carouselList.find('li:last');
			$lastElement.after($firstElement);
			$carouselList.css({
				marginLeft: 0
			});
		});
		console.log('change photo forward')
	}

	function movePrev(timeMoveSlide) {
		var $firstElement = $carouselList.find('li:first');
		var $lastElement = $carouselList.find('li:last');
		//counterBackward();
		$firstElement.before($lastElement);
		$carouselList.css('marginLeft', '-=400').animate({
			marginLeft: 0
		}, timeMoveSlide);
		console.log('change photo backword')
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
		console.log('change photo indicators')
	}

	function repeat() {
		setInterval(function () {
			changeSlide(slideDirection.prev);
		}, intervalSlide);
	}

	function stopRepeat() {
		clearInterval(repeat);
	}

	//EVENTS

	$next.click(function () {
		stopRepeat();
		changeSlide('left');
	});

	$prev.click(function () {
		stopRepeat();
		changeSlide('right');
	});


	//change indicators
	$indicatorsList.click(function () {
		var $this = $(this);

		stopRepeat();

		$('li.active').removeClass('active');
		$this.addClass('active');

		var indexIndicator = $('.indicator').index($this);
		var quantityMove = indexIndicator - indexElement;

		if (quantityMove > 0) {
			for (var i = 0; i < quantityMove; i++) {
				moveNext(75);
			}
		} else {
			for (var j = quantityMove; j < 0; j++) {
				movePrev(75);
			}
		}
	});

	//EXECUTE

	//repeat();

});
