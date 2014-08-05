(function () {
   'use strict';

  SelfCheckin.Services.
    factory('login',['$http', function($http) {

    function tokenAuth(token) {
      return {'Authorization': 'Basic ' + btoa(token + ':')};
    }

    var login = {
      getToken: function(user){
        return $http({
          method: 'GET',
          url: 'https://www.eventick.com.br/api/v1/tokens.json',
           headers: {'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)}
        });
      },
      getEvents: function(userToken){
        return $http({
          method: 'GET',
          url: 'https://www.eventick.com.br/api/v1/events.json',
           headers: {'Authorization': 'Basic ' + btoa(userToken + ':')}
          });
      }
    };
  return login;

  }]);
}());
