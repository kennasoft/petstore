
!function () {
    
    'use strict';

    var directives = angular.module('PetStore.directives');

    directives.directive('petGallery', [function () {
        return {
            restrict: 'EA',
            scope: {},
            controller: function(){
                var vm = this;
                
                vm.mainImage = 0;
                vm.setMainImage = setMainImage;
                vm.prevThumb = prevThumb;
                vm.nextThumb = nextThumb;
                vm.photoUrls = { photoUrls: vm.images};
                
                
                function setMainImage(index){
                    vm.mainImage = index;
                }

                function prevThumb(){
                    angular.element('.thumbnails')[0].scrollLeft -= 64;
                }

                function nextThumb(){
                    angular.element('.thumbnails')[0].scrollLeft += 64;
                }

            },
            bindToController: {
                images: '='
            },
            controllerAs: 'vm',
            template: [
                '<div class="row">',
                        '<div class="col-xs-12">',
                            '<div style="{{vm.images ? \'background-image: url(\'+vm.images[vm.mainImage]+\')\':\'\'}}" ',
                                 'ng-class="{\'main-pet-img\':true, \'grayscale\': !vm.images}"></div>',
                        '</div>',
                    '</div>',
                    '<div class="row">',
                        '<div class="col-xs-12">',
                            '<div ng-show="!vm.images">No Image</div>',
                            '<div ng-click="vm.prevThumb()" ',
                             'class="fa fa-arrow-circle-left thumb-nav scroll-left"',
                             'ng-show="vm.images.length>4"></div>',
                            '<div class="thumbnails col-xs-12">',
                                '<ul class="thumbnails-list" style="width: {{(vm.images.length+1)*64}}px">',
                                    '<li class="thumbnail" ng-repeat="img in vm.images">',
                                        '<div>',
                                            '<img ng-src="{{img}}" ng-click="vm.setMainImage($index)"/>',
                                        '</div>',
                                    '</li>',
                                '</ul>',
                            '</div>',
                            '<div ng-click="vm.nextThumb()" ',
                                 'class="fa fa-arrow-circle-right thumb-nav scroll-right"',
                                 'ng-show="vm.images.length>4"></div>',
                        '</div>',
                    '</div>'
            ].join('')
        };
    }]);

}();
