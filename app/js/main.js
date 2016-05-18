angular.module("mainApp", [])
    .controller('mainController', ['$scope', function($scope) {

        $scope.state = {
            maxUrls: 3,
            currentUrls: 1
        };

        $scope.range = function(n) {
            return new Array(n);
        };
    }])
    .controller('urlDecoder', ['$scope', function($scope) {
        $scope.parse = function() {
            var uri = URI.parse($scope.url);
            $scope.parsed  = {
                uri: uri,
                params: URI.parseQuery(uri.query)
            };
        };
    }])
    .filter('with', function () {
        return function(items, keyFilter, valueFilter) {
            keyFilter = keyFilter.toLowerCase();
            valueFilter = valueFilter.toLowerCase();

            var result = {};
            angular.forEach(items, function(value, key) {
                console.log(key + " " + value);

                if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        if (value[i] == null) value[i] = "";
                        if (key.toLowerCase().indexOf(keyFilter) > -1 && value[i].indexOf(valueFilter) > -1) {
                            result[key + " (" + i + ")"] = value[i];
                        }
                    }
                } else {
                    if (value == null) value = "";
                    if (key.toLowerCase().indexOf(keyFilter) > -1 && value.indexOf(valueFilter) > -1) {
                        result[key] = value;
                    }
                }
            });
            return result;
        };
    });
