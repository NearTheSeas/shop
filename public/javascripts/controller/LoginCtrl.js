/**
 * Created by 文龙 on 2016/1/22.
 */
angular.module('shopApp').controller('LoginCtrl',function($rootScope, $scope, $http, $location){
    $scope.user = {};
    $scope.login = function () {
        $http({
            url:'/users/login',
            method:'POST',
            data: $scope.user
        }).success(function(user){
            $rootScope.me=user;
            $location.path('/');
        }).error(function () {
            $scope.err=err;
            $location.path('/login');
        })
    }
});