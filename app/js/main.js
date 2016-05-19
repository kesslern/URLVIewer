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

            window.open(uri, "_blank");
        };
    }])
    .filter('with', function () {
        return function(items, keyFilter, valueFilter) {

            var result = [];
            angular.forEach(items, function(obj) {
                var key = obj.key;
                var value = obj.value;

                if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        if (value[i] == null) value[i] = "";
                        if (key.toLowerCase().indexOf(keyFilter) > -1 && value[i].indexOf(valueFilter) > -1) {
                            result.push({key:key + " (" + i + ")", value: value[i]});
                        }
                    }
                } else {
                    if (value == null) value = "";
                    if (key.toLowerCase().indexOf(keyFilter) > -1 && value.indexOf(valueFilter) > -1) {
                        result.push({key: key, value: value});
                    }
                }
            });

            return items;
        };
    })
    .directive( 'editInPlace', function() {
        return {
            restrict: 'E',
            scope: { value: '=' },
            template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value">',
            link: function ( $scope, element, attrs ) {
                // Let's get a reference to the input element, as we'll want to reference it.
                var inputElement = angular.element( element.children()[1] );

                // This directive should have a set class so we can style it.
                element.addClass( 'edit-in-place' );

                // Initially, we're not editing.
                $scope.editing = false;

                // ng-click handler to activate edit-in-place
                $scope.edit = function () {
                    $scope.editing = true;

                    // We control display through a class on the directive itself. See the CSS.
                    element.addClass( 'active' );

                    // And we must focus the element.
                    // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
                    // we have to reference the first element in the array.
                    inputElement[0].focus();
                };

                // When we leave the input, we're done editing.
                inputElement.prop( 'onblur', function() {
                    $scope.editing = false;
                    element.removeClass( 'active' );
                });
            }
        };
    });