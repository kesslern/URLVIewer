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

        $scope.sharableUri = function () {
            var baseUrl = window.location.href.replace(/#.*$/, "");
            return baseUrl + "#/" + $scope.url;
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
        };

        var currentAnchor = function() {
            var url = '';

            if (window.location.href.indexOf('#') != -1) {
                url = window.location.href.substring(window.location.href.indexOf('#') + 1);
                if (url.substring(0,1) === '/') {
                    url = url.substring(1);
                }
            }

            return url;
        };

        $scope.url = currentAnchor();
        $scope.parse();
    }]);