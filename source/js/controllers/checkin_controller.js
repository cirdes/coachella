(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('CheckinCtrl',['$scope', '$q','$timeout', 'eventick', function($scope, $q, $timeout, eventick) {
    $scope.$emit('bodyClass', 'user-standby');
    $scope.lightbox = false;
    $scope.scanning = false;

    $scope.qrCheckin = function(data) {
      if(!$scope.scanning){
        $scope.scanning = true;
        var code = data.split(':');
        var i, a;
        for(i = 0; i < $scope.attendees.length; i++) {
          a = $scope.attendees[i];
          if(a.code === code[1]){
            if(a.checked_at){
              $scope.scanning = false;
              alert('Usuário já credenciado!');
              return false;
            }else{
              $scope.attendees[i].checked_at = new Date().toLocaleString();
              $scope.showLightbox($scope.attendees[i]);
              $scope.email = '';
              return true;
            }
          }
        }
      }
    };

    $scope.onError = function(data) {
      console.log('Fu...');
    };

    $scope.showLightbox = function(attendee) {
      $timeout(function(){
        $scope.lightbox = false;
        $scope.scanning = false;
      }, 4000);

      $scope.attendee_name = attendee.name;
      $scope.attendee_email = attendee.email;
      $scope.lightbox = true;
    };

    $scope.mailCheckin = function(){
      var i, a;
      for(i = 0; i < $scope.attendees.length; i++) {
        a = $scope.attendees[i];
        if(a.email === $scope.email){
          if(a.checked_at){
            alert('Usuário já credenciado!');
            return false;
          }else{
            $scope.attendees[i].checked_at = new Date().toLocaleString();
            $scope.showLightbox(a);
            $scope.email = '';
            return true;
          }
        }
      }
      alert('Email não cadastrado!');
    };
  }]);

}());
