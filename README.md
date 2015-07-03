# ionic-modals
## What is it?
Ionic Modals is a service that allows you to pass a controller and variable to a function, which is not a native function of Ionic.

## Why do I need it?
If you have ever wanted to trigger a modal that has its own controller, but you also need to pass some data to it, you want this modal service. Imagine using a modal to edit someone user information. Adding all that edit code to the parent controller is messy, but you have to pass the user info to render. Use `$modalService` to solve your problem!

## How do I use it?
* Add `tjsail33.ionicModals` to your module definition line:
````coffeescript
angular.module 'starter', ['ionic','tjsail33.ionicModals']
````
* Include `$modalService` in your controller or directive, and then wrap the following code in a function:
````coffeescript
$modalService.show('templates/path/to/modal.html', 'ControllerName', {custom,parameters}, {ionic,modal,options})
````
* Then, define your controller like so:
````coffeescript
app.controller "ControllerName", ['parameters', (parameters) ->
	# your code here	
]
````
* Access the custom parameters from the `$modalService.show()` method by using the parameters object passed to the controller.

## API

### `.show(path,controllerName,parameters,options,parentScope=null)`
Returns a promise that resolves when the modal closes, same as the standard Ionic Modal service.

The `parentScope` argument is optional. If one is not passed, $rootScope will be used as the parent.