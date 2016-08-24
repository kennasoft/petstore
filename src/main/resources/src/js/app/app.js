'use strict';
!function() {

    angular.module('PetStore.controllers', ['PetStore.services']);
    angular.module('PetStore.directives',[]);

    var main = angular.module('PetStore',
        ['ngResource', 'PetStore.controllers', 'PetStore.services','PetStore.directives']);

    main.constant("Globals", AppGlobals);

    main.config(['$httpProvider', '$locationProvider',
        function($httpProvider, $locationProvider){
            $httpProvider.defaults.timeout = 30000;
            $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]);

    main.run(['$rootScope', '$window', '$timeout',
        function($rootScope, $window, $timeout) {
            
            // if ($cookies['__xcred'] === undefined) {
            //       // redirect back to login
            //       window.location.replace('/admin/login/')
            // }

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies['__xcred'];

            //$rootScope.preview_url = window.location.origin
        }
    ]);


}();