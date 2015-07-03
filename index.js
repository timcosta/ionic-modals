(function() {
  angular.module('tjsail33.ionicModals', ['ionic']).factory('$modalService', [
    '$ionicModal', '$rootScope', '$q', '$injector', '$controller', function($ionicModal, $rootScope, $q, $injector, $controller) {
      var _cleanup, _evalController, show;
      show = function(templeteUrl, controller, parameters, options, parentScope) {
        var ctrlInstance, defaultOptions, deferred, modalScope, thisScopeId;
        deferred = $q.defer();
        ctrlInstance = void 0;
        if(parentScope) {
          modalScope = parentScope.$new();
        }else{
          modalScope = $rootScope.$new();
        }
        thisScopeId = modalScope.$id;
        defaultOptions = {
          animation: 'slide-in-up',
          focusFirstInput: false,
          backdropClickToClose: true,
          hardwareBackButtonClose: true,
          modalCallback: null
        };
        options = angular.extend({}, defaultOptions, options);
        $ionicModal.fromTemplateUrl(templeteUrl, {
          scope: modalScope,
          animation: options.animation,
          focusFirstInput: options.focusFirstInput,
          backdropClickToClose: options.backdropClickToClose,
          hardwareBackButtonClose: options.hardwareBackButtonClose
        }).then((function(modal) {
          var ctrlEval, locals;
          modalScope.modal = modal;
          modalScope.openModal = function() {
            modalScope.modal.show();
          };
          modalScope.closeModal = function(result) {
            deferred.resolve(result);
            modalScope.modal.hide();
          };
          modalScope.$on('modal.hidden', function(thisModal) {
            var modalScopeId;
            if (thisModal.currentScope) {
              modalScopeId = thisModal.currentScope.$id;
              if (thisScopeId === modalScopeId) {
                deferred.resolve(null);
                _cleanup(thisModal.currentScope);
              }
            }
          });
          locals = {
            '$scope': modalScope,
            'parameters': parameters
          };
          ctrlEval = _evalController(controller);
          ctrlInstance = $controller(controller, locals);
          if (ctrlEval.isControllerAs) {
            ctrlInstance.openModal = modalScope.openModal;
            ctrlInstance.closeModal = modalScope.closeModal;
          }
          modalScope.modal.show().then(function() {
            modalScope.$broadcast('modal.afterShow', modalScope.modal);
          });
          if (angular.isFunction(options.modalCallback)) {
            options.modalCallback(modal);
          }
        }), function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      };
      _cleanup = function(scope) {
        scope.$destroy();
        if (scope.modal) {
          scope.modal.remove();
        }
      };
      _evalController = function(ctrlName) {
        var fragments, result;
        result = {
          isControllerAs: false,
          controllerName: '',
          propName: ''
        };
        fragments = (ctrlName || '').trim().split(/\s+/);
        result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
        if (result.isControllerAs) {
          result.controllerName = fragments[0];
          result.propName = fragments[2];
        } else {
          result.controllerName = ctrlName;
        }
        return result;
      };
      return {
        show: show
      };
    }
  ]);
})();
