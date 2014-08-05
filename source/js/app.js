angular.module('selfCheckin', ['selfCheckin.controllers', 'selfCheckin.directives', 'selfCheckin.services']);

angular.module('selfCheckin').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
   .when('/admin', {
    templateUrl: 'admin',
    controller: 'AdminCtrl',
  }).when('/', {
   templateUrl: 'checkin',
   controller: 'CheckinCtrl',
 }).when('/login', {
  templateUrl: 'login',
  controller: 'LoginCtrl',
});
});

var SelfCheckin = SelfCheckin || {};

SelfCheckin.Controllers = angular.module('selfCheckin.controllers', ['ngRoute', 'ui.gravatar', 'ngStorage']);
SelfCheckin.Directives = angular.module('selfCheckin.directives', []);
SelfCheckin.Services = angular.module('selfCheckin.services', []);
