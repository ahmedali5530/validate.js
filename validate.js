// JavaScript Document
/**
* Plugin for easy form validations with jquery
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
			
			if(typeof f.data('field') === 'undefined'){
					var field = f.attr('name');
			}else{
					var field = f.data('field');
			}
			
			if(typeof f.data('placement') === 'undefined'){
				var message_placement = 'right';
			}else{
				var message_placement = f.data('placement');
			}
			
			var css = {};
			
			switch(message_placement){
				case('top'):
				css = {bottom:'100%',left : '','text-align':'left',position:'absolute','z-index':'100',background:'#ffffff',border:'1px solid',padding:'5px',cursor:'pointer',width : '96%'};
				break;
				
				case('bottom'):
				css = {top : '100%',left : '','text-align':'left',position:'absolute','z-index':'100',background:'#ffffff',border:'1px solid',padding:'5px',cursor:'pointer',width : '96%',};
				break;
				
				case('left'):
				css = {right : '100%',top : '0px','text-align':'left',position:'absolute','z-index':'100',background:'#ffffff',border:'1px solid',padding:'5px',cursor:'pointer'};
				break;
				
				case('right'):
				css = {left : '100%',top : '0px','text-align':'left',position:'absolute','z-index':'100',background:'#ffffff',border:'1px solid',padding:'5px',cursor:'pointer'};
				break;
				
				case('over'):
				css = {top : '0px',left : '','text-align':'left',position:'absolute','z-index':'100',background:'#ffffff',border:'1px solid',padding:'5px',cursor:'pointer',width : '96%', height : '100%',};
				break;
			}
			
			//validation for required fields
			if(f.hasClass('required')){
				//check if this is a check box or not
				if(f.attr('type') == 'checkbox'){
					//check if it is checked or not
					if(f.prop('checked')){
						f.parent().children('.error-message').remove();
						f.parent().removeClass('text-danger').addClass('text-success');
					}else{
						f.parent().children('.error-message').remove();
						f.parent().css({'position':'relative'}).addClass('text-danger');
						
						
						
						f.after('<div class="error-message text-capital text-danger small">'+field+' is required.</div>');
						
						f.next('.error-message').css(css).attr('title','Click to Dismiss');
						
						errors[k] = v.name;
						
						return false;
					}
				}
				if(f.val() == ''){
					//uses bootstrap's classes for errors
					f.parent().children('.error-message').remove();
					f.parent().css({'position':'relative'}).addClass('has-error');
					
					f.after('<div class="error-message text-capital text-danger small">'+field+' is required.</div>');
					
					f.next('.error-message').css(css).attr('title','Click to Dismiss');
					
					errors[k] = v.name;
					
				}else{
					f.parent().children('.error-message').remove();
					f.parent().removeClass('has-error').removeClass('error').addClass('has-success');
					//return true;
				}
			}
			
			//validation for email address
			if(f.hasClass('email')){
				if(f.hasClass('required')){
					if(f.val() == ''){
						
					}else{
						var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
						// alert( pattern.test(emailAddress) );
						if(pattern.test(f.val()) == true){
								f.parent().children('.error-message').remove();
								f.parent().removeClass('has-error').removeClass('error').addClass('has-success');
								//return true;
						}else{
								//uses bootstrap's classes for errors
								f.parent().children('.error-message').remove();
								f.parent().css({'position':'relative'}).addClass('has-error');

								f.after('<div class="error-message text-capital text-danger small">'+field+' must have a Valid Email Address.</div>');
								
								f.next('.error-message').css(css).attr('title','Click to Dismiss');
								
								errors[k] = v.name;
						}
					}
				}else{
					//return true;
				}
				
			}
            
			//validation for numbers
            if(f.hasClass('number')){
				if(f.hasClass('required')){
					if(f.val() == ''){
						
					}else{
						if($.isNumeric(f.val()) == true){
								f.parent().children('.error-message').remove();
								f.parent().removeClass('has-error').removeClass('error').addClass('has-success');
								//return true;
						}else{
								//uses bootstrap's classes for errors
								f.parent().children('.error-message').remove();
								f.parent().css({'position':'relative'}).addClass('has-error');

								f.after('<div class="error-message text-capital text-danger small">'+field+' must be a valid Numeric Value.</div>');

								f.next('.error-message').css(css).attr('title','Click to Dismiss');
								
								errors[k] = v.name;
						}
					}
				}else{  
					//return true;
                                        
				}
			}
			
			//validation for alpha values
			if(f.hasClass('alpha')){
				if(f.hasClass('required')){
					if(f.val() == ''){
						
					}else{
						var pattern = new RegExp(/^[a-zA-Z]$/i);
						//alert( pattern.test(f.val()) );
						if(pattern.test(f.val()) == true){
							f.parent().children('.error-message').remove();
							f.parent().removeClass('has-error').removeClass('error').addClass('has-success');
							//return true;
						}else{
							//uses bootstrap's classes for errors
							f.parent().children('.error-message').remove();
							f.parent().css({'position':'relative'}).addClass('has-error');

							f.after('<div class="error-message text-capital text-danger small">'+field+' must have Valid Alpha values.</div>');

							f.next('.error-message').css(css).attr('title','Click to Dismiss');
							
							errors[k] = v.name;
						}
					}
				}
			}
		});
		
		
		
		//close the message and focus the field
		$(document).on('click','.error-message',function(){
			var message = $(this);
			if(message.prev('.form-control').val() == ''){
				message.prev('.form-control').focus();
				message.hide();
			}else{
				message.hide();
			}
		});
		
        $('.error-message').hover(function(){
			var message = $(this);
            $('.error-message').css('z-index',999);
			message.css('z-index',1000);
		},function(){
            $('.error-message').css('z-index',999);
        });
		
		if(errors.length > 0){
			errors.every(function(a){
				$($(form)[0]['elements'][a]).focus();
				//$('.error-message').delay(10000).fadeOut(300);
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
