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
            var params = [];
            angular.forEach(URI.parseQuery(uri.query), function(value, key) {
                params.push({key: key, value: value})
            });

            $scope.parsed  = {
                uri: uri,
                params: params
            };
        };

        $scope.openUri = function() {
            window.open(createUriFromView(), "_blank");
        };

        $scope.reconstructUrl = function() {
            $scope.url = createUriFromView();
        };

        var createUriFromView = function() {
            var parsedUri = $scope.parsed.uri;
            var params = $scope.parsed.params;
            var uri = URI()
                .protocol(parsedUri.protocol)
                .hostname(parsedUri.hostname)
                .port(parsedUri.port)
                .path(parsedUri.path);

            angular.forEach(params, function(param) {
                uri.addSearch(param.key, param.value);
            });

            return uri;
        }
    }]);