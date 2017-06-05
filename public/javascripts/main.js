/**
 * Created by hamid on 6/4/17.
 */
angular.module('BestSellers', ['ui.router'])
    .config(function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("main");

        $stateProvider

            .state ('about', {
                url: '/about',
                templateUrl: 'about.ejs'
                //controller: 'searchCtrl'
            })
            .state ('main', {
                url: '/main',
                templateUrl: 'main.ejs',
                controller: 'mainCtrl'
            })
    })
    .controller('mainCtrl', function ($scope, mainSrv) {


        callBookApi();
        function callBookApi(){
            mainSrv.callBookApiSrv().then(function (receivedData) {
                //console.log(receivedData.data.results);
                $scope.categoryList = receivedData.data.results.lists;
            }, function (error) {
                console.log(error);
            })
        }

    })
    .factory('mainSrv', function ($http, $q, apiKey) {
        return{
            callBookApiSrv : callBookApiSrv
        };

        function callBookApiSrv(){
            return $q(function (resolve, reject) {
                $http.get('http://api.nytimes.com/svc/books/v3/lists/overview.json?callback=foobar&api-key='+apiKey)
                    .then(function (result) {
                        resolve(result);
                    },(function (err) {
                        reject(err);
                    }));
            })
        }
    })
    .constant('apiKey', '3ff2a8140ba441acbdfcfb2c46ff962f');