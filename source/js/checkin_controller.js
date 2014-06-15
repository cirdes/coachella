(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('CheckinCtrl',['$scope', function($scope) {
    $scope.standby = true;

    $scope.onSuccess = function(data) {
      console.log('onSuccess');
      console.log(data);
    };
  }]);

}());
