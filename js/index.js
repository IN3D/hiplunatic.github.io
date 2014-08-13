$( document ).ready(function() {

	//saving the selectAll
	var allSelected = $('.selectAll');

	//saving the lower form
	var lowerForm = $('.lower-form');

	//results
	var resultsSide = $('.results > p');

	//saving each label
	// var eachLabel = $('.checkbox').each(function(index){
	// 	$(this).on('click', function(){
	// 		$(this).toggleClass('selected');
	// 		resultsSide.append('<p class="'+$(this).text()+'">'+$(this).text()+'</p>');

	// 	});
	// });

	//function for looping through checkboxes
	var countChecked = function(){
		var n = $('input[name="fields"]:checked').length;
		var m = $('input[name="fields"]:checked').value;
		console.log(m);
		if(n === 6){
			$('.selectAllCheckBox').prop('checked', true);
		} else{
			$('.selectAllCheckBox').prop('checked', false);
		}
		resultsSide.append(m);
		$('.selectAllCheckBox').on('click', function(){
			$('input[name="fields"]').prop('checked', true);
		});
	}

	$('input[type=checkbox]').on('click', countChecked);

});