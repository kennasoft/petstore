

!function () {
    
    'use strict';

    var services = angular.module('PetStore.services', ['ngResource']);

    services.factory('PetService', ['$resource', function ($resource) {
        return $resource(AppGlobals.apiUrl + 'pet/:id', {}, 
        {
            get: {method: 'GET', cache: false, isArray: false},
            query: {method: 'GET', cache: true, isArray: false},
            update: {method: 'PUT'}
        });
    }]);

    services.factory('CategoryService', ['$resource', function($resource){
        return $resource(AppGlobals.apiUrl + 'categories', {}, 
        {
            query: { method: 'GET', cache: true, isArray: true}
        });
    }]);

}();
