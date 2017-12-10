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

	//FUNCTIONS
	
	//change slide
	function changeSlide(direction) {
		if (!$carouselList.is(':animated')) {
			if (direction === slideDirection.next) {
				moveNext('slow');
			} else {
				movePrev('slow');
			}
		}
	}
	//move slide to next
	function moveNext(slideTime) {
		counterForward();
		var $li = $carouselList.find('li');
		$carouselList.animate({
			marginLeft: -400
		}, slideTime, function () {
			$li.last().after($li.first());
			$carouselList.css({
				marginLeft: 0
			})

		})
	}
	//move slide to prev
	function movePrev(slideTime) {
		counterBackward();
		var $li = $carouselList.find('li');
		$carouselList.css('marginLeft', -400);
		$li.first().before($li.last());
		$carouselList.animate({
			marginLeft: 0
		}, slideTime);
	}

	function stopRepeat() {
		clearInterval(repeat);
	}

	//automatically move slide next or prev
	function repeat() {
		stopRepeat();
		setInterval(function () {
			changeSlide(slideDirection.prev)
		}, intervalSlide);
	}

	//counter to forward
	function counterForward() {
		if (indexElement < $quantityElementsList - 1) {
			indexElement++;
		} else {
			indexElement = 0;
		}
		setIndicator()

	}
	//counter to backward
	function counterBackward() {
		if (indexElement === 0) {
			indexElement = $quantityElementsList - 1;
		} else {
			indexElement--;
		}
		setIndicator()
	}
	
	//set indicator
	function setIndicator() {
		$('li.active').removeClass('active');
		$('li', '.carousel-indicators').eq(indexElement).addClass('active');
	}
	
	//EVENTS
	
	//move slide to next manual
	$next.click(function () {
		stopRepeat();
		changeSlide(slideDirection.next)
	});
	$prev.click(function () {
		stopRepeat();
		changeSlide(slideDirection.prev)
	});

	//change indicators manual
	$('.indicator').click(function () {
		stopRepeat();

		$('li.active').removeClass('active');
		$(this).addClass('active');

		var indexIndicator = $('.indicator').index($(this));
		var quantityLoop = indexIndicator - indexElement;

		if (quantityLoop > 0) {
			for (var i = 0; i < quantityLoop; i++) {
				moveNext('slow');
			}
		} else {
			for (var j = quantityLoop; j < 0; j++) {
				movePrev('slow');
			}
		}
	});

	//repeat();

});
