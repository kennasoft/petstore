describe('PetStoreController', function() {
  beforeEach(module('PetStore'));

  var $controller, mockPetService;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('PetStoreController.getPet', function() {
    it('sets ctrl.petId to 1 and gets pet from api', function() {
      var controller = $controller('PetStoreController', { PetService: mockPetService });
      
    });
  });
});