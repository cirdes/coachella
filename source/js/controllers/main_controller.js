(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('MainCtrl',['$scope', '$q','eventick', function($scope, $q, eventick) {

    $scope.$on('bodyClass', function(e, bodyClass) {
      $scope.bodyClass = bodyClass;
    });

    $scope.loadEvent = function() {
      var defer = $q.defer();
      defer.promise.then(function(attendees){
        $scope.attendees = attendees;
      });
      eventick.getAttendees(defer);
    };

    $scope.loadEvent();


  }]);

}());
