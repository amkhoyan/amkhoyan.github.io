var app = angular.module("MyApp", []);

app.filter("reverse", function() {
  return function(input) {
    var result = "";
    input = input || "";
    for (var i=0; i<input.length; i++) {
      result = input.charAt(i) + result;
    }
    return result;
  };
});

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
