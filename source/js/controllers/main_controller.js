(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('MainCtrl',['$scope', '$q','eventick', '$localStorage', function($scope, $q, eventick, $localStorage) {

    $scope.$storage = $localStorage;

    var defer = $q.defer();

    $scope.$on('bodyClass', function(e, bodyClass) {
      $scope.bodyClass = bodyClass;
    });

    defer.promise.then(function(attendees){
      $scope.attendees = attendees;
      $scope.$storage.attendees = attendees;
    });

    if(typeof $scope.$storage.attendees === 'undefined'){
      eventick.getAttendees(defer);
    }else{
      $scope.attendees = $scope.$storage.attendees;
    }


    $scope.updateAttendeeStorage = function() {
      $scope.$storage.attendees = $scope.attendees;
    };

    $scope.syncEventick = function(a) {
      defer = $q.defer();
      defer.promise.then(function(attendees){
        $scope.attendees = attendees;
        $scope.$storage.attendees = attendees;
      });

      eventick.getAttendees(defer);
    };

  }]);

}());
