// JavaScript Document
/**
* Plugin for easy form validations with js
* Author @ahmedali5530
***/
(function ( $ ) {
    $.fn.validate = function(cb ) {
		
		//var form = document.forms[this.selector];
		
		var form = $(this).context;
		
		var errors = new Array();
		
		//console.log($(form)[0]['elements']);
		
		
		
		$(form.elements).each(function(k,v){
			var f = $(v);
			if(f.hasClass('required')){
				if(f.val() == ''){
					//uses bootstrap's classes for errors
					f.parent().children('#error-message').remove();
					f.parent().css({'position':'relative'}).addClass('has-error');
					
					f.after('<div class="error-message text-capital text-danger small" id="error-message" style="text-align:left;position:absolute;left:100%;top:0px;z-index:100;background:#ffffff;border:1px solid;padding:5px;cursor:pointer;">'+f.data('field')+' is required.</div>');
					
					errors[k] = v.name;
					
				}else{
					f.parent().children('#error-message').remove();
					f.parent().removeClass('has-error').removeClass('error').addClass('has-success');
					return true;
				}
			}
		});
		
		$(document).on('click','#error-message',function(){
			if($(this).prev('.form-control').val() == ''){
				$(this).prev('.form-control').focus();
				$(this).fadeOut(300);
			}else{
				$(this).fadeOut(300);
			}
		});
		
		if(errors.length > 0){
			errors.every(function(a){
				$($(form)[0]['elements'][a]).focus();
				$('.error-message').delay(5000).fadeOut(300);
			});
			return false;	
		}else{
			return true;
		}
	};
}( jQuery ));

/****************plugin Ends***************/

/**
* Working Method
*
***/
/*
//#b_form is the form id
$(document).on('submit','#b_form',function(e){
		e.preventDefault();
		//b_form is the form name
		if($('b_form').validate()){
			//your success function will be called here
			//yourSuccessCallBack();
		}
	});
*/
