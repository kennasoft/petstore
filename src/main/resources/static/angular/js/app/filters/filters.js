
!function () {
    
    'use strict';

    var filters = angular.module('PetStore.filters', []);

    filters.filter('unique', function() {
        return function(collection, primaryKey) { //optional secondary key
            if(!collection) return [];
            var output = [], 
            keys = [];
            var splitKeys = primaryKey.split('.');
      

          angular.forEach(collection, function(item) {
                var key = {};
                angular.copy(item, key);
                for(var i=0; i<splitKeys.length; i++){
                    key = key[splitKeys[i]];
                }

                if(keys.indexOf(key) === -1) {
                  keys.push(key);
                  output.push(item);
                }
          });

          return output;
        };
    });

}();