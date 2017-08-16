!function () {

    'use strict';

    var directives = angular.module('PetStore.directives');

    directives.directive("confirmClick", [
        function ( ) {
            return {
                priority: -1,
                restrict: 'A',
                scope: {confirmFunction: "&confirmClick"},
                link: function (scope, element, attrs) {
                    element.bind('click', function (e) {
                        // message defaults to "Are you sure?"
                        var message = attrs.confirmClickMessage ? attrs.confirmClickMessage : "Are you sure?";
                        // confirm() requires jQuery
                        if (confirm(message)) {
                            scope.confirmFunction();
                        }
                    });
                }
            };
        }
    ]);
}();