//for live validation
$(document).on('keydown blur change', '.invalid, .valid', function(e){
    //e.preventDefault();
    //checking for validations
    var validate = new Validate($(this).closest('form'));
    validate.execute();
    validate.renderErrors();
//    validate.prepare();
});

function Validate(element, success, failure){
    this.element = element;
    this.success = success;
    this.failure = failure;
    this.errors = [];
}

Validate.prototype = {
    element : false, 
    success : false, 
    failure : false,
    errorPosition : 'bottom',
    validators : ['required', 'number', 'email','url', 'min', 'max', 'match', 'equal','lessthan','greaterthan','unique', 'ip', 'file', 'decimal', 'alpha', 'alphanumeric'],
    init : function(){


        //prepare the form for validation
        //execute validation process
        this.execute();
        
        //render error messages
        this.renderErrors();

        //1- disable submit button
//        this.prepare();
        
        //live validation
//         this.liveValidate();
        
        
        //focus first invalid field
        this.highlightFirstInvalidField();

        //success callback
        if(this.hasErrors() == false){
            //$(this.element).find('#submit').attr('disabled','disabled');
            if(typeof this.success === 'function'){
                this.success(this.element);
            }
        }
        
        //failure callback
        if(this.hasErrors() == true){
            if(typeof this.failure === 'function'){
            
                this.failure(this.element, this.errors);
            }
        }
    }, 
    validationRules : {
        required : function(field, vlt){
            
            //check if this is checkbox
            if(field.attr('type') === 'checkbox'){
                if(field.is(':checked')){
                    //is checked
                }else{
                    return vlt.buildMessage(field, 'required', ' must be checked');
                }
            }else if(field.attr('type') === 'radio'){
                //for radios
                if($('input[name='+field.attr('name')+']:checked', vlt.element).length <= 0){
                    return vlt.buildMessage(field, 'required', ' must have one value to check');
                }
            }else{
                if($.trim(field.val()) === ''){
                    return vlt.buildMessage(field, 'required', ' is required');
                }
            }
            
        }, 
        number : function(field, vlt){
            if($.isNumeric(field.val()) === false){
                return vlt.buildMessage(field, 'number',' must be a number');
            }
        }, 
        email : function(field, vlt){
            var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
            if(pattern.test(field.val()) === false){
                return vlt.buildMessage(field, 'email',' must be a valid email');
            }
        }, 
        url : function(field,vlt){
            var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|pk|in|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
            if(urlregex.test(field.val()) === false){
                return vlt.buildMessage(field, 'email',' must be a valid URL');
            }
        },
        min : function(field, vlt){
            var length = field.val();
            if(length.length < field.data('min')){
                return vlt.buildMessage(field, 'min', ' must be minimum to '+field.data('min'));
            }
        }, 
        max : function(field, vlt){
            var length = field.val();
            if(length.length > field.data('max')){
                return vlt.buildMessage(field, 'max', ' must be maximum to '+field.data('max'));
            }
        }, 
        match : function(field, vlt){
            if(field.val() !== $('#'+field.data('field'), vlt.element).val()){
                return vlt.buildMessage(field, 'match', ' must match with '+field.data('field'));
            }
        }, 
        equal : function(field, vlt){
            if(field.val() !== field.data('equal')){
                return vlt.buildMessage(field, 'equal', ' must be equal to '+field.data('equal'));
            }
        }, 
        lessthan : function(field, vlt){
            if(field.val() > field.data('less-than')){
                return vlt.buildMessage(field, 'less-than', ' must be less than '+field.data('less-than'));
            }
        }, 
        greaterthan : function(field, vlt){
            if(field.val() < field.data('greater-than')){
                return vlt.buildMessage(field, 'greater-than', ' must be greater than '+field.data('greater-than'));
            }
        },
        unique : function(field, vlt){
            //check if a value is unique, checking from database
            var message = field.attr('name')+ ' "' +field.val()+'" already exists';
            var status;
            $.ajax({
                url : field.data('url'),
                method : field.data('method') || 'get',
                dataType : 'json',
                data : {term: field.val()},
                //async : false,
                contentType : 'application/x-www-form-urlencoded',
				processData : true,
                success : function(r){
                    if(typeof callback === 'function'){
                        callback(r);
                    }
                },
                complete : function(r){
                    status = JSON.parse(r.responseText);
                }
            });

            if(status === false){
                return vlt.buildMessage(field, 'unique', ' "' +field.val()+'" already exists');
            }
            
            
        },
        ip : function(field, vlt){
            //check for valid ip address
        },
        file : function(field, vlt){
            //check the filetype of uploaded file
        }, 
        decimal : function(field, vlt){
            //check is the value decimal
        }, 
        alpha : function(field, vlt){
            //check if the value is aplha
        }, 
        alphanumeric : function(field, vlt){
            //check if the value is mix of alpha and numeric chars
        }
    },
    buildMessage : function(field, type, defaultMessage){
        if(typeof field.data(type+'-message') === 'undefined'){
            return field.attr('name')+defaultMessage;
        }else{
            return field.data(type+'-message');
        }
    },
    execute : function(){
        var vlt = this;
        
        $.each(this.element, function(k, v){
            $.each(v, function(i, field){
                //loop all available validators
                vlt.validators.forEach(function(validation){
                    if($(field).hasClass(validation)){
                        var validationProcess = vlt.validationRules[validation]($(field), vlt);
                        if(typeof validationProcess !== 'undefined'){
                            //vlt.errors[$(field).attr('name')] = [];
                            vlt.errors[$(field).attr('name')] = [validationProcess];
                        }
                    }
                });
            });
        });
        
        return this;
    },
    renderErrors : function(){
        var vlt = this;

        //clear all errors prior to add new errors
        this.clearErrors();

        $.each(this.element, function(k, v){
            $.each(v, function(i, field){
                //loop all errors
                vlt.validators.forEach(function(validation){
                    if($(field).hasClass(validation)){
                        if(vlt.errors.hasOwnProperty($(field).attr('name'))){
                            var errorObject = vlt.errors[$(field).attr('name')];
                            var errorPosition = typeof $(field).data('error-position') === 'undefined' ? vlt.errorPosition : $(field).data('error-position');
                            //delete any old message
                            $(field).closest('.form-group, .checkbox, .radio').find('.error-message').remove();
                            //add new message
                            $(field).closest('.form-group, .checkbox, .radio').append('<div class="error-message text-danger '+errorPosition+'">'+errorObject.toString()+'</div>');
                            $(field).closest('.form-group, .checkbox, .radio').removeClass('has-success').addClass('has-error');
                            $(field).addClass('invalid').removeClass('valid');
                        }
                    }
                });
            });
        });
        
        //message click handler
        $(document).on('click','.error-message', function(e){
            e.preventDefault();
            $(this).prev().focus();
        });
        
        return this;
    }, 
    hasErrors : function(){
        if(Object.keys(this.errors).length >= 1){
            return true;
        }

        return false;
    },
    clearErrors : function(){
        //remove error messages
        $(this.element).find('.error-message').remove();
        
        //remove stylings
        $(this.element).find('.invalid').closest('.has-error').removeClass('has-error');
    },
    prepare : function(){
       
        if(Object.keys(this.errors).length >= 1){
            $(this.element).find('#submit').attr('disabled','disabled');
        }else{
            $(this.element).find('#submit').removeAttr('disabled');
        }
    },
    liveValidate : function(){
        var vlt = this;
        if($(this.element).find('#submit').is(':disabled')){
            
        }
    }, 
    highlightFirstInvalidField : function(){
        //focus in first invalid field
        var invalidFields = $(this.element).find('.has-error').children('input, select, checkbox, radio');
        if(invalidFields.length > 0){
            invalidFields[0].focus();
        }
    }
};

//create plugin to interact with forms easily
$.fn.validate = function(success, failure){
    var validate = new Validate($(this), success, failure);
    return validate.init();
}
