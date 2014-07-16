(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('AdminCtrl',['$scope', '$http', '$q','eventick', 'dymoprinter', function($scope, $http, $q, eventick, dymoprinter) {
    $scope.$emit('bodyClass', 'admin');

    $scope.checked = function(item) {
      return item.checked_at !== null;
    };

    $scope.checkAttendee= function(a) {
      if(a.checked_at){
        a.checked_at = null;
      }else{
        a.checked_at = new Date().toLocaleString();
        dymoprinter.print(a.name);
      }

    };

  }]);
}());
