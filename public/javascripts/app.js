angular.module('shopApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider.when('/',{
            templateUrl:'pages/home.html',
            controller:'HomeCtrl'
        }).when('/reg',{
            templateUrl:'pages/reg.html',
            controller:'RegCtrl'
        }).when('/login',{
            templateUrl:'pages/login.html',
            controller:'LoginCtrl'
        }).when('/goods/back/list',{
            templateUrl:'pages/goods/back/list.html',
            controller:'GoodsCtrl'
        }).otherwise({
            redirectedTo:'/'
        });
    }).run(function ($rootScope, $location, $http) {
        $http({
            url:'/users/validate',
            method:'POST'
        }).success(function (user) {
            $rootScope.me = user;
            $location.path('/');
        }).error(function (data) {
            $location.path('/login');
        });
});


