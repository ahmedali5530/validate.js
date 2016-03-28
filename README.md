# validate.js
A helper jquery plugin for basic and advanced form validation.

## validtors
```
required, number, email, url, min, max, match, equal, lessthan, greaterthan, unique, ip, file, decimal, alpha, alphanumeric
```

## Use
use validator names as classes in your form fields.

## Settings
use html5 custom data attributes for settings extra settings:
#### minimum
`class="min" data-min="2" data-min-message="custom error message in case of error"`

#### maximum
`class="max" data-max="5" data-max-message="custom error message in case of error"`

#### matching one field to other field
`class="match" data-field="id of matching field" data-match-message="custom error message in case of error"`

#### equal validator
`class="equal" data-equal="5" data-equal-message="custom error message in case of error"`

#### lessthan 
`class="lessthan" data-less-than="50" data-less-than-message="custom error message in case of error"`

#### greaterthan
`class="greaterthan" data-greater-than="5" data-greater-than-message="custom error message in case of error"`


## Plugin initialization
```
$('some_form_selector').validate(function(form){
  //success callback
},function(form, errors){
  //failure callback
});
```
