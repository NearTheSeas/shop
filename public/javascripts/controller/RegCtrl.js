/**
 * Created by 文龙 on 2016/1/22.
 */
angular.module('shopApp').controller('RegCtrl',function($scope, $http, $location){
    $scope.user = {};
    $scope.save = function () {
        $http({
            url:'/users/reg',
            method:'POST',
            data: $scope.user
        }).success(function(user){
            $location.path('/login');
        }).error(function (err) {
            $scope.err=err;
            $location.path('/reg');
        })
    }
});