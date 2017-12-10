/*$(function () {*/

var $carouselList = $('#carousel ul');
var $next = $('.next');
var $prev = $('.prev');
var slideDirection = {
	next: 'next',
	prev: 'prev'
};
var $quantityElementsList = $('.pic', $carouselList);
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

function moveNext() {
	$carouselList.animate({
		marginLeft: '-=400'
	}, 'slow', function () {
		var $firstElement = $carouselList.find('li:first');
		var $lastElement = $carouselList.find('li:last');
		$lastElement.after($firstElement);
		$carouselList.css({
			marginLeft: 0
		})
		counter();
	})
}

function counter() {
	indexElement++;

}

function movePrev() {
	var $firstElement = $carouselList.find('li:first');
	var $lastElement = $carouselList.find('li:last');
	$firstElement.before($lastElement);
	$carouselList.css('marginLeft', '-=400').animate({
		marginLeft: 0
	}, 'slow');
}

function repeat() {
	setInterval(function() {
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
	
	$carouselList.find('li').each(function (index) {
		var $this = $(this);
		var $li = $('<li>', {
			'data-index': index
		});
		
		if ($this.hasClass('pic')) {
			$documentFragment.append($li);
		}
	})
	
	$indicatorList.append($documentFragment);
	
})();

$('li').click(function(e){
	console.log(e);
});

$('ul').click(function(e){
	console.log(e);
});

/*});*/
