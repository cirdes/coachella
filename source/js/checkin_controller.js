(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('CheckinCtrl',['$scope', function($scope) {

    $scope.attendees = [
      {'name': 'Cirdes Henrique',
       'email': 'cirdes@eventick.com.br'},
      {'name': 'André Braga',
       'email': 'andre@eventick.com.br'},
      {'name': 'Emiliano',
       'email': 'emiliano@eventick.com.br'}
    ];
  }]);
}());
