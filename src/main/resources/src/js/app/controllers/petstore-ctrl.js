!function() {

    var app = angular.module('PetStore.controllers');

    app.controller('PetStoreController', 
        ['$rootScope', 'PetService', '$location',
        function($rootScope, PetService, $location){
            
            var vm = this;
            vm.currentPet = {};
            vm.petId = null;
            vm.newPet = { photoUrls: [''] };
            vm.tagName = '';
            vm.petSaved = false;
            
            vm.getPet = getPet;
            vm.addPhotoInput = addPhotoInput;
            vm.removePhotoInput = removePhotoInput;
            vm.addTag = addTag;
            vm.removeTag = removeTag;
            vm.savePet = savePet;
            
            
            $rootScope.pageTitle = 'Welcome to Super Duper Pet Store!';
            
            vm.menus = [
                {label: 'Home', link: '#home', active: true},
                {label: 'Find a Pet', link: '#find-pet', active: true},
                {label: 'About Us', link: '#about', active: true},
                {label: 'Drop a Pet', link: '#drop-pet', active: true},
                {label: 'Mission', link: '#mission', active: true}
            ];
            
            function getPet(){
                
                PetService.get({id: vm.petId}, function(pet){
                    vm.currentPet = pet;
                    console.log(pet);
                }, function(error){
                    vm.currentPet = null;
                    console.log(error);
                });
            }
            
            function isValid(pet){
                var valid = true;
                valid = (pet.name && pet.status && pet.photoUrls[0]);
                return valid;
            }
            
            function savePet(){
                vm.petSaved = false;
                vm.formError = !isValid(vm.newPet);
                if(vm.formError) return;
                
                PetService.save(vm.newPet, function(resp){
                    if(resp.id){
                        console.log("Pet saved successfully!");
                        vm.petSaved = true;
                        vm.newPet = {photoUrls: ['']};
                        
                    }else {
                        console.log("Error; could not save pet!");
                        vm.saveError = true;
                    }
                },
                function(err){
                    vm.saveError = true;
                });
                
            }
            
            function addPhotoInput(){
                vm.newPet.photoUrls.push("");
            }
            
            function removePhotoInput(indx){
                vm.newPet.photoUrls.splice(indx,1);
            }
            
            function addTag(){
                if(vm.tagName==='') return;
                var tag = {name: vm.tagName};
                vm.newPet.tags = vm.newPet.tags || [];
                vm.newPet.tags.push(tag);
                vm.tagName = '';
            }
            
            function removeTag(indx){
                vm.newPet.tags.splice(indx,1);
            }
            
            
        }]);

}();