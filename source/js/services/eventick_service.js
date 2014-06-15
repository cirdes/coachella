(function () {
   'use strict';

  SelfCheckin.Services.
    factory('eventick',['$http', '$q', function($http, $q) {
    var username = '';
    var password = '';
    // var eventID = '4205';
    var attendeesUrl = 'https://www.eventick.com.br/api/v1/events/4205/attendees.json';

    var userToken = '';

    // var attendees = null;

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

    function findByEmail(e, index, array, email){
      return e.email === email;
    }

    var eventick = {
      getAttendees: function(defer){
        getToken();
        // if(attendees !== null){
        //   console.log('aqui');
        //   defer.resolve(attendees);
        // }else{
          $http({method: 'GET', url: attendeesUrl, headers: tokenAuth(userToken)}).
            success(function(data) {
              // attendees = data.attendees;
              defer.resolve(data.attendees);
            });
        // }
      }
    };

  return eventick;

  }]);
}());
