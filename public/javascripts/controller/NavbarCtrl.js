/**
 * Created by 文龙 on 2016/1/22.
 */
angular.module('shopApp').controller('NavbarCtrl',function($rootScope, $scope, $http, $location){
    $scope.logout = function () {
        $http({
            url:'/users/logout',
            method:"POST",
        }).success(function () {
            $rootScope.me = null;
            $location.path('/login');
        }).error(function () {
            $location.path('/login');
        })
    }
    $scope.isActive = function (path) {
        return path == $location.path();
    }
});