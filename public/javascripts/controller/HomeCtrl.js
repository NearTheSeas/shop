/**
 * Created by 文龙 on 2016/1/23.
 */
angular.module('shopApp').controller('HomeCtrl',function($rootScope, $scope, $http, $location){
    $scope.goods = [];
    $http({
        url:'/goods/list',
        method:"GET"
    }).success(function (goods) {
        $scope.goods = goods;
    }).error(function () {
    });
    $scope.save = function () {
        $http({
            url:'/goods/add',
            method:"POST",
            data:$scope.good
        }).success(function (good) {
            if(!$scope.good._id){
                $scope.goods.push(good);
            }else {
                $scope.goods.forEach(function (good) {
                    if(good._id  == $scope.good._id){
                        good = $scope.good;
                    }
                })
            }
        }).error(function () {

        })
    };
});