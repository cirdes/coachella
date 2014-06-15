(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('AdminCtrl',['$scope', '$http','eventick', function($scope, $http, eventick) {
    $scope.token = '';
    $scope.attendees_list = [];

    $scope.loadEvent = function() {
      eventick.getAttendees().success(function(data) {
        $scope.attendees_list = data.attendees;
      });
      // console.log($scope.ddata);
    };

  }]);
}());
