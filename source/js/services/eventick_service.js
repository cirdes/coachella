(function () {
   'use strict';

  SelfCheckin.Services.
    factory('eventick',['$http', '$localStorage', function($http, $localStorage) {
    var storage = $localStorage;

    function tokenAuth() {
      return {'Authorization': 'Basic ' + btoa(storage.token + ':')};
    }

    function attendeesUrl() {
      return 'https://www.eventick.com.br/api/v1/events/' + storage.eventId + '/attendees.json';
    }

    function checkinUrl() {
      return 'https://www.eventick.com.br/api/v1/events/' + storage.eventId + '/attendees/';
    }


    function findByEmail(e, index, array, email){
      return e.email === email;
    }

    var eventick = {
      getAttendees: function(){
        return $http({method: 'GET', url: attendeesUrl(), headers: tokenAuth()});
      },
      checkAttendee: function(defer, a){
        $http({method: 'PUT', data: { checked_at: a.checked_at} ,  url: checkinUrl() + a.code + '.json', headers: tokenAuth()}).
          success(function(data) {
            defer.resolve(a);
          });
      }
    };

  return eventick;

  }]);
}());
