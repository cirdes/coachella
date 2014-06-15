(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('AdminCtrl',['$scope', '$http', '$q','eventick', function($scope, $http, $q, eventick) {
    $scope.$emit('bodyClass', 'admin');
    $scope.token = '';
    $scope.attendees_list = [];

    $scope.loadEvent = function() {
      var defer = $q.defer();
      defer.promise.then(function(attendees){
        $scope.attendees_list = attendees;
      });
      eventick.getAttendees(defer);
    };

  }]);
}());
