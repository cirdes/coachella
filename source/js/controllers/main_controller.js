(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('MainCtrl',['$scope', '$q','eventick', function($scope, $q, eventick) {

    var defer = $q.defer();

    $scope.$on('bodyClass', function(e, bodyClass) {
      $scope.bodyClass = bodyClass;
    });

    defer.promise.then(function(attendees){
      $scope.attendees = attendees;
    });
    eventick.getAttendees(defer);

  }]);

}());
