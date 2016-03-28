# validate.js
A helper jquery plugin for basic form validation.

## validtors
```
required, number, email, url, min, max, match, equal, lessthan, greaterthan, unique, ip, file, decimal, alpha, alphanumeric
```

## Use
use validator names as classes in your form fields.

## Settings
use html5 custom data attributes for settings extra settings:
### settings for minimum
`data-min="2", data-min-message="custom error message in case of error"`

### maximum
`data-max="5", data-max-message="custom error message in case of error"`

### matching one field to other field
`data-field="id of matching field", data-field-message="custom error message in case of error"`

### equal validator
`data-equal="5", data-equal-message="custom error message in case of error"`

### lessthan 
`data-less-than="50", data-less-than-message="custom error message in case of error"`

### greaterthan
`data-greater-than="5", data-greater-than-message="custom error message in case of error"`
