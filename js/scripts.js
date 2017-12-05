$('span:even()').css('color', '#e74c3c');

$('p').each(function (index, element) {

	var button = '<button class="btn" data-tmp=' + index + '>Click me!</button>';
	$(element).prepend(button);

});

$('button').on('click', function() {

	alert($(this).attr('data-tmp'));
	
});
