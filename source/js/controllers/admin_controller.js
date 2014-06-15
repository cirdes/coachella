(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('AdminCtrl',['$scope', '$http','eventick', function($scope, $http, eventick) {
    $scope.$emit('bodyClass', 'admin');
    $scope.token = '';
    $scope.attendees_list = [];

    $scope.loadEvent = function() {
      eventick.getAttendees().success(function(data) {
        $scope.attendees_list = data.attendees;
      });
    };

  }]);
}());
