(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('MainCtrl',['$scope', '$q', '$location', '$localStorage','eventick', function($scope, $q, $location, $localStorage, eventick) {

    $scope.$storage = $localStorage;

    if(!$scope.$storage.token || !$scope.$storage.eventId){
      $location.path('login');
    }

    $scope.$on('bodyClass', function(e, bodyClass) {
      $scope.bodyClass = bodyClass;
    });

    $scope.loadAttendee = function() {
      if(typeof $scope.$storage.attendees === 'undefined'){
        eventick.getAttendees($scope.$storage.token, $scope.$storage.eventId).then(function(value) {
          $scope.attendees = value.data.attendees;
          $scope.$storage.attendees = value.data.attendees;
        });
      }else{
        $scope.attendees = $scope.$storage.attendees;
      }
    };

    $scope.updateAttendeeStorage = function() {
      $scope.$storage.attendees = $scope.attendees;
    };

    $scope.logout = function() {
      $scope.$storage.$reset();
      $location.path('login');
    };

    $scope.syncEventick = function(a) {
      eventick.getAttendees().then(function(value) {
        $scope.attendees = value.data.attendees;
        $scope.$storage.attendees = value.data.attendees;
      });
    };

    $scope.loadAttendee();
  }]);

}());
