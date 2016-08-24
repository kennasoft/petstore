//

describe('PetService', function () {
    
    var mockPetService, $httpBackend;    
    
    beforeEach(angular.mock.module('PetStore.services'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockPetService = $injector.get('PetService');
        });
    });

    describe('PetService.get', function () {
        it('accepts an object as parameter, and fetches pet by Id', function (mockPetService) {
            $httpBackend
                .expectGET(window.AppGlobals.apiUrl + 'pet/1')
                .respond({
                    "id": 1,
                    "name": "FuzzyCat"
                });
                
            var response = mockPetService.get({id: 1});
            $httpBackend.flush();
            expect(response.name).toEqual('FuzzyCats');
            
        });
        
    });
    
    
});