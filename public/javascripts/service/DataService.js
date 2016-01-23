/**
 * Created by 文龙 on 2016/1/23.
 */
angular.module('shopApp').factory('dataService', function ($http) {
    var dataService = {},
        methods = ['get','post'];
    methods.forEach(function (method) {
        dataService[method] = function (url,data,succFunc, errFunc) {
            var http = $http({
                url:url,
                method:method.toUpperCase(),
                data:data
            });
            if(succFunc && typeof succFunc == "function" ){
                http.success(succFunc);
            }
            if(succFunc && typeof errFunc == "function" ){
                http.error(errFunc);
            }
        }
    })
    return dataService;
})