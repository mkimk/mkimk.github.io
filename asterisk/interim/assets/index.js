setupFavicon();

$(function(){
	console.log('script');
	

	$('#mce-EMAIL').on('input propertychange paste', function() {
		$('#mce-error-response').hide();
	});


	var $form = $('#signup-form');
    if ( $form.length > 0 ) {
        $form.bind('click', function ( event ) {
            if ( event ){
            	event.preventDefault();
            	register($form);
        	}
        });
    }


	function register($form) {
	    $.ajax({
	        type: $form.attr('method'),
	        url: $form.attr('action'),
	        data: $form.serialize(),
	        cache       : false,
	        dataType    : 'jsonp',
	        contentType: 'application/json; charset=utf-8',
	        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
	        success     : function(data) {
	            if (data.result != "success") {
	            	$('#mce-error-response').text(data.msg.slice(3)).show();
	            	console.log(data.msg);
	                // Something went wrong, do something to notify the user. maybe alert(data.msg);
	            } else {
	            	console.log(data.msg)
	            	$('form').hide();
	            	$('#pre-thankyou').hide();
	            	$("#post-thankyou").show();
	            }
	        }
		});
	}

});

function setupFavicon(){
 	let random_number = randomIntFromInterval(0, 13);
  	let png_url = 'assets/favicon/asterisk_marks_'+ random_number + '.png';
	$("link[rel='icon']").attr('href',png_url);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
