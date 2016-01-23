/**
 * Created by 文龙 on 2016/1/23.
 */
angular.module('shopApp').controller('GoodsCtrl',function($rootScope, $scope, $http){
    $scope.keyword = '';
    $scope.filterGoods = [];//当页数据
    $scope.pages = [];//分页总数
    $scope.pageNumber = 1;
    $scope.pageSize = 4;
    $scope.goods = [];

    $http({
        url:'/goods/list',
        method:"GET"
    }).success(function (goods) {
        $scope.goods = goods;
        $scope.filter();
    }).error(function () {
    });

    $scope.filter = function () {
        var tempGoods =  $scope.goods.filter(function (good) {
            return good.name.indexOf($scope.keyword) != -1;
        });
        $scope.pages = [];
        $scope.totalPage = Math.ceil(tempGoods.length / $scope.pageSize);
        for (var i=1; i<= $scope.totalPage; i++){
            $scope.pages.push(i);
        }
        var filterGoods = [];
        for(var i= ($scope.pageNumber -1)*$scope.pageSize;i<tempGoods.length && i< ($scope.pageNumber * $scope.pageSize );i++ ){
            filterGoods.push(tempGoods[i]);
        }
        $scope.filterGoods = filterGoods;
    };
    
    $scope.save = function () {
        $http({
            url:'/goods/add',
            method:"POST",
            data:$scope.good
        }).success(function (good) {
            if(!$scope.good._id){
                $scope.filterGoods.push(good);
            }else {
                $scope.filterGoods.forEach(function (good) {
                    if(good._id  == $scope.good._id){
                        good = $scope.good;
                    }
                })
            }
        }).error(function () {
        })
    };
    $scope.delete = function () {
        $http({
            url:'/goods/delete',
            method:"POST",
            data:$scope.good
        }).success(function (good) {
            $scope.goods = $scope.goods.filter(function (good) {
                return good._id != $scope.good._id;
            })
        }).error(function () {
        })
    }
    
    $scope.go = function (page) {
        if(page > 0 && page <= $scope.totalPage){
            $scope.pageNumber = page;
            $scope.filter();
        }
    }
});
//添加商品
angular.module('shopApp').directive('addGoods', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                scope.$apply(function () {
                    scope.good = {};
                });
                $('#addDialog').modal(true);
            });
        }
    }
});
//编辑商品
angular.module('shopApp').directive('editGoods', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                scope.$apply(function () {
                    //指令集的作用域是独立的，editGoods 是 遍历goods的 子作用域
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#addDialog').modal(true);
            });
        }
    }
});
//查看商品
angular.module('shopApp').directive('viewGoods', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                scope.$apply(function () {
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#viewDialog').modal(true);
            });
        }
    }
});
//删除商品
angular.module('shopApp').directive('deleteGoods', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                scope.$apply(function () {
                    scope.$parent.good = scope.goods[attrs.index];
                });
                $('#deleteDialog').modal(true);
            });
        }
    }
});
//商品全选
angular.module('shopApp').directive('selectAllGoods', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
               var self = $(this);
                $("input[type='checkbox']").each(function () {
                    $(this).prop("checked",self.prop('checked'));
                })
            });
        }
    }
});
//单选
angular.module('shopApp').directive('selectGoodItem', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                //取到所有未选中的checkbox，判断你是否存在未选中的
                var isChecked = $("input[type='checkbox']:not(:checked)").length ? false : true;
                $('#selectAllGoods').prop('checked',isChecked);
            });
        }
    }
});
//批量删除商品
angular.module('shopApp').directive('batchDeleteGoods', function (dataService) {
    return {
        link: function (scope, element, attrs) {
            element.click(function () {
                var goods = $("input[type='checkbox']:checked");
                var _ids = [];
                goods.each(function (index, good) {
                    _ids.push($(good).attr('data-id'));
                });
                dataService.post('/goods/batchDelete',{_ids:_ids}, function (data) {
                    scope.goods = scope.goods.filter(function (good) {
                        return _ids.indexOf(good._id) == -1 ;
                    });
                }, function (data) {
                })
            });
        }
    }
});