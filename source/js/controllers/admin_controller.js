(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('AdminCtrl',['$scope', '$http', '$q','eventick', 'dymoprinter', function($scope, $http, $q, eventick, dymoprinter) {
    $scope.$emit('bodyClass', 'admin');
    var defer;

    $scope.checked = function(item) {
      return item.checked_at !== null;
    };

    $scope.checkAttendee = function(a) {
      defer = $q.defer();
      defer.promise.then(function(attendee){
        attendee.dirty = false;
        $scope.updateAttendeeStorage();
      });

      if(a.checked_at){
        a.checked_at = null;
        a.dirty = true;
        eventick.checkAttendee(defer, a);
        $scope.updateAttendeeStorage();
      }else{
        a.checked_at = new Date();
        a.dirty = true;
        eventick.checkAttendee(defer, a);
        dymoprinter.print(a.name);
        $scope.updateAttendeeStorage();
      }
    };

    $scope.syncAttendee = function(a) {
      defer = $q.defer();
      defer.promise.then(function(attendee){
        attendee.dirty = false;
        $scope.updateAttendeeStorage();
      });
      eventick.checkAttendee(defer, a);
    };

  }]);
}());
