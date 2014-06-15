(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('MainCtrl',['$scope', function($scope) {

    $scope.$on('bodyClass', function(e, bodyClass) {
      $scope.bodyClass = bodyClass;
    });

  }]);

}());
