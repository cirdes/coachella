(function () {
   'use strict';

  SelfCheckin.Services.
    factory('eventick',['$http', function($http) {
    var username = '';
    var password = '';
    // var eventID = '4205';
    var attendeesUrl = 'https://www.eventick.com.br/api/v1/events/6151/attendees.json';

    var userToken = '';

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
      getAttendees: function(attendees){
        if(userToken === null){
          getToken();
        }
        return $http({method: 'GET', url: attendeesUrl, headers: tokenAuth(userToken)});
      }
    };

  return eventick;

  }]);
}());
