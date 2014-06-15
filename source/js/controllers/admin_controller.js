(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('AdminCtrl',['$scope', '$http', '$q','eventick', function($scope, $http, $q, eventick) {
    $scope.$emit('bodyClass', 'admin');
  }]);
}());
