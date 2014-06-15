(function () {
   'use strict';

  SelfCheckin.Services.
    factory('eventick',['$http', '$q', function($http, $q) {
    var username = 'admin@eventick.com.br';
    var password = 'br4z1ljs';
    // var eventID = '4205';
    var attendeesUrl = 'https://www.eventick.com.br/api/v1/events/6151/attendees.json';

    var userToken = 'hWJtNvpvTLAy3U63fDRb';

    var attendees = null;

    function tokenAuth(token) {
      return {'Authorization': 'Basic ' + btoa(token + ':')};
    }

    function getToken() {
      $http({
        method: 'GET',
        url: 'https://www.eventick.com.br/api/v1/tokens.json',
        headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}
        }
      ).
      success(function(data) {
        userToken = data.token;
        console.log(userToken);
      }).error(function(data, status, headers, config) {
        console.log('error');
      });
    }

    var eventick = {
      getAttendees: function(defer){
        if(attendees !== null){
          defer.resolve(attendees);
        }else{
          $http({method: 'GET', url: attendeesUrl, headers: tokenAuth(userToken)}).
            success(function(data) {
              attendees = data.attendees;
              defer.resolve(attendees);
            });
        }
      }
    };

  return eventick;

  }]);
}());
