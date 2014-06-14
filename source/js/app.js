angular.module('selfCheckin', ['selfCheckin.controllers', 'selfCheckin.directives']);

angular.module('selfCheckin').config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/admin', {
    templateUrl: 'admin.html',
    controller: 'AdminCtrl',
  }).when('/', {
   templateUrl: 'checkin.html',
   controller: 'CheckinCtrl',
 });
});

var SelfCheckin = SelfCheckin || {};

SelfCheckin.Controllers = angular.module('selfCheckin.controllers', ['ngRoute']);
SelfCheckin.Directives = angular.module('selfCheckin.directives', []);
