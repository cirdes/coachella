(function () {
   'use strict';

  SelfCheckin.Controllers.
    controller('CheckinCtrl',['$scope', '$q','$timeout', 'eventick', 'dymoprinter', function($scope, $q, $timeout, eventick, dymoprinter) {
    $scope.$emit('bodyClass', 'user-standby');
    $scope.lightboxSuccess = false;
    $scope.lightboxError = false;
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
              $scope.showLightboxError('Usuário já credenciado!');
              return false;
            }else{
              $scope.attendees[i].checked_at = new Date().toLocaleString();
              dymoprinter.print(a.name);
              $scope.showLightboxSuccess($scope.attendees[i]);
              $scope.email = '';
              return true;
            }
          }else{
            $scope.showLightboxError('QRCode inválido');
          }
        }
      }
    };

    $scope.showLightboxSuccess = function(attendee) {
      $timeout(function(){
        $scope.lightboxSuccess = false;
        $scope.scanning = false;
      }, 3000);

      $scope.attendee_name = attendee.name;
      $scope.attendee_email = attendee.email;
      $scope.lightboxSuccess = true;
    };

    $scope.showLightboxError = function(msg) {
      $timeout(function(){
        $scope.lightboxError = false;
        $scope.scanning = false;
      }, 3000);

      $scope.lightboxErrorMsg = msg;
      $scope.lightboxError = true;
    };

    $scope.mailCheckin = function(){
      var i, a;
      for(i = 0; i < $scope.attendees.length; i++) {
        a = $scope.attendees[i];
        if(a.email === $scope.email){
          if(a.checked_at){
            $scope.showLightboxError('Usuário já credenciado!');
            return false;
          }else{
            $scope.attendees[i].checked_at = new Date().toLocaleString();
            dymoprinter.print(a.name);
            $scope.showLightboxSuccess(a);
            $scope.email = '';
            return true;
          }
        }
      }
      $scope.showLightboxError('Email não cadastrado!');
    };
  }]);

}());
