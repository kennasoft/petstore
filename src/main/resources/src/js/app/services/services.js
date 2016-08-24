

!function () {
    
    'use strict';

    var services = angular.module('PetStore.services', ['ngResource']);

    services.factory('PetService', ['$resource', function ($resource) {
        return $resource(AppGlobals.apiUrl + 'pet/:id', {}, 
        {
            get: {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + 'dXNlcjo2MDEwMWE1OS0xYTdiLTQ3NjktYWQ1ZS1iZWE3MzVhMTVlZmM='
                }, 
                cache: true, 
                isArray: false
            },
            query: {method: 'GET', cache: true, isArray: false},
            update: {method: 'PUT'},
            incrementHits: {method: 'PUT'}
        });
    }]);

}();
